const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imgs: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const itemModal = mongoose.models.item || mongoose.model("item", itemSchema);

module.exports = itemModal;
