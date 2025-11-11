// // const express = require("express");
// // const router = express.Router();
// // const BuyRequest = require("../userBuyModels/BuyRequest");
// // const { contractInstance } = require("../contract");
// // const auth = require("../middleware/auth");
// // const authorizeRole = require("../middleware/authorizeRole");
// // const crypto = require("crypto");
// // const PDFDocument = require("pdfkit");
// // const fs = require("fs");
// // const path = require("path");

// // // ✅ Customer applies to buy a product
// // router.post("/apply", auth, authorizeRole("customer"), async (req, res) => {
// //   try {
// //     const { productId, vendorId } = req.body;
// //     const request = new BuyRequest({ productId, vendorId, customerId: req.user.id });
// //     await request.save();
// //     res.json({ success: true, message: "Buy request created successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // ✅ Vendor approves or rejects a request
// // router.put("/:id/approve", auth, authorizeRole("vendor"), async (req, res) => {
// //   try {
// //     const request = await BuyRequest.findById(req.params.id);
// //     if (!request) return res.status(404).json({ message: "Request not found" });

// //     const { action } = req.body; // "Approved" or "Rejected"
// //     request.status = action;

// //     if (action === "Approved") {
// //       // Create PDF receipt
// //       const doc = new PDFDocument();
// //       const pdfPath = path.join(__dirname, `../receipts/receipt_${request._id}.pdf`);
// //       doc.pipe(fs.createWriteStream(pdfPath));
// //       doc.fontSize(18).text("Product Purchase Receipt", { align: "center" });
// //       doc.moveDown();
// //       doc.text(`Request ID: ${request._id}`);
// //       doc.text(`Product ID: ${request.productId}`);
// //       doc.text(`Customer ID: ${request.customerId}`);
// //       doc.text(`Vendor ID: ${request.vendorId}`);
// //       doc.text(`Status: ${action}`);
// //       doc.text(`Date: ${new Date().toLocaleString()}`);
// //       doc.end();

// //       // Hash PDF
// //       const fileBuffer = fs.readFileSync(pdfPath);
// //       const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

// //       // ✅ Store hash on blockchain
// //       const tx = await contractInstance.storeDocumentHash(request.productId, hash);
// //       await tx.wait();

// //       // ✅ Save receipt info
// //       request.receiptHash = hash;
// //       request.receiptUrl = `/receipts/receipt_${request._id}.pdf`;
// //     }

// //     await request.save();
// //     res.json({ success: true, message: `Request ${action}` });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // ✅ Validate uploaded receipt
// // router.post("/validate", async (req, res) => {
// //   try {
// //     const { productId, uploadedHash } = req.body;

// //     const isValid = await contractInstance.verifyDocumentHash(productId, uploadedHash);
// //     res.json({ valid: isValid });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const BuyRequest = require("../userBuyModels/BuyRequest");
// const { contractInstance } = require("../contract");
// const auth = require("../middleware/auth");
// const authorizeRole = require("../middleware/authorizeRole");
// const crypto = require("crypto");
// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");

// // ✅ Customer applies to buy a product
// // router.post("/apply", auth, authorizeRole("customer"), async (req, res) => {
// //   try {
// //     const { productId, vendorId } = req.body;
// //     const request = new BuyRequest({
// //       productId,
// //       vendorId,
// //       customerId: req.user.id,
// //     });
// //     await request.save();
// //     res.json({ success: true, message: "Buy request created successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// router.post("/apply", auth, authorizeRole("customer"), async (req, res) => {
//   try {
//     const { productId, vendorId } = req.body;

//     if (!vendorId) {
//       return res.status(400).json({ message: "Vendor ID is required" });
//     }

//     const request = new BuyRequest({
//       productId,
//       vendorId,
//       customerId: req.user.id,
//     });

//     await request.save();
//     res.json({ success: true, message: "Buy request created successfully" });
//   } catch (err) {
//     console.error("❌ Error creating buy request:", err);
//     res.status(500).json({ message: err.message });
//   }
// });


// // ✅ Vendor approves or rejects a request
// router.put("/:id/approve", auth, authorizeRole("vendor"), async (req, res) => {
//   try {
//     const request = await BuyRequest.findById(req.params.id);
//     if (!request) return res.status(404).json({ message: "Request not found" });

//     const { action } = req.body; // "Approved" or "Rejected"
//     request.status = action;

