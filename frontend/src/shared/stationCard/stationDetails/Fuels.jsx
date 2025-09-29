import styles from "./styles/Fuels.module.css";
import { useStationResults } from "../../../hooks/UseStationResults";


export default function Fuels() {
  const { stations, loading, error } = useStationResults()
  
    if(loading) return <p>Loading stations...</p>
    if(error) return <p>Error loading stations...</p>

  return (
    <main className={styles.fuelsContainer}>
      <div className={styles.fuelGroup}>
        <section className={styles.fuelSection}>
          <img src="/assets/icons/fuel/FuelGreen.png" alt="fuel-icon" />
          <p>Fuel name</p>
          <h6>$2.50</h6>
        </section>
        <section className={styles.fuelSection}>
          <img src="/assets/icons/fuel/FuelRed.png" alt="fuel-icon" />
          <p>Fuel name</p>
          <h6>$2.50</h6>
        </section>
        <section className={styles.fuelSection}>
          <img src="/assets/icons/fuel/FuelBlack.png" alt="fuel-icon" />
          <p>Fuel name</p>
          <h6>$2.50</h6>
        </section>
      </div>
      <p className={styles.lastUpdated}>Last Updated ... hours ago</p>
    </main>
  );
}
