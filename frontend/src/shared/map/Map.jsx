import React from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useCallback, useState, useEffect } from "react";

const containerStyle = { width: "44rem", height: "53.5rem" };
const mapDisplayOptions = {
  disableDefaultUI: true, // disables= all UI controls
  clickableIcons: false, // disable POI
  scrollwheel: true, // mouse wheel zoom
  gestureHandling: "auto", // pinch/drag/scroll
  mapId: import.meta.env.VITE_GOOGLE_MAP_ID_KEY, // custom map styling
};

const defaultCenter = {
  lat: -36.860756,
  lng: 174.77781, // AKL coords
};

export default function Map({ userLocation, stationLocation, directions }) {
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
      console.log("❌ Map is not ready.");
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
    if (!isMapReady) return;

    if (!isValidCoords(userLocation)) {
      console.log("user location received:", userLocation);

      if (userLocation !== null) {
        console.log("❌ Invalid user location:", userLocation);
      }
      return;
    }

    const { lat, lng } = userLocation;
    mapRef.current.panTo({ lat, lng });
    dropMarker({ lat, lng });
    // console.log({ lat, lng }); comment out for privacy reason
  }, [userLocation, isMapReady]);

  // Drop station marker
  useEffect(() => {
    if (!isMapReady || !isValidCoords(stationLocation)) return;

    const { lat, lng } = stationLocation;
    console.log(
      "📍is the stationLocation in the room with us?:",
      stationLocation
    );

    dropMarker({ lat, lng }, "Station");
  }, [stationLocation, isMapReady]);

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          center={defaultCenter}
          zoom={10}
          mapContainerStyle={containerStyle}
          options={mapDisplayOptions}
          onLoad={(map) => {
            mapRef.current = map;
            setIsMapReady(true);
          }}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{ suppressMarkers: true }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
