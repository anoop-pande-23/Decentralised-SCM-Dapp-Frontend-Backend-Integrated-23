const mongoose = require("mongoose");

const buyRequestSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  receiptHash: { type: String },
  receiptUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BuyRequest", buyRequestSchema);