//     if (action === "Approved") {
//       // Create PDF receipt
//       const receiptsDir = path.join(__dirname, "../receipts");
//       if (!fs.existsSync(receiptsDir)) fs.mkdirSync(receiptsDir);

//       const pdfPath = path.join(receiptsDir, `receipt_${request._id}.pdf`);
//       const doc = new PDFDocument();
//       doc.pipe(fs.createWriteStream(pdfPath));

//       doc.fontSize(18).text("Product Purchase Receipt", { align: "center" });
//       doc.moveDown();
//       doc.text(`Request ID: ${request._id}`);
//       doc.text(`Product ID: ${request.productId}`);
//       doc.text(`Customer ID: ${request.customerId}`);
//       doc.text(`Vendor ID: ${request.vendorId}`);
//       doc.text(`Status: ${action}`);
//       doc.text(`Date: ${new Date().toLocaleString()}`);
//       doc.end();

//       // Hash PDF
//       const fileBuffer = fs.readFileSync(pdfPath);
//       const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

//       // ✅ Store hash on blockchain
//       const tx = await contractInstance.storeDocumentHash(request.productId, hash);
//       await tx.wait();

//       // ✅ Save receipt info
//       request.receiptHash = hash;
//       request.receiptUrl = `/receipts/receipt_${request._id}.pdf`;
//     }

//     await request.save();
//     res.json({ success: true, message: `Request ${action}` });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ Validate uploaded receipt
// router.post("/validate", async (req, res) => {
//   try {
//     const { productId, uploadedHash } = req.body;
//     const isValid = await contractInstance.verifyDocumentHash(productId, uploadedHash);
//     res.json({ valid: isValid });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ Get all requests for a specific vendor
// router.get("/vendor", auth, authorizeRole("vendor"), async (req, res) => {
//   try {
//     const requests = await BuyRequest.find({ vendorId: req.user.id }).sort({ createdAt: -1 });
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const BuyRequest = require("../userBuyModels/BuyRequest");
// const { contractInstance } = require("../contract");
// const auth = require("../middleware/auth");
// const authorizeRole = require("../middleware/authorizeRole");
// const crypto = require("crypto");
// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");

// // ✅ Customer applies to buy
// router.post("/apply", auth, authorizeRole("customer"), async (req, res) => {
//   try {
//     const { productId, vendorId } = req.body;
//     if (!productId || !vendorId) {
//       return res.status(400).json({ message: "productId and vendorId required" });
//     }

//     const existing = await BuyRequest.findOne({
//       productId,
//       customerId: req.user.id,
//       status: "Pending",
//     });
//     if (existing) return res.status(400).json({ message: "Already applied" });

//     const request = await BuyRequest.create({
//       productId,
//       vendorId,
//       customerId: req.user.id,
//       status: "Pending",
//     });

//     res.json({ success: true, message: "Buy request created", request });
//   } catch (err) {
//     console.error("❌ Error creating buy request:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ Get vendor's requests
// router.get("/vendor", auth, authorizeRole("vendor"), async (req, res) => {
//   try {
//     const requests = await BuyRequest.find({ vendorId: req.user.id }).sort({ createdAt: -1 });
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ Approve/Reject a request
// router.put("/:id/approve", auth, authorizeRole("vendor"), async (req, res) => {
//   try {
//     const request = await BuyRequest.findById(req.params.id);
//     if (!request) return res.status(404).json({ message: "Request not found" });
//     if (String(request.vendorId) !== String(req.user.id))
//       return res.status(403).json({ message: "Not authorized" });

//     const { action } = req.body;
//     if (!["Approved", "Rejected"].includes(action))
//       return res.status(400).json({ message: "Invalid action" });

//     request.status = action;

//     if (action === "Approved") {
//       const receiptsDir = path.join(__dirname, "../receipts");
//       if (!fs.existsSync(receiptsDir)) fs.mkdirSync(receiptsDir, { recursive: true });

//       const pdfPath = path.join(receiptsDir, `receipt_${request._id}.pdf`);
//       const doc = new PDFDocument();
//       const ws = fs.createWriteStream(pdfPath);
//       doc.pipe(ws);

//       doc.fontSize(18).text("Product Purchase Receipt", { align: "center" });
//       doc.moveDown();
//       doc.fontSize(12);
//       doc.text(`Request ID: ${request._id}`);
//       doc.text(`Product ID: ${request.productId}`);
//       doc.text(`Customer ID: ${request.customerId}`);
//       doc.text(`Vendor ID: ${request.vendorId}`);
//       doc.text(`Status: ${action}`);
//       doc.text(`Date: ${new Date().toLocaleString()}`);
//       doc.end();

