// backend/src/controllers/zstationController.js
import Station from "../models/stationModel.js";

export const getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    console.error("Error fetching stations:", err);
    res.status(500).json({ error: "Server error fetching stations" });
  }
};
