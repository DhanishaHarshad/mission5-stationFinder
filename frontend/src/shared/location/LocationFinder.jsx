import React, { useState } from "react";
import axios from "axios";

function LocationFinder() {
  const [location, setLocation] = useState(null);
  const [setError] = useState("");
  const [setMessage] = useState("");

  const handleGetLocation = () => {
    //to clear the prev messages
    setError("");
    setMessage("");
    setLocation(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    //success callback
    const success = async (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      //send the location to the backend!
      try {
        const response = await axios.post("api/location", {
          latitude,
          longitude,
        });
        setMessage(`Location recorded:${response.data.message}`);
      } catch (err) {
        setError(`Failed to send location to the server.`);
        console.error(err);
      }
    };

    errorCallback;
    const errorCallback = (err) => {
      setError(`Error getting location: ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, errorCallback);
  };

  return (
    <div>
      <button onClick={handleGetLocation}>Share my location</button>
      {location && <p>test</p>}
    </div>
  );
}

export default LocationFinder;
