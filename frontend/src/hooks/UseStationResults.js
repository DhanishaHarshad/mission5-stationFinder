import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_STATION_API

//_______ FOR SEARCH: UPDATE THE HOOK TO ACCEPT searchQuery & selectedFilters AS ARGUMENTS _____

export const useStationResults = () => {

  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  //___ FOR SEARCH: BUILD THE QUERY STRING FROM searchQuery & selectedFilters INSIDE USEEFFECT
  useEffect(() => {
    const getStations = async () => {
      try {
        const response = await fetch(apiUrl)
        if(!response.ok) throw new error(`Failed to fetch stations: ${response.status} ${response.statusText}`)

        const data = await response.json()
        setStations(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    getStations()
  }, [apiUrl])

  //___ FOR SEARCH: RETURN THE HOOK DATA ____

  return { stations, loading, error }
}
