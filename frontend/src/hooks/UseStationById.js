import { useState, useEffect } from "react";

export const useStationById = (stationId) => {
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stationId) return;

    const fetchStation = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_STATION_API}/${stationId}`);
        if (!response.ok) throw new Error("Failed to fetch station");
        const data = await response.json();
        setStation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStation();
  }, [stationId]);

  return { station, loading, error };
};
