import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import { connectDB } from "./src/config/connectDb.js";

dotenv.config()
const app = express();
const PORT = process.env.PORT

app.use(morgan("dev"));
app.use(express.json());

connectDB()


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})