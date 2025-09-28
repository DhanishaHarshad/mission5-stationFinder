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