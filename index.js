// // // // require("./db"); // Connect to MongoDB
// // // // const express = require("express");
// // // // const { contractInstance } = require("./contract");
// // // // const auth = require("./middleware/auth");
// // // // const authorizeRole = require("./middleware/authorizeRole");
// // // // const { register, login } = require("./users/userController");
// // // // const eventsRouter = require("./routes/events");

// // // // const app = express();
// // // // app.use(express.json());

// // // // // ==================== Auth Routes ====================
// // // // app.post("/register", register);
// // // // app.post("/login", login);

// // // // // ==================== Public Product Routes ====================
// // // // app.get("/products/:id", async (req, res) => {
// // // //   try {
// // // //     const product = await contractInstance.getProduct(req.params.id);
// // // //     res.json({
// // // //       id: Number(req.params.id),
// // // //       name: product[0],
// // // //       price: Number(product[1]),
// // // //       quantity: Number(product[2]),
// // // //     });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });

// // // // app.get("/products", async (req, res) => {
// // // //   try {
// // // //     const allProducts = await contractInstance.getAllProducts();
// // // //     const products = allProducts.map((p) => ({
// // // //       id: Number(p.id),
// // // //       name: p.name,
// // // //       price: Number(p.price),
// // // //       quantity: Number(p.quantity),
// // // //     }));
// // // //     res.json(products);
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });

// // // // // ==================== Protected Product Routes ====================
// // // // app.post("/products", auth, authorizeRole("vendor", "admin"), async (req, res) => {
// // // //   try {
// // // //     const { id, name, price, quantity } = req.body;
// // // //     const tx = await contractInstance.setProduct(Number(id), name, Number(price), Number(quantity));
// // // //     await tx.wait();
// // // //     res.json({ success: true });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     if (err.message.includes("Product ID already exists")) {
// // // //       res.status(400).json({ message: "Product ID already exists" });
// // // //     } else {
// // // //       res.status(500).json({ message: err.message });
// // // //     }
// // // //   }
// // // // });

// // // // app.put("/products/:id", auth, authorizeRole("vendor", "admin"), async (req, res) => {
// // // //   try {
// // // //     const { name, price, quantity } = req.body;
// // // //     const tx = await contractInstance.updateProduct(
// // // //       Number(req.params.id),
// // // //       name,
// // // //       Number(price),
// // // //       Number(quantity)
// // // //     );
// // // //     await tx.wait();
// // // //     res.json({ success: true });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });

// // // // app.delete("/products/:id", auth, authorizeRole("admin"), async (req, res) => {
// // // //   try {
// // // //     const tx = await contractInstance.deleteProduct(Number(req.params.id));
// // // //     await tx.wait();
// // // //     res.json({ success: true });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });

// // // // // ==================== Events Routes ====================
// // // // app.use("/events", eventsRouter);

// // // // // ==================== Start Server ====================
// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // // // // ==================== Import Dependencies ====================
// // // // require("./db"); // Connect to MongoDB
// // // // const express = require("express");
// // // // const cors = require("cors");
// // // // const { contractInstance } = require("./contract");
// // // // const auth = require("./middleware/auth");
// // // // const authorizeRole = require("./middleware/authorizeRole");
// // // // const { register, login } = require("./users/userController");
// // // // const eventsRouter = require("./routes/events");
// // // // const buyRequestRouter = require("./routes/buyRequest");

// // // // // ==================== App Initialization ====================
// // // // const app = express();

// // // // // Parse JSON request bodies
// // // // app.use(express.json());

// // // // // ==================== ✅ Enable CORS ====================
// // // // // Your frontend runs on http://localhost:8081 (based on your CORS error screenshot)
// // // // app.use(
// // // //   cors({
// // // //     origin: "http://localhost:8081", // must exactly match your frontend URL
// // // //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// // // //     allowedHeaders: ["Content-Type", "Authorization"],
// // // //     credentials: true,
// // // //   })
// // // // );

// // // // // Optional: Handle preflight requests manually (not strictly needed, but safe)
// // // // app.options("*", cors());

// // // // // ==================== Auth Routes ====================
// // // // app.post("/register", register);
// // // // app.post("/login", login);

