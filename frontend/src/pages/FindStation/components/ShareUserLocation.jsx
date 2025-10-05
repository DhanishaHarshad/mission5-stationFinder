import React, { useState, useEffect } from "react";

// function LocationDisplay() {
//   const [city, setCity] = useState(null);
//   const [error, setError] = useState(null);
// }

// function GetLocation() {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;

//       // Do something with the latitude and longitude in your React component's state
//       console.log(latitude, longitude);
//     },
//     (error) => {
//       console.error("Error getting location:", error);
//       // Handle error (e.g., user denied permission, location unavailable)
//     },
//     { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//   );
// }

function ShareUserLocation() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
    });
  }, []);

  return <div>{/* <button onClick={GetLocation}>Get Location</button> */}</div>;
}

export default ShareUserLocation;
