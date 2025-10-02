import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useRef, useCallback, useState, useEffect } from "react";
import { useLocation } from "react-router";
import Markers from "./Markers";


const mapDisplayOptions = {
  disableDefaultUI: true, // disables= all UI controls
  clickableIcons: false, // disable POI
  mapId: import.meta.env.VITE_GOOGLE_MAP_ID_KEY, // custom map styling
};

const defaultCenter = {
  lat: -36.860756,
  lng: 174.77781, // AKL coords
};

export default function Map({
  userLocation,
  stationLocation,
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

  // Trigger pan and marker drop when userLocation updates
  useEffect(() => {
    const dropMarker = async () => {
      // validate user location and contain numeric coords
      if (
        !userLocation ||
        typeof userLocation.lat !== "number" ||
        typeof userLocation.lng !== "number" ||
        !mapRef.current
      ) {
        console.log(
          "❌ hey! Invalid user's location OR map is not ready:",
          userLocation
        );
        return;
      }

      const { lat, lng } = userLocation;

      // pan the map to user's location
      mapRef.current.panTo({ lat, lng });
      // import advanced marker (formally marker) from google map library
      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );

      new AdvancedMarkerElement({
        map: mapRef.current,
        position: { lat, lng },
        // title: "You are here",
      });
    };
    // drop marker when both user location and map is ready
    if (isMapReady && userLocation) {
      dropMarker();
    }
  }, [userLocation, isMapReady]);

  // TODO: refactor this userEffect as it similar to drop marker
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
    <div style={{ width: "100%", height: "100%"}}>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        {/* Google Map Box */}
        <GoogleMap
          center={defaultCenter}

        //_____ MAP ZOOM  ___________________________________
        //--- Update the zoom level based on the route ---
          zoom={currentPath === "/find-station" ? 5.2 : 12}
        //___________________________________________________

          mapContainerStyle={containerStyle}
          options={mapDisplayOptions}
          onLoad={onLoad}
        >
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
