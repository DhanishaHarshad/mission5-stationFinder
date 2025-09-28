import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_STATION_API


export const useStationResults = () => {

  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return { stations, loading, error }
}
