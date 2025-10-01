import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useRef, useCallback, useState, useEffect } from "react";

const containerStyle = { width: "44rem", height: "53.5rem" };
const mapDisplayOptions = {
  disableDefaultUI: true, // disables= all UI controls
  clickableIcons: false, // disable POI
  mapId: import.meta.env.VITE_GOOGLE_MAP_ID_KEY, // custom map styling
};

const defaultCenter = {
  lat: -36.860756,
  lng: 174.77781, // AKL coords
};

export default function Map({ userLocation, stationLocation }) {
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    setIsMapReady(true); // drop marker
  }, []);

  // Utility to validate coordinates
  const isValidCoords = (location) =>
    location &&
    typeof location.lat === "number" &&
    typeof location.lng === "number";

  // Drop a marker at a given location with optional title
  const dropMarker = async ({ lat, lng }, title = "") => {
    if (!mapRef.current) {
      console.warn("❌ Map is not ready.");
      return;
    }

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    new AdvancedMarkerElement({
      map: mapRef.current,
      position: { lat, lng },
      title,
    });
  };

  //user location marker
  useEffect(() => {
    if (!isMapReady || !isValidCoords(userLocation)) {
      console.warn("❌ Invalid user location or map not ready:", userLocation);
      return;
    }

    const { lat, lng } = userLocation;
    mapRef.current.panTo({ lat, lng });
    dropMarker({ lat, lng });
  }, [userLocation, isMapReady]);

  // Drop station marker
  useEffect(() => {
    if (!isMapReady || !isValidCoords(stationLocation)) return;

    const { lat, lng } = stationLocation;
    dropMarker({ lat, lng }, "Station");
  }, [stationLocation, isMapReady]);

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        {/* Google Map Box */}
        <GoogleMap
          center={defaultCenter}
          zoom={12}
          mapContainerStyle={containerStyle}
          options={mapDisplayOptions}
          onLoad={onLoad}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}
