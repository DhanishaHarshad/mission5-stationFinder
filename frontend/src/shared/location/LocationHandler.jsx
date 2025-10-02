import React, { useState, useEffect, useRef } from "react";
import AddressSearch from "./AddressSearch";
import styles from "../../pages/FindStation/FindStation.module.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function LocationHandler({ onLocationResolved }) {
  const [useManualAddress, setUseManualAddress] = useState(false);
  //   const [coords, setCoords] = useState(null);
  const [_loading, setLoading] = useState(true);
  const inputRef = useRef(null);

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

  // Hook up Google Places Autocomplete when manual entry is needed
  useEffect(() => {
    if (!useManualAddress || !window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "nz" },
        fields: ["formatted_address", "geometry"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        onLocationResolved({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    });
  }, [useManualAddress, onLocationResolved]);

  return (
    <div>
      <img
        src="/assets/icons/misc/SearchDefault.png"
        alt=""
        className={styles.searchIcon}
      />

      {useManualAddress && (
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a New Zealand address"
          style={{ width: "100%", padding: "8px" }}
        />
      )}
    </div>
  );
}

export default LocationHandler;
