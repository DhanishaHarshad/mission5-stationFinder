import { useEffect, useState } from "react";
import { formatStationQuery } from "../utils/formatStationQuery";

//_______ FOR SEARCH: UPDATE THE HOOK TO ACCEPT searchQuery & selectedFilters AS ARGUMENTS _____

export const useStationResults = (
  searchQuery = "",
  services = [],
  fuelType = []
) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //___ FOR SEARCH: BUILD THE QUERY STRING FROM searchQuery & services INSIDE USEEFFECT
  useEffect(() => {
    const getStations = async () => {
      try {
        let apiUrl = import.meta.env.VITE_STATION_API; // to reset the base everytime we search
        let queryParams = formatStationQuery(searchQuery, services, fuelType);
        if (queryParams) {
          apiUrl += `?${queryParams}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok)
          throw new error(
            `Failed to fetch stations: ${response.status} ${response.statusText}`
          );

        const data = await response.json();
        setStations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getStations();
  }, [searchQuery, services, fuelType]);

  //___ FOR SEARCH: RETURN THE HOOK DATA ____

  return { stations, loading, error };
};
