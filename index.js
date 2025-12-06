// ==================== Imports ====================
require("./db");
const express = require("express");
const cors = require("cors");
const path = require("path");
const { contractInstance } = require("./contract");
const auth = require("./middleware/auth");
const authorizeRole = require("./middleware/authorizeRole");
const { register, login } = require("./users/userController");
const eventsRouter = require("./routes/events");
const buyRequestRouter = require("./routes/buyRequest");
const Product = require("./userBuyModels/Products");

// ==================== App Init ====================
const app = express();
app.use(express.json());

// ==================== CORS Config ====================
app.use(
  cors({
    origin: "http://localhost:8081",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

// ==================== Serve Receipts ====================
const receiptsDir = path.join(__dirname, "receipts");
app.use("/receipts", express.static(receiptsDir));

// ==================== Auth Routes ====================
app.post("/register", register);
app.post("/login", login);

// ==================== PRODUCTS ====================

//  Get all products
app.get("/products", async (req, res) => {
  try {
    const allProducts = await contractInstance.getAllProducts();
    const dbProducts = await Product.find();

    const products = allProducts.map((p) => {
      const linked = dbProducts.find((d) => d.blockchainId === Number(p.id));

      return {
        id: Number(p.id),
        name: p.name,
        price: Number(p.price),
        quantity: Number(p.quantity),
        vendorId: linked ? linked.vendorId : null,
        status: linked ? linked.status : "Created",
      };
    });

    res.json(products);
  } catch (err) {
    console.error(" Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

//  Get single product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await contractInstance.getProduct(id);

    if (!product || !product[0]) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }

    const dbEntry = await Product.findOne({ blockchainId: Number(id) });

    res.json({
      id: Number(id),
      name: product[0],
      price: Number(product[1]),
      quantity: Number(product[2]),
      vendorId: dbEntry ? dbEntry.vendorId : null,
      status: dbEntry ? dbEntry.status : "Created",
    });
  } catch (err) {
    console.error(" Error fetching product:", err.message);
    res.status(500).json({ message: "Failed to fetch product details" });
  }
});

//  Add new product
app.post("/products", auth, authorizeRole("vendor", "admin"), async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    const allProducts = await contractInstance.getAllProducts();

    let nextId = 1;
    if (allProducts.length > 0) {
      const numericIds = allProducts
        .map((p) => Number(p.id))
        .filter((id) => !isNaN(id) && id > 0 && id < 1000000);

      if (numericIds.length > 0) {
        nextId = Math.max(...numericIds) + 1;
      }
    }

    const tx = await contractInstance.setProduct(
      nextId,
      name,
      Number(price),
      Number(quantity)
    );
    await tx.wait();

    await Product.create({
      blockchainId: nextId,
      name,
      price,
      quantity,
      vendorId: req.user.id,
      status: "Created",
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      blockchainId: nextId,
    });
  } catch (err) {
    console.error(" Error adding product:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

//  Update product
app.put("/products/:id", auth, authorizeRole("vendor", "admin"), async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    const tx = await contractInstance.updateProduct(
      Number(req.params.id),
      name,
      Number(price),
      Number(quantity)
    );
    await tx.wait();

    await Product.findOneAndUpdate(
      { blockchainId: Number(req.params.id) },
      { name, price, quantity }
    );

    res.json({ success: true, message: "Product updated" });
  } catch (err) {
    console.error(" Error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

//  Delete
app.delete("/products/:id", auth, authorizeRole("admin"), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const tx = await contractInstance.deleteProduct(id);
    await tx.wait();

    await Product.findOneAndDelete({ blockchainId: id });

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error(" Error:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

//  FINAL CLEAN VERSION — supply chain status
app.put(
  "/products/:id/status",
  auth,
  authorizeRole("vendor", "admin"),
  async (req, res) => {
    try {
      const { status } = req.body;
      const valid = ["Created", "Packed", "Shipped", "Delivered"];

      if (!valid.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const updated = await Product.findOneAndUpdate(
        { blockchainId: Number(req.params.id) },
        { status },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({
        success: true,
        message: "Status updated",
        product: updated,
      });
    } catch (err) {
      console.error(" Error updating status:", err);
      res.status(500).json({ message: "Failed to update status" });
    }
  }
);

// ==================== OTHER MODULES ====================
app.use("/buy-requests", buyRequestRouter);
app.use("/events", eventsRouter);

// ==================== SERVER START ====================
app.listen(5000, () =>
  console.log(`✅ Server running on port 5000`)
);