// // // // // ==================== Public Product Routes ====================
// // // // app.get("/products/:id", async (req, res) => {
// // // //   try {
// // // //     const product = await contractInstance.getProduct(req.params.id);
// // // //     res.json({
// // // //       id: Number(req.params.id),
// // // //       name: product[0],
// // // //       price: Number(product[1]),
// // // //       quantity: Number(product[2]),
// // // //     });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });

// // // // // app.get("/products", async (req, res) => {
// // // // //   try {
// // // // //     const allProducts = await contractInstance.getAllProducts();
// // // // //     const products = allProducts.map((p) => ({
// // // // //       id: Number(p.id),
// // // // //       name: p.name,
// // // // //       price: Number(p.price),
// // // // //       quantity: Number(p.quantity),
// // // // //     }));
// // // // //     res.json(products);
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ message: err.message });
// // // // //   }
// // // // // });
// // // // app.get("/products", async (req, res) => {
// // // //   try {
// // // //     const allProducts = await contractInstance.getAllProducts();
// // // //     const products = allProducts.map((p) => ({
// // // //       id: Number(p.id),
// // // //       name: p.name,
// // // //       price: Number(p.price),
// // // //       quantity: Number(p.quantity),
// // // //       vendorId: "6910c1424dd8846e2582bd3f", // 👈 replace with a real Vendor _id from MongoDB (User collection)
// // // //     }));
// // // //     res.json(products);
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });


// // // // // ==================== Protected Product Routes ====================
// // // // app.post(
// // // //   "/products",
// // // //   auth,
// // // //   authorizeRole("vendor", "admin"),
// // // //   async (req, res) => {
// // // //     try {
// // // //       const { id, name, price, quantity } = req.body;
// // // //       const tx = await contractInstance.setProduct(
// // // //         Number(id),
// // // //         name,
// // // //         Number(price),
// // // //         Number(quantity)
// // // //       );
// // // //       await tx.wait();
// // // //       res.json({ success: true });
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       if (err.message.includes("Product ID already exists")) {
// // // //         res.status(400).json({ message: "Product ID already exists" });
// // // //       } else {
// // // //         res.status(500).json({ message: err.message });
// // // //       }
// // // //     }
// // // //   }
// // // // );

// // // // app.put(
// // // //   "/products/:id",
// // // //   auth,
// // // //   authorizeRole("vendor", "admin"),
// // // //   async (req, res) => {
// // // //     try {
// // // //       const { name, price, quantity } = req.body;
// // // //       const tx = await contractInstance.updateProduct(
// // // //         Number(req.params.id),
// // // //         name,
// // // //         Number(price),
// // // //         Number(quantity)
// // // //       );
// // // //       await tx.wait();
// // // //       res.json({ success: true });
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       res.status(500).json({ message: err.message });
// // // //     }
// // // //   }
// // // // );

// // // // app.delete(
// // // //   "/products/:id",
// // // //   auth,
// // // //   authorizeRole("admin"),
// // // //   async (req, res) => {
// // // //     try {
// // // //       const tx = await contractInstance.deleteProduct(Number(req.params.id));
// // // //       await tx.wait();
// // // //       res.json({ success: true });
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       res.status(500).json({ message: err.message });
// // // //     }
// // // //   }
// // // // );

// // // // app.use("/buy-requests", buyRequestRouter);

// // // // // ==================== Events Routes ====================
// // // // app.use("/events", eventsRouter);

// // // // // ==================== Start Server ====================
// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


// // // // require("./db");
// // // // const express = require("express");
// // // // const cors = require("cors");
// // // // const { contractInstance } = require("./contract");
// // // // const auth = require("./middleware/auth");
// // // // const authorizeRole = require("./middleware/authorizeRole");
// // // // const { register, login } = require("./users/userController");
// // // // const eventsRouter = require("./routes/events");
// // // // const buyRequestRouter = require("./routes/buyRequest");
// // // // const Product = require("./userBuyModels/Product");


// // // // const app = express();

// // // // // Middleware
// // // // app.use(express.json());

// // // // // ✅ Enable CORS for your frontend
// // // // app.use(
// // // //   cors({
// // // //     origin: "http://localhost:8081",
// // // //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// // // //     allowedHeaders: ["Content-Type", "Authorization"],
// // // //     credentials: true,
// // // //   })
// // // // );
// // // // app.options("*", cors());

// // // // // ==================== Auth Routes ====================
// // // // app.post("/register", register);
// // // // app.post("/login", login);

// // // // // ==================== Public Product Routes ====================
// // // // // app.get("/products/:id", async (req, res) => {
// // // // //   try {
// // // // //     const product = await contractInstance.getProduct(req.params.id);
// // // // //     res.json({
// // // // //       id: Number(req.params.id),
// // // // //       name: product[0],
// // // // //       price: Number(product[1]),
// // // // //       quantity: Number(product[2]),
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ message: err.message });
// // // // //   }
// // // // // });
// // // // // app.get("/products", async (req, res) => {
// // // // //   try {
// // // // //     const allProducts = await contractInstance.getAllProducts();
// // // // //     const products = allProducts.map((p) => ({
// // // // //       id: Number(p.id),
// // // // //       name: p.name,
// // // // //       price: Number(p.price),
// // // // //       quantity: Number(p.quantity),
// // // // //       // 👇 Use a valid vendor from your MongoDB list
// // // // //       vendorId: "6910c1424dd8846e2582bd3f",
// // // // //     }));
// // // // //     res.json(products);
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ message: err.message });
// // // // //   }
// // // // // });

