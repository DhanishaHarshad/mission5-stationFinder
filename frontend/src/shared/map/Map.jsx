import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useRef, useCallback } from "react";

const containerStyle = { width: "44rem", height: "53.5rem" };
const mapDisplayOptions = {
  disableDefaultUI: true, // disables= all UI controls
  clickableIcons: false, // disable POI
};

const defaultCenter = {
  lat: -36.860756,
  lng: 174.77781, // AKL coords
};

export default function Map({ userLocation }) {
  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Trigger pan and marker drop when userLocation updates
  React.useEffect(() => {
    // Async function to pan map and drop marker when userLocation updates
    const dropMarker = async () => {
      // Ensure location is available and map is initialized
      if (userLocation && mapRef.current) {
        const { latitude, longitude } = userLocation;
        // Center the map on user's current location
        mapRef.current.panTo({ lat: latitude, lng: longitude });

        // Dynamically import the new marker library (AdvancedMarkerElement)
        const { AdvancedMarkerElement } = await google.maps.importLibrary(
          "marker"
        );

        new AdvancedMarkerElement({
          map: mapRef.current,
          position: { lat: latitude, lng: longitude },
          title: "You are here",
        });
      }
    };

    // Trigger marker drop when userLocation changes
    dropMarker();
  }, [userLocation]);

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
