import styles from "./FindStation.module.css";
import StationCard from "../../shared/stationCard/StationCard";

import Header from "../../shared/header/Header";
import { useStationResults } from "../../hooks/UseStationResults";
import { formatStation } from "../../utils/formatStation";
import Map from "../../shared/map/Map"

import Filter from "../../shared/filter/Filter";


export default function FindStation() {
  const { stations } = useStationResults();
  const formattedStations = stations.map(formatStation)
  
  return (
    <main className={styles.findStationPage}>
      <header className={styles.header}>
        <Header />
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
            <Filter />
          </form>
          <p className={styles.stationCount}> {stations.length} Stations Found</p>
          <section className={styles.stationCards}>
            {formattedStations.map(station => (
              <StationCard key={station.id} station={station}/>
            ))}
          </section>
        </section>
        <section className={styles.mapContainer}>
          <Map/>
        </section>
      </section>
    </main>
  );
}
