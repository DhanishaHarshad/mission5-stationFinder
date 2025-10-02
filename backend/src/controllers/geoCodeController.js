// Dummy geocode controller — replace with real geocoding service later

export const geocodeAddress = async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    // For now, fake coordinates (replace with Google Maps, Mapbox, etc.)
    const fakeCoords = {
      latitude: -41.2865,
      longitude: 174.7762,
    };

    console.log("Geocoding address:", address);
    res.json(fakeCoords);
  } catch (err) {
    console.error("Geocode error:", err);
    res.status(500).json({ error: err.message });
  }
};