//       await new Promise((resolve, reject) => {
//         ws.on("finish", resolve);
//         ws.on("error", reject);
//       });

//       const fileBuffer = fs.readFileSync(pdfPath);
//       const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

//       const tx = await contractInstance.storeDocumentHash(request.productId, hash);
//       await tx.wait();

//       request.receiptHash = hash;
//       request.receiptUrl = `/receipts/receipt_${request._id}.pdf`;
//     }

//     await request.save();
//     res.json({ success: true, message: `Request ${action}`, receiptUrl: request.receiptUrl });
//   } catch (err) {
//     console.error("❌ Error approving request:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // ✅ Get all requests for a specific customer
// router.get("/customer", auth, authorizeRole("customer"), async (req, res) => {
//   try {
//     const requests = await BuyRequest.find({ customerId: req.user.id }).sort({ createdAt: -1 });
//     res.json(requests);
//   } catch (err) {
//     console.error("❌ Error fetching customer requests:", err);
//     res.status(500).json({ message: err.message });
//   }
// });


// module.exports = router;



const express = require("express");
const router = express.Router();
const BuyRequest = require("../userBuyModels/BuyRequest");
const { contractInstance } = require("../contract");
const auth = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole");
const crypto = require("crypto");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// ===============================
// Multer Setup (for PDF upload verification)
// ===============================
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"));
  },
});

// ===============================
// ✅ Customer applies to buy
// ===============================
router.post("/apply", auth, authorizeRole("customer"), async (req, res) => {
  try {
    const { productId, vendorId } = req.body;
    if (!productId || !vendorId) {
      return res.status(400).json({ message: "productId and vendorId required" });
    }

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
    console.error("❌ Error creating buy request:", err);
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// ✅ Vendor gets their requests
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
// ✅ Vendor approves or rejects
// ===============================
router.put("/:id/approve", auth, authorizeRole("vendor"), async (req, res) => {
  try {
    const request = await BuyRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Only the correct vendor can approve/reject
    if (String(request.vendorId) !== String(req.user.id))
      return res.status(403).json({ message: "Not authorized" });

    const { action } = req.body;
    if (!["Approved", "Rejected"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    request.status = action;

    if (action === "Approved") {
      const receiptsDir = path.join(__dirname, "../receipts");
      if (!fs.existsSync(receiptsDir)) fs.mkdirSync(receiptsDir, { recursive: true });

      const pdfPath = path.join(receiptsDir, `receipt_${request._id}.pdf`);
      const doc = new PDFDocument();
      const ws = fs.createWriteStream(pdfPath);
      doc.pipe(ws);

      // PDF Content
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

      // Compute SHA-256 hash of the generated PDF
      const fileBuffer = fs.readFileSync(pdfPath);
      const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

      // Store hash on blockchain
      const tx = await contractInstance.storeDocumentHash(request.productId, hash);
      await tx.wait();

      // Save metadata in DB
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
    console.error("❌ Error approving request:", err);
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// ✅ Get all requests for a specific customer
// ===============================
router.get("/customer", auth, authorizeRole("customer"), async (req, res) => {
  try {
    const requests = await BuyRequest.find({ customerId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching customer requests:", err);
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// ✅ Upload & Verify Receipt (NEW FEATURE)
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

      if (!req.file) return res.status(400).json({ message: "No receipt file uploaded" });

      // Compute SHA-256 hash of uploaded file
      const fileBuffer = req.file.buffer;
      const uploadedHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

      // Verify hash via smart contract
      const isValid = await contractInstance.verifyDocumentHash(Number(productId), uploadedHash);

      // Try fetching on-chain stored hash (optional)
      let onChainHash = null;
      try {
        if (contractInstance.documentHashes) {
          onChainHash = await contractInstance.documentHashes(Number(productId));
        }
      } catch {
        // ignored if not accessible
      }

      res.json({
        valid: Boolean(isValid),
        message: isValid
          ? "✅ Receipt verified successfully!"
          : "❌ Uploaded receipt hash does not match blockchain record.",
        onChainHash: onChainHash ? String(onChainHash) : undefined,
        uploadedHash,
      });
    } catch (err) {
      console.error("❌ Error validating uploaded receipt:", err);
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: err.message || "Failed to verify receipt" });
    }
  }
);

// ===============================
// Export Router
// ===============================
module.exports = router;
