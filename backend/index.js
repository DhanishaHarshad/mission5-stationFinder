import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import ZEnergyStation from "./src/models/ZEnergySchema.js";
import { connectDB } from "./src/config/connectDb.js";

dotenv.config();

const front = process.env.FRONT;

const app = express();
connectDB();

//middleware to parse JSON bodies
app.use(cors({ origin: "http://localhost:5173" })); // allow the react dev server
app.use(express.json());

app.use(morgan("dev")); // 'dev' is a common format for concise colored output

// __ TEST ___
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

app.get("/", function (req, res) {
  res.send("hello, world!");
});

app.get("/stations", async (req, res) => {
  try {
    const { address = ".*", services, order = "asc", limit = 10 } = req.query;

    console.log("Processing station filter requests", {
      address,
      services,
      order,
      limit,
    });

    // build match object dynamically
    const match = {};

    if (address) match.address = { $regex: address, $options: "i" };

    // if (region) match.address = { $regex: region, $options: "i" };

    if (services) {
      match["services.type"] = { $all: services.split(",") };
    }

    // build aggregation pipeline for filtering
    const pipeline = [
      {
        $match: match,
      },
    ];

    sorting;
    if (sort_by) {
      pipeline.push({ $sort: { [sort_by]: order === "desc" ? -1 : 1 } });
    }

    // limiting
    pipeline.push({ $limit: Number(limit) });

    const results = await ZEnergyStation.aggregate(pipeline);
    // const results = await ZEnergyStation.find({});
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.use("/api", getStations);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
