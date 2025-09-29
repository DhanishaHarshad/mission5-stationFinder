import styles from "./styles/Services.module.css"
import { useStationResults } from "../../../hooks/UseStationResults.js"

export default function Services() {
  const { stations, loading, error } = useStationResults()

  if(loading) return <p>Loading stations...</p>
  if(error) return <p>Error loading stations...</p>  

  return (
    <main className={styles.servicesContainer}>
      <h4>Services Available</h4>
      <section className={styles.servicesAvailable}>
        
      </section>
    </main>
  )
}
