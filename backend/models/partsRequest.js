const mongoose = require("mongoose");

const partsRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    machineType: { type: String, required: true },
    partNumber: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    priority: {
      type: String,
      enum: ["Low", "Normal", "High", "Urgent"],
      default: "Medium",
    },
    message: { type: String },
  },
  { timestamps: true },
);

const PartsRequest = mongoose.model("PartsRequest", partsRequestSchema);
module.exports = PartsRequest;
