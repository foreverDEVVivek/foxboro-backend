const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating the Order Schema
const orderSchema = new Schema(
  {
    orderNo: { type: String, unique: true },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
//Before saving Orders
orderSchema.pre("save", async function (next) {
  try {
    if (!this.orderNo) {
      // Ensure only new orders get a number
      const lastOrder = await Order.findOne().sort({ orderNo: -1 });

      // Extract numeric part, default to 10000
      const lastOrderNumber = lastOrder
        ? parseInt(lastOrder.orderNo.split("-")[1])
        : 9999;

      this.orderNo = `ORD-${lastOrderNumber + 1}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Order;
