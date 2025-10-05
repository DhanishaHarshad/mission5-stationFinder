import express from "express";
import axios from "axios";

const router = express.Router();

// converts an address into latitude & longitude
router.get("/", async (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  console.log(latitude, longitude);
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  // ensure an address is provided or throw status code 404
  if (!latitude) {
    return res.status(400).json({ error: "latitude is required" });
  }
  if (!longitude) {
    return res.status(400).json({ error: "longitude is required" });
  }
  // Prepare Google Maps Geocoding API request
  const encodedLatLong = encodeURIComponent(`${latitude},${longitude}`);

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodedLatLong}&key=${apiKey}`;

  try {
    const { data } = await axios.get(url);

    if (data.status === "OK") {
      //   const { lat, lng } = data.results[0].geometry.location;

      // Validate coordinates before returning
      //   if (
      //     typeof lat === "number" &&
      //     typeof lng === "number" &&
      //     isFinite(lat) &&
      //     isFinite(lng)
      //   ) {
      //     res.set("Cache-Control", "no-store"); // prevent cache-ing
      //     res.json({ location: { lat, lng } });
      //   } else {
      //     res.status(500).json({ error: "❌ Invalid coordinates returned" });
      //   }
      res.json(data.results);
    } else {
      res.status(500).json({ error: `📍❌ Geocoding failed: ${data.status}` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: err.response?.data?.error_message || err.message });
  }
});

export default router;
