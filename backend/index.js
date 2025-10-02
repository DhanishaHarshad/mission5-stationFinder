// CORE IMPORTS
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import React, { useState } from "react";

// LOCAL IMPORTS
import ZEnergyStation from "./src/models/ZEnergySchema.js";
import { connectDB } from "./src/config/connectDb.js";
import {
  getStationById,
  getStations,
} from "./src/controllers/getStationController.js";

import geocodeRoute from "./src/routes/geocode.js";

// CONFIG
dotenv.config();

const FRONT = process.env.FRONT || "https://localhost:5173";
const PORT = process.env.PORT || 4000;

const app = express();

//DB connection
connectDB();

//middleware to parse JSON bodies
app.use(cors({ origin: "https://localhost:5173" })); // allow the react dev server
app.use(express.json());

app.use(morgan("dev")); // 'dev' is a common format for concise colored output

// __ TEST ___
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

app.get("/", function (req, res) {
  res.send("hello, world!");
});

//API endpoint to receive location data
app.post("/api/location", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Invalid location data" });
    }

    console.log("Received Location:", { latitude, longitude });

    res.status(200).json({ message: `Lat: ${latitude}, Lon: ${longitude}` });
  } catch (error) {
    console.error("Error saving the location:", error);
  }
});

// STATION API
app.get("/api/zstations", async (req, res) => {
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

    if (sort_by) {
      pipeline.push({ $sort: { [sort_by]: order === "desc" ? -1 : 1 } });
    }

    const parsedLimit = Number(limit);
    pipeline.push({ $limit: isNaN(parsedLimit) ? 10 : parsedLimit });

    // limiting
    // pipeline.push({ $limit: Number(limit) });

    const results = await ZEnergyStation.aggregate(pipeline);
    // const results = await ZEnergyStation.find({});
    res.json(results);
  } catch (err) {
    console.error("Station fetch error", err.stack);
    res.status(500).json({ error: err.message });
  }
});

// route for geocoding requests
app.use("/api/geocode", geocodeRoute);

// app.get("/api/zstations", getStations);
// app.get("/api/zstations/id", getStationById);

// const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
