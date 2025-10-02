import styles from "./FindStation.module.css";
import StationCard from "../../shared/stationCard/StationCard";

import Header from "../../shared/header/Header";
import FilterDropdown from "../../shared/filter/FilterDropdown";
import Map from "../../shared/map/Map";

import { useState, useEffect, useRef } from "react";
import { LoadScript } from "@react-google-maps/api";

import { useStationResults } from "../../hooks/UseStationResults";
import { formatStation } from "../../utils/formatStation";

import Filter from "../../shared/filter/Filter";
import LocationFinder from "../../shared/location/LocationFinder";
import LocationHandler from "../../shared/location/LocationHandler";

export default function FindStation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { stations } = useStationResults();
  const formattedStations = stations.map(formatStation);
  const [userLocation, setUserLocation] = useState(null);

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
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={["places"]} // 👈 this is where you add it
        >
          <section className={styles.stationContainer}>
            <form className={styles.searchBar}>
              {/* <img
                src="/assets/icons/misc/SearchDefault.png"
                alt=""
                className={styles.searchIcon}
              /> */}
              <LocationHandler
                onLocationResolved={setUserLocation}
                // className={styles.searchBar}
              />
            </form>

            {/* <form className={styles.searchBar}> */}
            {/* <LocationHandler onLocationResolved={setUserLocation} /> */}
            {/* <div style={{ width: "100%", height: "100vh" }}> */}

            {/* <Map userLocation={userLocation} stationMarkers={[]} /> */}
            {/* </div> */}

            {/* <input type="text" placeholder="Search location" />
            <img
              src="/assets/filters/D-FilterDefault.png"
              alt="filter button"
              onClick={() => setShowDropdown((prev) => !prev)}
              className={styles.filterBtn}
            /> */}
            {/* </form> */}
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
              userLocation={userLocation}
              stationLocation={null}
              stationMarkers={formattedStations}
            />
          </section>
        </LoadScript>
      </section>
    </main>
  );
}
