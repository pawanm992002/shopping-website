const mongoose = require("mongoose");

const shopkeeperSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    password: { type: String, required: true },
    country: Object,
    state: Object,
    city: Object,
    receiveEmail: Boolean,
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const shopkeeperModal =
  mongoose.models.shopkeeper || mongoose.model("shopkeeper", shopkeeperSchema);

module.exports = shopkeeperModal;
