const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
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
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
      },
    ],
  },
  { timestamps: true }
);

const customerModal =
  mongoose.models.customer || mongoose.model("customer", customerSchema);

module.exports = customerModal;
