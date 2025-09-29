import React, { useState, useEffect } from "react";
import styles from "./Directions.module.css";
import Map from "../../shared/map/Map";
import backIconButton from "/assets/icons/misc/BackDefault.png";
import plusIconButton from "/assets/icons/misc/AddDefault.png";
import myLocationIcon from "/assets/icons/map/MyLocationDefault.png";
import searchLocationIcon from "/assets/icons/map/SearchLocationDefault.png";

export default function Directions({ selectedStation, userLocation }) {
  const [location, setLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stationAddress, setStationAddress] = useState("");

  // Get user location via browser
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setUserLocation({ lat: coords.latitude, lng: coords.longitude });
        },
        (error) => console.error("Geolocation error:", error.message)
      );
    }
  };

  // Normalize input
  const normalizeInput = (input) => input.trim().toLowerCase();

  // Trigger search on Enter
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const query = normalizeInput(searchQuery);
      if (query) {
        // TODO: geocode query and update userLocation
      }
    }
  };

  // Trigger directions when both points are ready
  useEffect(() => {
    if (userLocation && selectedStation?.location) {
      // TODO: call Google Maps Directions API
    }
  }, [userLocation, selectedStation]);

  return (
    <div className={styles.directionsWrapper}>
      {/* ---------------------------------------------- */}
      {/*                    NAV BAR                     */}
      {/* ---------------------------------------------- */}
      <nav> {/* TODO: add navbar link here*/} </nav>

      {/* ---------------------------------------------- */}
      {/*                      BODY                      */}
      {/* ---------------------------------------------- */}
      <main className={styles.directionsBody}>
        <div className={styles.directionsStationNameWrapper}>
          <h1 className={styles.directionsStationName}>
            {selectedStation?.name || "Selected Station"}
          </h1>
        </div>
        {/* ---------------------------------------------- */}
        {/*                 LEFT SECTION                   */}
        {/* ---------------------------------------------- */}
        <div className={styles.directionsSectionWrapper}>
          <section className={styles.directionsLeftSection}>
            <div className={styles.directionsSearchWrapper}>
              {/* "back" icon and search bar */}
              <div className={styles.directionsInputRow}>
                <div className={styles.directionsBackIconWrapper}>
                  {/* link to find station page */}
                  <a href="/find-station">
                    <button className={styles.directionsBackIconButton}>
                      <img
                        src={backIconButton}
                        alt="back-icon"
                        className={styles.directionsIconImg}
                      />
                    </button>
                  </a>
                </div>

                <input
                  type="text"
                  placeholder="Search"
                  className={styles.directionsSearchInput}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
                <button className={styles.directionsLocationIcon}>
                  <img src={myLocationIcon} alt="location-icon" />
                </button>
              </div>

              {/* "plus" icon + station address */}
              <div className={styles.directionsInputRow}>
                <input
                  type="text"
                  placeholder="Station Address"
                  className={styles.directionsSearchInput}
                  onChange={(event) => setStationAddress(event.target.value)}
                  value={selectedStation?.address || ""}
                />
                <button className={styles.directionsLocationIcon}>
                  <img src={searchLocationIcon} alt="locate-station-icon" />
                </button>
                <button className={styles.directionsPlusIconButton}>
                  <img
                    src={plusIconButton}
                    alt="plus-icon"
                    className={styles.directionsIconImg}
                  />
                </button>
              </div>
            </div>
            {/* TODO: import station cards here */}
            {/* station card */}
            <div className={styles.directionsStationCard}>
              {" "}
              <h3 className={styles.directionsStationCardHeaders}>Fuel</h3>
              <h3 className={styles.directionsStationCardHeaders}>Hours</h3>
              <h3 className={styles.directionsStationCardHeaders}>Services</h3>
            </div>
          </section>
          {/* ---------------------------------------------- */}
          {/*                RIGHT SECTION                   */}
          {/* ---------------------------------------------- */}
          <section className={styles.directionsRightSection}>
            <Map
              userLocation={location}
              stationLocation={selectedStation?.location}
            />
          </section>
        </div>
      </main>

      {/* ---------------------------------------------- */}
      {/*                      CTA                       */}
      {/* ---------------------------------------------- */}
      <aside className={styles.directionsCTAWrapper}>
        {/* TODO: Add CTA links*/}
      </aside>

      {/* ---------------------------------------------- */}
      {/*                     FOOTER                     */}
      {/* ---------------------------------------------- */}
      <footer className={styles.directionsFooter}>
        {/* TODO: Add footer links */}
      </footer>
    </div>
  );
}

// pseudo for enable location onclick:
// 1. when user clicked enable location
// 2. trigger user to enable location
// 3.