// // // // app.get("/products", async (req, res) => {
// // // //   try {
// // // //     const allProducts = await contractInstance.getAllProducts();
// // // //     const products = allProducts.map((p) => ({
// // // //       id: Number(p.id),
// // // //       name: p.name,
// // // //       price: Number(p.price),
// // // //       quantity: Number(p.quantity),
// // // //       vendorId: "6910c1424dd8846e2582bd3f", // ✅ use real ObjectId of vendor
// // // //     }));
// // // //     res.json(products);
// // // //   } catch (err) {
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });



// // // // // app.get("/products", async (req, res) => {
// // // // //   try {
// // // // //     const allProducts = await contractInstance.getAllProducts();
// // // // //     const products = allProducts.map((p) => ({
// // // // //       id: Number(p.id),
// // // // //       name: p.name,
// // // // //       price: Number(p.price),
// // // // //       quantity: Number(p.quantity),
// // // // //       vendorId: "6910c1424dd8846e2582bd3f", // Example vendor ID (replace with actual from MongoDB)
// // // // //     }));
// // // // //     res.json(products);
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ message: err.message });
// // // // //   }
// // // // // });

// // // // app.get("/products", async (req, res) => {
// // // //   try {
// // // //     // 1️⃣ Get all blockchain products
// // // //     const allProducts = await contractInstance.getAllProducts();

// // // //     // 2️⃣ Fetch vendor mapping from MongoDB
// // // //     const dbProducts = await Product.find();

// // // //     // 3️⃣ Merge blockchain + vendor info
// // // //     const products = allProducts.map((p) => {
// // // //       const dbEntry = dbProducts.find((d) => d.blockchainId === Number(p.id));
// // // //       return {
// // // //         id: Number(p.id),
// // // //         name: p.name,
// // // //         price: Number(p.price),
// // // //         quantity: Number(p.quantity),
// // // //         vendorId: dbEntry ? dbEntry.vendorId : null, // ✅ Real vendor linkage
// // // //       };
// // // //     });

// // // //     res.json(products);
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });


// // // // // ==================== Protected Product Routes ====================
// // // // // app.post("/products", auth, authorizeRole("vendor", "admin"), async (req, res) => {
// // // // //   try {
// // // // //     const { id, name, price, quantity } = req.body;
// // // // //     const tx = await contractInstance.setProduct(Number(id), name, Number(price), Number(quantity));
// // // // //     await tx.wait();
// // // // //     res.json({ success: true });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ message: err.message });
// // // // //   }
// // // // // });

// // // // app.post("/products", auth, authorizeRole("vendor", "admin"), async (req, res) => {
// // // //   try {
// // // //     const { id, name, price, quantity } = req.body;

// // // //     // 🪙 Step 1: Save on blockchain
// // // //     const tx = await contractInstance.setProduct(Number(id), name, Number(price), Number(quantity));
// // // //     await tx.wait();

