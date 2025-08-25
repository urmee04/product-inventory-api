//import express, Router, and Product schema
const express = require("express");
const router = express.Router();
const Book = require("../models/Product");
const Product = require("../models/Product");

//POST / - Creates a new product using the data in req.body

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

module.exports = router;
