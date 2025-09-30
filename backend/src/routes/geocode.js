import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const address = req.query.address;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  try {
    const { data } = await axios.get(url);

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;

      // ✅ Validate coordinates before returning
      if (
        typeof lat === "number" &&
        typeof lng === "number" &&
        isFinite(lat) &&
        isFinite(lng)
      ) {
        res.set("Cache-Control", "no-store"); // prevent cache-ing
        res.json({ location: { lat, lng } });
      } else {
        res.status(500).json({ error: "Invalid coordinates returned" });
      }
    } else {
      res.status(500).json({ error: `Geocoding failed: ${data.status}` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: err.response?.data?.error_message || err.message });
  }
});

export default router;
