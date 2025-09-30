import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useRef, useCallback, useState, useEffect } from "react";

const containerStyle = { width: "44rem", height: "53.5rem" };
const mapDisplayOptions = {
  disableDefaultUI: true, // disables= all UI controls
  clickableIcons: false, // disable POI
  mapId: "30ace7b739a80248fc4b21a4",
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

  // Trigger pan and marker drop when userLocation updates
  useEffect(() => {
    const dropMarker = async () => {
      if (
        !userLocation ||
        typeof userLocation.lat !== "number" ||
        typeof userLocation.lng !== "number" ||
        !mapRef.current
      ) {
        console.warn("Invalid userLocation or map not ready:", userLocation);
        return;
      }

      const { lat, lng } = userLocation;

      mapRef.current.panTo({ lat, lng });

      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );

      new AdvancedMarkerElement({
        map: mapRef.current,
        position: { lat, lng },
        title: "You are here",
      });
    };

    if (isMapReady && userLocation) {
      dropMarker();
    }
  }, [userLocation, isMapReady]);

  useEffect(() => {
    const dropStationMarker = async () => {
      if (
        !stationLocation ||
        typeof stationLocation.lat !== "number" ||
        typeof stationLocation.lng !== "number" ||
        !mapRef.current
      )
        return;

      const { lat, lng } = stationLocation;

      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );

      new AdvancedMarkerElement({
        map: mapRef.current,
        position: { lat, lng },
        title: "Station",
      });
    };

    if (isMapReady && stationLocation) {
      dropStationMarker();
    }
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
