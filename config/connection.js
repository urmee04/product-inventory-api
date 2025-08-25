//load envirnmental variables
require("dotenv").config();

//import mongoose
const mongoose = require("mongoose");

//async function to connect to MongoDB

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection Established");
  } catch (error) {
    console.error("Connection failed:", error.message);
    //rethrow error so server.js can handle process exit
    throw error;
  }
}

//export function
module.exports = connectDatabase;
