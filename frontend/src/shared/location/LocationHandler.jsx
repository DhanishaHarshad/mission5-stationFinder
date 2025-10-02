import React, { useState, useEffect } from "react";
import AddressSearch from "./AddressSearch";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function LocationHandler({ onLocationResolved }) {
  const [useManualAddress, setUseManualAddress] = useState(false);
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try browser geolocation on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        onLocationResolved({ lat: latitude, lng: longitude });
        setLoading(false);
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setUseManualAddress(true);
        setLoading(false);
      }
    );
  }, [onLocationResolved]);

  // Geocode address using Google Maps API
  const handleAddressSubmit = async (address) => {
    try {
      setLoading(true);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        onLocationResolved({ lat, lng });
      } else {
        alert("Could not find that address. Try again.");
      }
    } catch (err) {
      console.error("Geocoding failed:", err);
      alert("Error looking up that address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && !useManualAddress && <p>Requesting your location…</p>}
      {useManualAddress && <AddressSearch onSubmit={handleAddressSubmit} />}
    </div>
  );
}

export default LocationHandler;