// // // //     // 🧩 Step 2: Save locally with vendorId
// // // //     const newProduct = new Product({
// // // //       blockchainId: id,
// // // //       name,
// // // //       price,
// // // //       quantity,
// // // //       vendorId: req.user.id, // 👈 this ensures linkage to the real vendor
// // // //     });

// // // //     await newProduct.save();

// // // //     res.json({ success: true, message: "Product added successfully" });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });


// // // // app.put("/products/:id", auth, authorizeRole("vendor", "admin"), async (req, res) => {
// // // //   try {
// // // //     const { name, price, quantity } = req.body;
// // // //     const tx = await contractInstance.updateProduct(Number(req.params.id), name, Number(price), Number(quantity));
// // // //     await tx.wait();
// // // //     res.json({ success: true });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });

// // // // app.delete("/products/:id", auth, authorizeRole("admin"), async (req, res) => {
// // // //   try {
// // // //     const tx = await contractInstance.deleteProduct(Number(req.params.id));
// // // //     await tx.wait();
// // // //     res.json({ success: true });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: err.message });
// // // //   }
// // // // });

// // // // // ==================== Buy Requests & Events ====================
// // // // app.use("/buy-requests", buyRequestRouter);
// // // // app.use("/events", eventsRouter);

// // // // // ==================== Start Server ====================
// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// // // require("./db");
// // // const express = require("express");
// // // const cors = require("cors");
// // // const { contractInstance } = require("./contract");
// // // const auth = require("./middleware/auth");
// // // const authorizeRole = require("./middleware/authorizeRole");
// // // const { register, login } = require("./users/userController");
// // // const eventsRouter = require("./routes/events");
// // // const buyRequestRouter = require("./routes/buyRequest");
// // // const Product = require("./userBuyModels/Products");

// // // const app = express();

// // // // ==================== Middleware ====================
// // // app.use(express.json());
// // // app.use(
// // //   cors({
// // //     origin: "http://localhost:8081",
// // //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// // //     allowedHeaders: ["Content-Type", "Authorization"],
// // //     credentials: true,
// // //   })
// // // );
// // // app.options("*", cors());

// // // // ==================== Auth Routes ====================
// // // app.post("/register", register);
// // // app.post("/login", login);

// // // // ==================== Product Routes ====================

// // // // 🧾 Fetch all products (merged blockchain + Mongo)
// // // app.get("/products", async (req, res) => {
// // //   try {
// // //     // 1️⃣ Get all blockchain products
// // //     const allProducts = await contractInstance.getAllProducts();

// // //     // 2️⃣ Fetch vendor mapping from MongoDB
// // //     const dbProducts = await Product.find();

// // //     // 3️⃣ Merge blockchain + vendor info
// // //     const products = allProducts.map((p) => {
// // //       const dbEntry = dbProducts.find((d) => d.blockchainId === Number(p.id));
// // //       return {
// // //         id: Number(p.id),
// // //         name: p.name,
// // //         price: Number(p.price),
// // //         quantity: Number(p.quantity),
// // //         vendorId: dbEntry ? dbEntry.vendorId : null, // ✅ Real vendor linkage
// // //       };
// // //     });

// // //     res.json(products);
// // //   } catch (err) {
// // //     console.error("❌ Error fetching products:", err);
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // });

// // // // 🏗️ Add product (vendor-only)
// // // app.post("/products", auth, authorizeRole("vendor", "admin"), async (req, res) => {
// // //   try {
// // //     const { id, name, price, quantity } = req.body;

// // //     // ✅ Step 1: Store on blockchain
// // //     const tx = await contractInstance.setProduct(Number(id), name, Number(price), Number(quantity));
// // //     await tx.wait();

// // //     // ✅ Step 2: Save locally in MongoDB (for vendor linkage)
// // //     const newProduct = new Product({
// // //       blockchainId: id,
// // //       name,
// // //       price,
// // //       quantity,
// // //       vendorId: req.user.id, // ✅ real vendor linkage
// // //     });

// // //     await newProduct.save();

// // //     res.json({ success: true, message: "Product added successfully" });
// // //   } catch (err) {
// // //     console.error("❌ Error adding product:", err);
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // });

