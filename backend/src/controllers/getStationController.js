import ZEnergyStation from "../models/ZEnergySchema.js";

export const getStations = async (req, res) => {
    try {
        const getStationResult = await ZEnergyStation.find({})
        res.status(200).json(getStationResult)
    } catch (error) {
        console.error("There was an error fetching stations", error.message)
        res.status(500).json({ error: "Failed to fetch station results"})
    }
}

export const getStationById = async (req, res) => {
  const { id } = req.params;
  try {
    const station = await ZEnergyStation.findById(id);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    res.status(200).json(station);
  } catch (error) {
    console.error("Error fetching station by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch station" });
  }
};