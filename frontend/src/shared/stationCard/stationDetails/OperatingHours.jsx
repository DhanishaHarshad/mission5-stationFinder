import styles from "./styles/OperatingHours.module.css"
import { useStationResults } from "../../../hooks/UseStationResults";

export default function OperatingHours() {
  const { stations, loading, error } = useStationResults()

  if(loading) return <p>Loading stations...</p>
  if(error) return <p>Error loading stations...</p>

  return (
    <main className={styles.operatingHoursContainer}>
      
    </main>
  )
}
