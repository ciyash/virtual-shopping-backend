import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
          default: "0",
        },

        color: {
          type: String,
          default: "",
        },
        price: {
          type: Number,
          required: true,
        },
        offerPrice: {
          type: Number,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);