// // // // 🛠️ Update product (vendor/admin)
// // // app.put("/products/:id", auth, authorizeRole("vendor", "admin"), async (req, res) => {
// // //   try {
// // //     const { name, price, quantity } = req.body;
// // //     const tx = await contractInstance.updateProduct(Number(req.params.id), name, Number(price), Number(quantity));
// // //     await tx.wait();

// // //     // Optional: update in MongoDB if needed
// // //     await Product.findOneAndUpdate({ blockchainId: Number(req.params.id) }, { name, price, quantity });

// // //     res.json({ success: true, message: "Product updated successfully" });
// // //   } catch (err) {
// // //     console.error("❌ Error updating product:", err);
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // });

// // // // 🗑️ Delete product (admin-only)
// // // app.delete("/products/:id", auth, authorizeRole("admin"), async (req, res) => {
// // //   try {
// // //     const tx = await contractInstance.deleteProduct(Number(req.params.id));
// // //     await tx.wait();

// // //     await Product.findOneAndDelete({ blockchainId: Number(req.params.id) });

// // //     res.json({ success: true, message: "Product deleted successfully" });
// // //   } catch (err) {
// // //     console.error("❌ Error deleting product:", err);
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // });

// // // // ==================== Buy Requests & Events ====================
// // // app.use("/buy-requests", buyRequestRouter);
// // // app.use("/events", eventsRouter);

// // // // ==================== Server Startup ====================
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


// // // ==================== Imports ====================
// // require("./db");
// // const express = require("express");
// // const cors = require("cors");
// // const { contractInstance } = require("./contract");
// // const auth = require("./middleware/auth");
// // const authorizeRole = require("./middleware/authorizeRole");
// // const { register, login } = require("./users/userController");
// // const eventsRouter = require("./routes/events");
// // const buyRequestRouter = require("./routes/buyRequest");
// // const Product = require("./userBuyModels/Products"); // ✅ Mongo model (linked to vendor)

// // // ==================== App Init ====================
// // const app = express();
// // app.use(express.json());

// // // ==================== CORS Config ====================
// // app.use(
// //   cors({
// //     origin: "http://localhost:8081", // frontend port
// //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //     credentials: true,
// //   })
// // );
// // app.options("*", cors());

// // // ==================== Auth Routes ====================
// // app.post("/register", register);
// // app.post("/login", login);

// // // ==================== PRODUCTS ====================

// // // 🧾 Get all products (merged blockchain + vendor mapping)
// // app.get("/products", async (req, res) => {
// //   try {
// //     // 1️⃣ Blockchain products
// //     const allProducts = await contractInstance.getAllProducts();

// //     // 2️⃣ Vendor–product mappings from MongoDB
// //     const dbProducts = await Product.find();

// //     // 3️⃣ Merge both data sources
// //     const products = allProducts.map((p) => {
// //       const linked = dbProducts.find((d) => d.blockchainId === Number(p.id));
// //       return {
// //         id: Number(p.id),
// //         name: p.name,
// //         price: Number(p.price),
// //         quantity: Number(p.quantity),
// //         vendorId: linked ? linked.vendorId : null, // ✅ attach real vendorId
// //       };
// //     });

// //     res.json(products);
// //   } catch (err) {
// //     console.error("❌ Error fetching products:", err);
// //     res.status(500).json({ message: "Failed to fetch products" });
// //   }
// // });

// // // 📦 Get single product by ID
// // app.get("/products/:id", async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const product = await contractInstance.getProduct(id);

// //     // Defensive: check for empty or invalid product
// //     if (!product || !product[0]) {
// //       return res.status(404).json({ message: `Product with ID ${id} not found` });
// //     }

// //     // Find vendor linkage in MongoDB
// //     const dbEntry = await Product.findOne({ blockchainId: Number(id) });

// //     res.json({
// //       id: Number(id),
// //       name: product[0],
// //       price: Number(product[1]),
// //       quantity: Number(product[2]),
// //       vendorId: dbEntry ? dbEntry.vendorId : null,
// //     });
// //   } catch (err) {
// //     console.error("❌ Error fetching single product:", err.message);
// //     res.status(500).json({ message: "Failed to fetch product details" });
// //   }
// // });

