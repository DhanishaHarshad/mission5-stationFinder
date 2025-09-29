import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import ZEnergyStation from "./src/models/ZEnergySchema.js";
import { connectDB } from "./src/config/connectDb.js";
import { getStationById, getStations } from "./src/controllers/getStationController.js";

dotenv.config();

const front = process.env.FRONT

const app = express();
connectDB()
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
app.use(express.json());
app.use(cors({
  origin: front,
  credentials: true
}))

app.use(morgan("dev")); // 'dev' is a common format for concise colored output

// __ TEST ___
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});


app.get("/", function (req, res) {
  res.send("hello, world!");
});

// GET /stations with filtering, sorting
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

    // build aggregation pipeline for filtering
    const pipeline = [
      {
        $match: {
          "location.city": city,
          "location.region": region,
          services: { $all: services ? services.split(",") : [] },
        },
      },
    ];

    const results = await ZEnergyStation.aggregate(pipeline);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api", getStations)
app.use("/api", getStationById)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
