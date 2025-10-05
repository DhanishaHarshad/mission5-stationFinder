//___ BUILD A DYNAMIC QUERY HERE IN THE BACKEND TO FILTER AND SEARCH___
import ZEnergyStation from "../models/ZEnergySchema.js";

//____ SEARCHQUERY FUNCTION TO HANDLE THE LOGIC _____
async function searchQuery(search = ".*", services = [], fuelTypes = []) {
  try {
    // build match object dynamically
    //address search uses regex for partial matching and case insensitivity
    const match = {
      address: { $regex: search, $options: "i" },
    };
    // if (region) match.address = { $regex: region, $options: "i" };
    if (services.length > 0) {
      match["services.type"] = { $all: services };
    }
    if (fuelTypes.length > 0) {
      match["fuel_prices.type"] = { $all: fuelTypes };
    }
    // build aggregation pipeline for filtering
    const pipeline = [
      {
        $match: match,
      },
    ];
    const results = await ZEnergyStation.aggregate(pipeline);
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
}
export default searchQuery;

//____ SERCH INPUT - SEARCH ADDRESS, OR STATION NAME ____

//_____ FILTERS - FUELS & SERVICES _____

//____ NOTE: THE FILTER DROPDOWN HAS BEEN BUILT WITH filterData.js, serviceIcons.js and serviceLabels.js _______