// // // 🏗️ Add new product (vendor/admin)
// // app.post("/products", auth, authorizeRole("vendor", "admin"), async (req, res) => {
// //   try {
// //     const { id, name, price, quantity } = req.body;

// //     // 1️⃣ Store in blockchain
// //     const tx = await contractInstance.setProduct(Number(id), name, Number(price), Number(quantity));
// //     await tx.wait();

// //     // 2️⃣ Store in Mongo for vendor reference
// //     const newProduct = new Product({
// //       blockchainId: id,
// //       name,
// //       price,
// //       quantity,
// //       vendorId: req.user.id, // ✅ actual vendor who added this
// //     });

// //     await newProduct.save();
// //     res.json({ success: true, message: "Product added successfully" });
// //   } catch (err) {
// //     console.error("❌ Error adding product:", err);
// //     if (err.message.includes("exists")) {
// //       res.status(400).json({ message: "Product ID already exists" });
// //     } else {
// //       res.status(500).json({ message: "Failed to add product" });
// //     }
// //   }
// // });

// // // 🛠️ Update existing product (vendor/admin)
// // app.put("/products/:id", auth, authorizeRole("vendor", "admin"), async (req, res) => {
// //   try {
// //     const { name, price, quantity } = req.body;
// //     const productId = Number(req.params.id);

// //     // 1️⃣ Update in blockchain
// //     const tx = await contractInstance.updateProduct(productId, name, Number(price), Number(quantity));
// //     await tx.wait();

// //     // 2️⃣ Update in MongoDB (optional sync)
// //     await Product.findOneAndUpdate(
// //       { blockchainId: productId },
// //       { name, price, quantity },
// //       { new: true }
// //     );

// //     res.json({ success: true, message: "Product updated successfully" });
// //   } catch (err) {
// //     console.error("❌ Error updating product:", err);
// //     res.status(500).json({ message: "Failed to update product" });
// //   }
// // });

// // // 🗑️ Delete product (admin only)
// // app.delete("/products/:id", auth, authorizeRole("admin"), async (req, res) => {
// //   try {
// //     const productId = Number(req.params.id);

// //     // 1️⃣ Delete from blockchain
// //     const tx = await contractInstance.deleteProduct(productId);
// //     await tx.wait();

// //     // 2️⃣ Delete from MongoDB
// //     await Product.findOneAndDelete({ blockchainId: productId });

// //     res.json({ success: true, message: "Product deleted successfully" });
// //   } catch (err) {
// //     console.error("❌ Error deleting product:", err);
// //     res.status(500).json({ message: "Failed to delete product" });
// //   }
// // });

// // // ==================== OTHER MODULES ====================
// // app.use("/buy-requests", buyRequestRouter);
// // app.use("/events", eventsRouter);

// // // ==================== SERVER START ====================
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// // ==================== Imports ====================
// require("./db");
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const { contractInstance } = require("./contract");
// const auth = require("./middleware/auth");
// const authorizeRole = require("./middleware/authorizeRole");
// const { register, login } = require("./users/userController");
// const eventsRouter = require("./routes/events");
// const buyRequestRouter = require("./routes/buyRequest");
// const Product = require("./userBuyModels/Products"); // ✅ Mongo model linked to vendor

// // ==================== App Init ====================
// const app = express();
// app.use(express.json());

// // ==================== CORS Config ====================
// app.use(
//   cors({
//     origin: "http://localhost:8081", // frontend port
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
// app.options("*", cors());

// // ==================== Serve Receipts (PDFs) ====================
// const receiptsDir = path.join(__dirname, "receipts");
// app.use("/receipts", express.static(receiptsDir, { index: false, extensions: ["pdf"] }));

// // ==================== Auth Routes ====================
// app.post("/register", register);
// app.post("/login", login);

// // ==================== PRODUCTS ====================

// // 🧾 Get all products (merged blockchain + vendor mapping)
// app.get("/products", async (req, res) => {
//   try {
//     const allProducts = await contractInstance.getAllProducts();
//     const dbProducts = await Product.find();

