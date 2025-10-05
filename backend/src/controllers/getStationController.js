import ZEnergyStation from "../models/ZEnergySchema.js";
//____ IMPORT SEARCHQUERY _____
import searchQuery from "../utils/searchQuery.js";

// if there is no search then get everything else display the filtered results
export const getStations = async (req, res) => {
  try {
    let { search = "", services = [], fuelTypes = [] } = req.query;

    if (typeof services === "string") {
      services = services.split(","); // convert single string to array
    }
    if (typeof fuelTypes === "string") {
      fuelTypes = fuelTypes.split(","); // convert single string to array
    }
    
    let getStationResult = [];
    if (search === "" && services.length === 0 && fuelTypes.length === 0) {
      console.log("No search or filter provided, fetching all stations.");
      getStationResult = await ZEnergyStation.find({});
    } else {
      getStationResult = await searchQuery(search, services, fuelTypes);
      console.log(
        `Fetched ${getStationResult.length} stations based on search and filters.`
      );
    }
    res.status(200).json(getStationResult);
  } catch (error) {
    console.error("There was an error fetching stations", error.message);
    res.status(500).json({ error: "Failed to fetch station results" });
  }
};

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
