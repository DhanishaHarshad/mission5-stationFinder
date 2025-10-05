import ZEnergyStation from "../models/ZEnergySchema.js";


async function searchQuery(search = "", services = [], fuelTypes = []) {
  try {
    // build match object dynamically
    //address search uses regex for partial matching and case insensitivity
    const match = {};
    const hasSearchTerm = search && search !== ""
    
    if (hasSearchTerm) {
        const searchRegex = { $regex: search, $options: 'i'}

        match.$or = [
            { address: searchRegex },
            { station_name: searchRegex },
        ]
    }

    // if (region) match.address = { $regex: region, $options: "i" };
    if (services.length > 0) {
      match["services.type"] = { $in: services };
    }
    if (fuelTypes.length > 0) {
      match["fuel_prices.type"] = { $in: fuelTypes };
    }

     const hasCriteria = hasSearchTerm || services.length > 0 || fuelTypes.length > 0

    // build aggregation pipeline for filtering
    const pipeline = [
      {
        $match: match,
      },
    ];

	if (hasCriteria) {
		const results = await ZEnergyStation.aggregate(pipeline)
		return results;
	} else return [];
	} catch (err) {
		throw new Error(err.message);
	}
}
export default searchQuery;