//     const products = allProducts.map((p) => {
//       const linked = dbProducts.find((d) => d.blockchainId === Number(p.id));
//       return {
//         id: Number(p.id),
//         name: p.name,
//         price: Number(p.price),
//         quantity: Number(p.quantity),
//         vendorId: linked ? linked.vendorId : null,
//       };
//     });

//     res.json(products);
//   } catch (err) {
//     console.error("❌ Error fetching products:", err);
//     res.status(500).json({ message: "Failed to fetch products" });
//   }
// });

// // 📦 Get single product by ID
// app.get("/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await contractInstance.getProduct(id);

//     if (!product || !product[0]) {
//       return res.status(404).json({ message: `Product with ID ${id} not found` });
//     }

//     const dbEntry = await Product.findOne({ blockchainId: Number(id) });

//     res.json({
//       id: Number(id),
//       name: product[0],
//       price: Number(product[1]),
//       quantity: Number(product[2]),
//       vendorId: dbEntry ? dbEntry.vendorId : null,
//     });
//   } catch (err) {
//     console.error("❌ Error fetching product:", err.message);
//     res.status(500).json({ message: "Failed to fetch product details" });
//   }
// });
// // 🏗️ Add new product (vendor/admin) — FIXED VERSION
// app.post("/products", auth, authorizeRole("vendor", "admin"), async (req, res) => {
//   try {
//     const { name, price, quantity } = req.body;

//     // 1️⃣ Fetch all blockchain products
//     const allProducts = await contractInstance.getAllProducts();

//     // 2️⃣ Determine next blockchain ID (skip any timestamp-style IDs)
// let nextId = 1;

// if (allProducts.length > 0) {
//   const numericIds = allProducts
//     .map(p => Number(p.id))
//     .filter(id => !isNaN(id) && id > 0 && id < 1000000); // keep only clean numbers

//   if (numericIds.length > 0) {
//     const lastId = Math.max(...numericIds);
//     nextId = lastId + 1;
//   }
// }

// console.log(`ℹ️ Next product ID to assign on blockchain: ${nextId}`);

// }

//     // 🏗️ Add new product (vendor/admin) — FIXED VERSION
// app.post("/products", auth, authorizeRole("vendor", "admin"), async (req, res) => {
//   try {
//     const { name, price, quantity } = req.body;

//     // 1️⃣ Fetch all blockchain products
//     const allProducts = await contractInstance.getAllProducts();

//     // 2️⃣ Determine next blockchain ID (skip any timestamp-style IDs)
//     let nextId = 1;
//     if (allProducts.length > 0) {
//       const numericIds = allProducts
//         .map(p => Number(p.id))
//         .filter(id => !isNaN(id) && id > 0 && id < 1000000); // keep only clean numbers

//       if (numericIds.length > 0) {
//         const lastId = Math.max(...numericIds);
//         nextId = lastId + 1;
//       }
//     }

//     console.log(`ℹ️ Next product ID to assign on blockchain: ${nextId}`);

//     // 3️⃣ Add product to blockchain
//     const tx = await contractInstance.setProduct(
//       nextId,
//       name,
//       Number(price),
//       Number(quantity)
//     );
//     await tx.wait();

//     // 4️⃣ Save same ID to MongoDB for vendor mapping
//     const newProduct = new Product({
//       blockchainId: nextId,
//       name,
//       price,
//       quantity,
//       vendorId: req.user.id,
//     });

//     await newProduct.save();

//     console.log(`✅ Product added → Blockchain ID: ${nextId}`);

//     res.status(201).json({
//       success: true,
//       message: `Product added successfully (Blockchain ID: ${nextId})`,
//       blockchainId: nextId,
//     });
//   } catch (err) {
//     console.error("❌ Error adding product:", err);
//     res.status(500).json({ message: "Failed to add product" });
//   }
// });



// // 🛠️ Update product
// app.put("/products/:id", auth, authorizeRole("vendor", "admin"), async (req, res) => {
//   try {
//     const { name, price, quantity } = req.body;
//     const productId = Number(req.params.id);

//     const tx = await contractInstance.updateProduct(productId, name, Number(price), Number(quantity));
//     await tx.wait();

