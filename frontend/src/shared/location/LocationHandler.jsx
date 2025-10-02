import React, { useState, useEffect } from "react";
import AddressSearch from "./AddressSearch";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

function LocationHandler({ onLocationResolved }) {
  const [useManualAddress, setUseManualAddress] = useState(false);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!useManualAddress) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ latitude, longitude });
          //send to backend
          fetch(`{API_BASE}/api/location`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });
          if (onLocationResolved) {
            onLocationResolved({ latitude, longitude });
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setUseManualAddress(true);
        }
      );
    }
  }, [useManualAddress, onLocationResolved]);

  const handleAddressSubmit = async (address) => {
    const res = await fetch(`${API_BASE}/geocode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });
    const data = await res.json();
    console.log("Geocoded coords:", data);
    setCoords(data);
    onLocationResolved(data);
  };

  return (
    <div>
      {coords ? (
        <p>
          Using location: {coords.latitude}, {coords.longitude}
        </p>
      ) : useManualAddress ? (
        <AddressSearch onSubmit={handleAddressSubmit} />
      ) : (
        <p> Requesting you location...</p>
      )}
    </div>
  );
}

export default LocationHandler;
