const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });

    isConnected = true;
    console.log("✓ Connected to MongoDB");
  } catch (err) {
    console.error("✗ MongoDB connection failed:", err.message);
    throw err;
  }
}

async function disconnectDB() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log("Disconnected from MongoDB");
  }
}

module.exports = { connectDB, disconnectDB };
