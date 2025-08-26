//import mongoose
const mongoose = require("mongoose");

//define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name is required"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "product description is required"],
    trim: true,
  },

  price: {
    type: Number,
    required: [true, "product price is required"],
    min: [0.01, "price must be greater than 0"],
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "price must be greater than 0",
    },
  },

  category: {
    type: String,
    required: [true, "product category is required"],
    trim: true,
  },

  inStock: {
    type: Boolean,
    default: true,
  },

  tags: {
    type: [String],
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//compile the schema into a model
const Product = mongoose.model("Product", productSchema);

//export the model
module.exports = Product;
