//import express, Router, and Product schema
const express = require("express");
const router = express.Router();
const Book = require("../models/Product");
const Product = require("../models/Product");

//---------------------------------------------------------
//POST / - Creates a new product using the data in req.body
//---------------------------------------------------------

router.post("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

//---------------------------------------
//DELETE /:id - Deletes a book by its _id
//---------------------------------------

router.delete("/:id", async (req, res) => {
  try {
    //find and delete product by ID
    const product = await Product.findByIdAndDelete(req.params.id);

    //if product not found return 404
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    //return success message
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    //handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    //handle unexpected server errors
    res.status(500).json({ error: "Server error" });
  }
});

//-------------------------------------------------------------
// GET /api/products - Read All Products with Advanced Querying
//-------------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    //destructure query parameters with defaults
    const {
      category,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    //build filter object dynamically
    const filter = {};
    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    //build sort options
    let sort = {};
    if (sortBy) {
      const [field, order] = sortBy.split("_");
      sort[field] = order === "desc" ? -1 : 1;
    }

    //pagination calculation
    const skip = (Number(page) - 1) * Number(limit);

    //execute query
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    //count total for pagination metadata
    const total = await Product.countDocuments(filter);

    //send response with metadata
    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
