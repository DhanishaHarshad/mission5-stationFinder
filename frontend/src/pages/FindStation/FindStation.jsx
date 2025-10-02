import styles from "./FindStation.module.css";
import StationCard from "../../shared/stationCard/StationCard";

import Header from "../../shared/header/Header";
import FilterDropdown from "../../shared/filter/FilterDropdown";
import Map from "../../shared/map/Map";
import { useState, useEffect, useRef } from "react";
import { useStationResults } from "../../hooks/UseStationResults";
import { formatStation } from "../../utils/formatStation";

export default function FindStation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { stations } = useStationResults();
  const formattedStations = stations.map(formatStation);

  useEffect(() => {
    const handleCloseDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleCloseDropdown);
    return () => {
      document.removeEventListener("mousedown", handleCloseDropdown);
    };
  }, []);
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
            <img
              src="/assets/icons/misc/SearchDefault.png"
              alt=""
              className={styles.searchIcon}
            />
            <input type="text" placeholder="Search location" />
            <img
              src="/assets/filters/D-FilterDefault.png"
              alt="filter button"
              onClick={() => setShowDropdown((prev) => !prev)}
              className={styles.filterBtn}
            />
          </form>
          {showDropdown && (
            <div className={styles.dropdownContainer} ref={dropdownRef}>
              <FilterDropdown />
            </div>
          )}
          <p className={styles.stationCount}>
            {" "}
            {stations.length} Stations Found
          </p>
          <section className={styles.stationCards}>
            {formattedStations.map((station) => (
              <StationCard key={station.id} station={station} />
            ))}
          </section>
        </section>
        <section className={styles.mapContainer}>
          <Map
            stationLocation={null} 
            stationMarkers={formattedStations}
          />
        </section>
      </section>
    </main>
  );
}
