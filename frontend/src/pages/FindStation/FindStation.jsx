import styles from "./FindStation.module.css";
import StationCard from "../../shared/stationCard/StationCard";
import Header from "../../shared/header/Header";
import Footer from "../../shared/footer/Footer"
import FilterDropdown from "../../shared/filter/FilterDropdown";
import Map from "../../shared/map/Map";
import { useState, useEffect, useRef } from "react";
import { useStationResults } from "../../hooks/UseStationResults";
import { formatStation } from "../../utils/formatStation";

export default function FindStation() {
  const [mapCenter, setMapCenter] = useState(null);
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
      {/* ___________ HEADER _______________ */}
      <header className={styles.header}>
        <Header />
      </header>
          {/* ___________ PAGE TITLE _______________ */}
      
      <div className={styles.pageName}>
        <h3>Find Station</h3>
      </div>
          {/* ___________ BODY _______________ */}
      
      <section className={styles.content}>
        <section className={styles.stationContainer}>

          {/* ___________ SEACRCH BAR _______________ */}
          <form className={styles.searchBar} onSubmit={(e) => {e.preventDefault()}}>
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

          {/* _________ FILTER DROPDOWN LIST _____________________ */}
          {showDropdown && (
            <div className={styles.dropdownContainer} ref={dropdownRef}>
              <FilterDropdown />
            </div>
          )}

          {/* ___________ STATION RESULT COUNTER _______________ */}          
          <p className={styles.stationCount}>
            {" "}
            {formattedStations.length} Stations Found
          </p>

          {/* ___________ STATION CARDS _______________ */}
          <section className={styles.stationCards}>
            {formattedStations.map((station) => (
              <StationCard key={station.id} station={station} />
            ))}
          </section>
        </section>
          {/* ___________ MAP _______________ */}
        <section className={styles.mapContainer}>
          <Map
            stationLocation={mapCenter} 
            stationMarkers={formattedStations}
          />
        </section>       
      </section>
      <Footer/>
    </main>
  );
}
