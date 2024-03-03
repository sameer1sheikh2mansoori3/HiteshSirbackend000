const mongoose = require("mongoose");
const dotenv = require('dotenv');
const asyncHandler = require("express-async-handler");
dotenv.config();

const connectDatabase = async () => {
  try {
    // Log the environment variable for verification (optional)
    // console.log("Connecting to MongoDB:", process.env.Mongodb_url);

    // Establish the connection
    const databaseInstance = await mongoose.connect(process.env.Mongodb_url);

    // Log successful connection
    console.log("Connected to MongoDB database!");

    return databaseInstance;
  } catch (error) {
    // Log any errors during connection
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error for proper handling
  }
};

module.exports = connectDatabase;