import { useStationResults } from "../hooks/UseStationResults"
import styles from "./testGetStations.module.css"

export default function testGetStations() {
    const { stations, loading, error } = useStationResults()

    if (error) return <p>Error: {error} </p>
  return (
    <main>
      { stations.map(station => (
        <div 
            key={station._id}
        >
          <h1>{station.station_name} </h1> 
        </div>
      ))}
    </main>
  )
}
