const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  blockchainId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Product", productSchema);
