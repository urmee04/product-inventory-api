//load environmental variables
require("dotenv").config();

//import database connection
const connectDatabase = require("./config/connection");

//import express
const express = require("express");

//import routes
const productRoutes = require("./routes/productRoutes");

//create express app
const app = express();

//middleware to parse JSON
app.use(express.json());

//mount routes
app.use("/api/products", productRoutes);

//test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Product Inventory API" });
});

//define port
const PORT = process.env.PORT || 3001;

//start server only after DB connection
async function startServer() {
  try {
    await connectDatabase(); //wait for DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); //exit process if startup fails
  }
}

startServer();
