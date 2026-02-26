const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    phone_number: {
      required: true,
      type: String,
    },
    state: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("contact", contactSchema);