//     await Product.findOneAndUpdate(
//       { blockchainId: productId },
//       { name, price, quantity },
//       { new: true }
//     );

//     res.json({ success: true, message: "Product updated successfully" });
//   } catch (err) {
//     console.error("❌ Error updating product:", err);
//     res.status(500).json({ message: "Failed to update product" });
//   }
// });

// // 🗑️ Delete product
// app.delete("/products/:id", auth, authorizeRole("admin"), async (req, res) => {
//   try {
//     const productId = Number(req.params.id);
//     const tx = await contractInstance.deleteProduct(productId);
//     await tx.wait();

//     await Product.findOneAndDelete({ blockchainId: productId });

//     res.json({ success: true, message: "Product deleted successfully" });
//   } catch (err) {
//     console.error("❌ Error deleting product:", err);
//     res.status(500).json({ message: "Failed to delete product" });
//   }
// });

// // ==================== OTHER MODULES ====================
// app.use("/buy-requests", buyRequestRouter);
// app.use("/events", eventsRouter);

// // ==================== SERVER START ====================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


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
const Product = require("./userBuyModels/Products"); // ✅ Mongo model linked to vendor

// ==================== App Init ====================
const app = express();
app.use(express.json());

// ==================== CORS Config ====================
app.use(
  cors({
    origin: "http://localhost:8081", // frontend port
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

// ==================== Serve Receipts (PDFs) ====================
const receiptsDir = path.join(__dirname, "receipts");
app.use(
  "/receipts",
  express.static(receiptsDir, { index: false, extensions: ["pdf"] })
);

// ==================== Auth Routes ====================
app.post("/register", register);
app.post("/login", login);

// ==================== PRODUCTS ====================

// 🧾 Get all products (merged blockchain + vendor mapping)
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
      };
    });

    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// 📦 Get single product by ID
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
    });
  } catch (err) {
    console.error("❌ Error fetching product:", err.message);
    res.status(500).json({ message: "Failed to fetch product details" });
  }
});

// 🏗️ Add new product (vendor/admin) — FIXED VERSION
app.post("/products", auth, authorizeRole("vendor", "admin"), async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    // 1️⃣ Fetch all blockchain products
    const allProducts = await contractInstance.getAllProducts();

    // 2️⃣ Determine next blockchain ID (skip any timestamp-style IDs)
    let nextId = 1;
    if (allProducts.length > 0) {
      const numericIds = allProducts
        .map((p) => Number(p.id))
        .filter((id) => !isNaN(id) && id > 0 && id < 1000000); // keep only clean numbers

      if (numericIds.length > 0) {
        const lastId = Math.max(...numericIds);
        nextId = lastId + 1;
      }
    }

    console.log(`ℹ️ Next product ID to assign on blockchain: ${nextId}`);

    // 3️⃣ Add product to blockchain
    const tx = await contractInstance.setProduct(
      nextId,
      name,
      Number(price),
      Number(quantity)
    );
    await tx.wait();

    // 4️⃣ Save same ID to MongoDB for vendor mapping
    const newProduct = new Product({
      blockchainId: nextId,
      name,
      price,
      quantity,
      vendorId: req.user.id,
    });

    await newProduct.save();

    console.log(`✅ Product added → Blockchain ID: ${nextId}`);

    res.status(201).json({
      success: true,
      message: `Product added successfully (Blockchain ID: ${nextId})`,
      blockchainId: nextId,
    });
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// 🛠️ Update product
app.put("/products/:id", auth, authorizeRole("vendor", "admin"), async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const productId = Number(req.params.id);

    const tx = await contractInstance.updateProduct(
      productId,
      name,
      Number(price),
      Number(quantity)
    );
    await tx.wait();

    await Product.findOneAndUpdate(
      { blockchainId: productId },
      { name, price, quantity },
      { new: true }
    );

    res.json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// 🗑️ Delete product
app.delete("/products/:id", auth, authorizeRole("admin"), async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const tx = await contractInstance.deleteProduct(productId);
    await tx.wait();

    await Product.findOneAndDelete({ blockchainId: productId });

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

// ==================== OTHER MODULES ====================
app.use("/buy-requests", buyRequestRouter);
app.use("/events", eventsRouter);

// ==================== SERVER START ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
