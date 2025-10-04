import React from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router";
import Markers from "./Markers";

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

export default function Map({
  userLocation,
  stationLocation,
  directions,
  stationMarkers = [],
}) {
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  /*_____ ADDED USE LOCATION  ___________
  --- This is used to detect the current route to conditionally render 
  map markers, update the zoom level, change container size in /find-station  ---
*/
  const location = useLocation();
  const currentPath = location.pathname;
  //______________________________________________________________

  //_______________ MAP CONTAINER STYLE __________________________
  //  --- Set container style for /find-station and /directions ---
  const containerStyle =
    currentPath === "/find-station"
      ? { width: "100%", height: "100%" }
      : { width: "44rem", height: "53.5rem" };
  //______________________________________________________________

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
    console.log("Validating coords:", stationLocation);
    console.log("Result:", isValidCoords(stationLocation));

    if (!isMapReady || !isValidCoords(stationLocation)) return;

    const { lat, lng } = stationLocation;
    console.log(
      "📍is the stationLocation in the room with us?:",
      stationLocation
    );

    dropMarker({ lat, lng }, "Station");
  }, [stationLocation, isMapReady]);

  // stop direction from going into rendering loop by storing in useRef
  const directionsRef = useRef(null);

  useEffect(() => {
    if (directions && !directionsRef.current) {
      directionsRef.current = directions;
    }
  }, [directions]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          center={defaultCenter}
          //_____ MAP ZOOM  ___________________________________
          //--- Update the zoom level based on the route ---
          zoom={currentPath === "/find-station" ? 5.2 : 12}
          //___________________________________________________

          mapContainerStyle={containerStyle}
          options={mapDisplayOptions}
          onLoad={(map) => {
            mapRef.current = map;
            setIsMapReady(true);
          }}
        >
          {directionsRef.current && (
            <DirectionsRenderer
              directions={directionsRef.current}
              options={{ suppressMarkers: true }}
            />
          )}

          {/* {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{ suppressMarkers: true }}
            />
          )} */}
          {/*_______________ FIND STATION MAP MARKERS ________________________
    
          --- Render station marker only inside the /find-station map instance ---
    */}
          {isMapReady && currentPath === "/find-station" && (
            <Markers map={mapRef.current} stations={stationMarkers} />
          )}
          {/* ________________________________________________________________ */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
