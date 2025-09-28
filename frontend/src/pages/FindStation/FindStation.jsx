import styles from "./FindStation.module.css";
import StationCard from "../../shared/stationCard/StationCard";
export default function FindStation() {
  return (
    <main className={styles.findStationPage}>
      <header>
        <h1>Header</h1>
      </header>
      <div className={styles.pageName}>
        <h3>Find Station</h3>
      </div>
      <section className={styles.content}>
        <section className={styles.stationContainer}>
          <form className={styles.searchBar}>
            <label>Search Placeholder</label>
            <input type="text" placeholder="search location" />
            <img
              src="/assets/filters/D-FilterDefault.png"
              alt="filter button"
            />
          </form>
          <section className={styles.stationCards}>
            <StationCard />
          </section>
        </section>
        <section className={styles.mapContainer}>
          <h3>MAP</h3>
        </section>
      </section>
    </main>
  );
}
