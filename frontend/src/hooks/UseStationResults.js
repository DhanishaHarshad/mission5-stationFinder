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
        if(!response.ok) throw new error("Failed to fetch stations")

        const data = response.json()
        setStations(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    getStations()
  }, [])

  return { stations, loading, error }
}
