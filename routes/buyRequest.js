const express = require("express");
const router = express.Router();
const BuyRequest = require("../userBuyModels/BuyRequest");
const Product = require("../userBuyModels/Products");
const { contractInstance } = require("../contract");
const auth = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole");
const crypto = require("crypto");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const QRCode = require("qrcode");


// ===============================
// Multer Setup
// ===============================
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    )
      cb(null, true);
    else cb(new Error("Only PDF/PNG/JPEG allowed"));
  },
});


// ===============================
// APPLY TO BUY (AUTO-VENDOR DETECTION)
// ===============================
router.post("/apply", auth, authorizeRole("customer"), async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res.status(400).json({ message: "productId required" });

    // 🚀 Auto detect vendor from product master
    const product = await Product.findOne({ blockchainId: productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const vendorId = product.vendorId;

    // Avoid duplicates
    const existing = await BuyRequest.findOne({
      productId,
      customerId: req.user.id,
      status: "Pending",
    });

    if (existing) return res.status(400).json({ message: "Already applied" });

    const request = await BuyRequest.create({
      productId,
      vendorId,
      customerId: req.user.id,
      status: "Pending",
    });

    res.json({ success: true, message: "Buy request created", request });

  } catch (err) {
    console.error("❌ Apply Error:", err);
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// VENDOR REQUESTS
// ===============================
router.get("/vendor", auth, authorizeRole("vendor"), async (req, res) => {
  try {
    const requests = await BuyRequest.find({ vendorId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// APPROVE / REJECT
// ===============================
router.put("/:id/approve", auth, authorizeRole("vendor"), async (req, res) => {
  try {
    const request = await BuyRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (String(request.vendorId) !== String(req.user.id))
      return res.status(403).json({ message: "Not authorized" });

    const { action } = req.body;
    if (!["Approved", "Rejected"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    request.status = action;

    // ===========
    // APPROVED → Generate receipt + store hash
    // ===========
    if (action === "Approved") {
      const receiptsDir = path.join(__dirname, "../receipts");
      if (!fs.existsSync(receiptsDir))
        fs.mkdirSync(receiptsDir, { recursive: true });

      const pdfPath = path.join(receiptsDir, `receipt_${request._id}.pdf`);
      const doc = new PDFDocument();
      const ws = fs.createWriteStream(pdfPath);
      doc.pipe(ws);

      doc.fontSize(18).text("Product Purchase Receipt", { align: "center" });
      doc.moveDown();
      doc.fontSize(12);
      doc.text(`Request ID: ${request._id}`);
      doc.text(`Product ID: ${request.productId}`);
      doc.text(`Customer ID: ${request.customerId}`);
      doc.text(`Vendor ID: ${request.vendorId}`);
      doc.text(`Status: ${action}`);
      doc.text(`Date: ${new Date().toLocaleString()}`);
      doc.end();

      await new Promise((resolve, reject) => {
        ws.on("finish", resolve);
        ws.on("error", reject);
      });

      const fileBuffer = fs.readFileSync(pdfPath);
      const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

      try {
        const tx = await contractInstance.storeDocumentHash(request.productId, hash);
        await tx.wait();
      } catch (err) {
        console.error("⚠ On-chain store failed:", err);
      }

      request.receiptHash = hash;
      request.receiptUrl = `/receipts/receipt_${request._id}.pdf`;
    }

    await request.save();
    res.json({
      success: true,
      message: `Request ${action}`,
      receiptUrl: request.receiptUrl,
    });

  } catch (err) {
    console.error("❌ Approve Error:", err);
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// CUSTOMER REQUEST LIST
// ===============================
router.get("/customer", auth, authorizeRole("customer"), async (req, res) => {
  try {
    const requests = await BuyRequest.find({ customerId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// SIMPLE HASH VALIDATION ENDPOINT  (FIX ADDED)
// ===============================
router.post("/validate", auth, authorizeRole("customer"), async (req, res) => {
  const { productId, uploadedHash } = req.body;

  if (!productId || !uploadedHash)
    return res.status(400).json({ message: "productId & uploadedHash required" });

  try {
    const valid = await contractInstance.verifyDocumentHash(
      Number(productId),
      uploadedHash
    );

    res.json({ valid: Boolean(valid) });
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
});


// ===============================
// FILE UPLOAD VERIFICATION
// ===============================
router.post(
  "/validate-file",
  auth,
  authorizeRole("customer"),
  upload.single("receipt"),
  async (req, res) => {
    try {
      const { productId } = req.body;
      if (!productId) return res.status(400).json({ message: "productId is required" });

      if (!req.file) return res.status(400).json({ message: "No receipt uploaded" });

      const uploadedHash = crypto
        .createHash("sha256")
        .update(req.file.buffer)
        .digest("hex");

      let isValid = false;
      try {
        isValid = await contractInstance.verifyDocumentHash(Number(productId), uploadedHash);
      } catch (err) {
        console.error("❌ Contract verify failed:", err);
      }

      let onChainHash = null;
      try {
        if (contractInstance.documentHashes) {
          onChainHash = await contractInstance.documentHashes(Number(productId));
        }
      } catch {}

      res.json({
        valid: Boolean(isValid),
        uploadedHash,
        onChainHash: onChainHash || null,
        message: isValid
          ? "Receipt verified successfully"
          : "Receipt hash mismatch (possible counterfeit)",
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);


// ===============================
// QR: BY REQUEST ID
// ===============================
router.get("/:id/qr", auth, authorizeRole("vendor", "admin"), async (req, res) => {
  try {
    const request = await BuyRequest.findById(req.params.id);
    if (!request)
      return res.status(404).json({ message: "Buy request not found" });

    if (!request.receiptHash)
      return res.status(400).json({ message: "Receipt not generated yet" });

    const payload = {
      productId: request.productId,
      receiptHash: request.receiptHash,
    };

    const qr = await QRCode.toDataURL(JSON.stringify(payload));

    res.json({ success: true, qr, payload });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// QR: BY PRODUCT
// ===============================
router.get("/product/:productId/qr", auth, authorizeRole("vendor", "admin"), async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    const request = await BuyRequest.findOne({
      productId,
      vendorId: req.user.id,
      status: "Approved",
    }).sort({ createdAt: -1 });

    if (!request)
      return res.status(404).json({ message: "Approved buy request not found" });

    const payload = {
      productId: request.productId,
      receiptHash: request.receiptHash,
      requestId: request._id,
    };

    const qr = await QRCode.toDataURL(JSON.stringify(payload));

    res.json({ success: true, qr, payload });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ===============================
// CUSTOMER: VERIFY QR JSON
// ===============================
router.post("/verify-qr", auth, authorizeRole("customer"), async (req, res) => {
  try {
    const { productId, receiptHash } = req.body;

    if (!productId || !receiptHash)
      return res.status(400).json({ message: "Invalid payload" });

    const valid = await contractInstance.verifyDocumentHash(
      Number(productId),
      receiptHash
    );

    res.json({
      valid: Boolean(valid),
      message: valid
        ? "QR Verified — Authentic Product"
        : "QR Mismatch — Possible Counterfeit",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
