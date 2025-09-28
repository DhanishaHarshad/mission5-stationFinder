import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import ZEnergyStation from "./src/models/ZEnergySchema.js";
import { connectDB } from "./src/config/connectDb.js";

dotenv.config();

const app = express();
connectDB();
// =============================================================================
// ___ COMMENTED OUT AND HAVE MOVED DB CONNECTION TO CONFIG FOLDER ____
//connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const Station = mongoose.model("z-energy-stations", ZEnergyStation.schema);
// =============================================================================

//middleware to parse JSON bodies
app.use(cors({ origin: "https://localhost:3000" })); // allow the react dev server
app.use(express.json());
app.use(morgan("dev")); // 'dev' is a common format for concise colored output

// GET /stations with filtering, sorting
// app.get("/", function (req, res) {
//   res.send("hello, world!");
// });

app.get("/stations", async (req, res) => {
  try {
    const {
      city,
      region,
      services,
      sort_by,
      order = "asc",
      limit = 10,
    } = req.query;

    console.log("Processing station filter requests", {
      city,
      region,
      services,
      sort_by,
      order,
      limit,
    });

    // build match object dynamically
    const match = {};

    if (city) match["location.city"] = city;
    if (region) match["location.region"] = region;

    if (services) {
      match["services.type"] = { $all: services.split(",") };
    }

    // build aggregation pipeline for filtering
    const pipeline = [
      {
        $match: match,
      },
    ];

    //sorting
    if (sort_by) {
      pipeline.push({ $sort: { [sort_by]: order === "desc" ? -1 : 1 } });
    }

    // limiting
    pipeline.push({ $limit: Number(limit) });

    const results = await ZEnergyStation.aggregate(pipeline);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
