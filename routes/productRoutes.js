//import express, Router, and Product schema
const express = require("express");
const router = express.Router();
const Book = require("../models/Product");
const Product = require("../models/Product");

//---------------------------------------------------------
//POST / - Creates a new product using the data in req.body
//---------------------------------------------------------

router.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    //return the product directly
    res.status(201).json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server Error" });
  }
});
//--------------------------------------
//GET /:id - Get a single Product by ID
//--------------------------------------

router.get("/api/products/:id", async (req, res) => {
  try {
    //find product by ID
    const product = await Product.findById(req.params.id);

    //if not found return 404
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    //return the product
    res.json(product);
  } catch (error) {
    //handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    //handle unexpected server errors
    res.status(500).json({ error: "Server error" });
  }
});

//----------------------------------------------------------------
//PUT /:id - Updates a book by its _id using the data in req.body
//----------------------------------------------------------------

router.put("/api/products/:id", async (req, res) => {
  try {
    //find product by ID and update with request body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //return updated document
    );

    //if no product found return 404
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    //return updated product
    res.json(updatedProduct);
  } catch (error) {
    //handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    //handle unexpected server errors
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
