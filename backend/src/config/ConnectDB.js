import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MongoDB = process.env.MONGO_URI;

mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(MongoDB);
    console.log("MongoDB Connected to:", mongoose.connection.name);
  } catch (err) {
    console.error("Connection Error:", err.message);
    process.exit(1);
  }
};

const closeDB = async () => {
  await mongoose.connection.close();
  console.log("MongoDB Connection Closed");
};

process.once("exit", async () => {
  if (mongoose.connection.readyState === 1) {
    await closeDB();
  }
});

export { connectDB, closeDB };