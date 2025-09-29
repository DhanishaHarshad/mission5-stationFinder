import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = { width: "44rem", height: "53.5rem" };
const mapDisplayOptions = {
  disableDefaultUI: true, // disables= all UI controls
  clickableIcons: false, // disable POI
};

const defaultCenter = {
  lat: -36.860756,
  lng: 174.77781, // AKL coords
};

export default function Map() {
  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        {/* Google Map Box */}
        <GoogleMap
          center={defaultCenter}
          zoom={12}
          mapContainerStyle={containerStyle}
          options={mapDisplayOptions}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}
