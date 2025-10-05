import ZEnergyStation from "../models/ZEnergySchema.js";
//____ IMPORT SEARCHQUERY _____
import searchQuery from "../utils/searchQuery.js";

//____ ACCEPT QUERY PARAMS FROM FRONTEND CONST {SEARCH="", FILTER=[]} = REQ.QUERY

//_______ PASS THE QUERY THROUGH HERE ENSURING THE DEFAULT IS ZEnergyStation.find({}) ________

//_____ DEFAULT IS FIND ALL STATIONS _____

//____ QUERY THE DATABASE ______

// if there is no search then get everything else display the filtered results
export const getStations = async (req, res) => {
  try {
    let { search = "", services = [], fuelType = [] } = req.query;
    console.log("Received query params:", { search, services, fuelType });
    if (typeof services === "string") {
      services = services.split(","); // convert single string to array
    }
    if (typeof fuelType === "string") {
      fuelType = fuelType.split(","); // convert single string to array
    }
    let getStationResult = [];
    if (search === "" && services.length === 0 && fuelType.length === 0) {
      console.log("No search or filter provided, fetching all stations.");
      getStationResult = await ZEnergyStation.find({});
    } else {
      getStationResult = await searchQuery(search, services, fuelType);
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
