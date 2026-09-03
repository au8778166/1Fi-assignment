import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    variant: {
      name: String,
      value: String,
    },

    plan: {
      monthlyAmount: {
        type: Number,
        required: true,
      },

      tenure: {
        type: Number,
        required: true,
      },

      interestRate: {
        type: Number,
        required: true,
      },

      cashback: {
        type: Number,
        default: 0,
      },
    },

    productPrice: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;