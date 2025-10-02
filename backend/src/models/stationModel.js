// backend/src/models/stationModel.js
import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  latitude: Number,
  longitude: Number,
  services: [String], // e.g. ["Car Wash", "EV Charging"]
});

const Station = mongoose.model("Station", stationSchema);

export default Station;
