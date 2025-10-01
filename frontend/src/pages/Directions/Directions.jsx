import React, { useState, useEffect } from "react";
import styles from "./Directions.module.css";
import axios from "axios";

// import icons
import backIconButton from "/assets/icons/misc/BackDefault.png";
import plusIconButton from "/assets/icons/misc/AddDefault.png";
import myLocationIcon from "/assets/icons/map/MyLocationDefault.png";
import searchLocationIcon from "/assets/icons/map/SearchLocationDefault.png";

// imports for shared components
import Header from "../../shared/header/Header";
import ShareTank from "../../shared/shareTank/shareTank";
import Footer from "../../shared/footer/Footer";

//imports for station card and map
import Map from "../../shared/map/Map";
import Fuels from "../../shared/stationCard/stationDetails/Fuels";
import OperatingHours from "../../shared/stationCard/stationDetails/OperatingHours";
import Services from "../../shared/stationCard/stationDetails/Services";
import { useStationResults } from "../../hooks/UseStationResults";

export default function Directions({ selectedStation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [stationAddress, setStationAddress] = useState("");
  const [userLocation, setUserLocation] = useState(null); // initialy map component owns userLocation and pass in a prop but have refactored it and Direction component is the parent
  const { station } = useStationResults();
  console.log("🧪 station:", station);

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

  // normalize input
  const normalizeInput = (input) => input.trim().toLowerCase();

  // sends geocode to the backend
  const geocodeAddress = async (address) => {
    const normalized = normalizeInput(address);
    const url = `http://localhost:4000/geocode?address=${encodeURIComponent(
      normalized
    )}`;

    try {
      const { data } = await axios.get(url);
      console.log("📦 Raw geocode response:", data);
      return data;
    } catch (err) {
      console.error(
        "Geocoding error:",
        err.response?.data?.error || err.message
      );
      return null;
    }
  };

  // Trigger search on "enter"
  const handleSearchKeyDown = async (e) => {
    if (e.key === "Enter") {
      const query = normalizeInput(searchQuery);
      if (!query) return;

      try {
        const raw = await geocodeAddress(query);
        console.log("📦 Raw geocode response:", raw); // ✅ Debug log

        const coords = raw?.location;

        if (
          coords &&
          typeof coords.lat === "number" &&
          typeof coords.lng === "number" &&
          isFinite(coords.lat) &&
          isFinite(coords.lng)
        ) {
          setUserLocation(coords);
        } else {
          console.warn("🤔 Invalid geocode result:", coords);
        }
      } catch (err) {
        console.error("❌ Geocode lookup failed:", err.message);
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
      <Header />

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
                <button
                  className={styles.directionsLocationIcon}
                  onClick={handleLocationClick}
                >
                  <img src={myLocationIcon} alt="location-icon" />
                </button>
              </div>

              {/* "plus" icon + station address */}
              <div className={styles.directionsInputRow}>
                <input
                  type="text"
                  placeholder="Station Address"
                  className={styles.directionsSearchInput}
                  value={selectedStation?.address || ""}
                  readOnly
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

            {/* ---------------------------------------------- */}
            {/*                 STATION CARD                   */}
            {/* ---------------------------------------------- */}
            {/* conditional render station info */}
            {station ? (
              <div className={styles.directionsStationCardWrapper}>
                <div className={styles.directionsSationCardInfo}>
                  <h3 className={styles.directionsStationCardHeaders}>Fuel</h3>
                  <Fuels fuelPrices={station.fuelPrices} />
                </div>
                <div className={styles.directionsSationCardInfo}>
                  <h3 className={styles.directionsStationCardHeaders}>Hours</h3>
                  <OperatingHours hours={station.operatingHours} />
                </div>
                <div className={styles.directionsSationCardInfo}>
                  <h3 className={styles.directionsStationCardHeaders}>
                    Services
                  </h3>
                  <Services services={station.services} />
                </div>
              </div>
            ) : (
              <div>
                <p>no station selected</p>
              </div>
            )}
          </section>
          {/* ---------------------------------------------- */}
          {/*                RIGHT SECTION                   */}
          {/* ---------------------------------------------- */}
          <section className={styles.directionsRightSection}>
            <Map
              userLocation={userLocation}
              stationLocation={selectedStation?.location}
            />
          </section>
        </div>
      </main>

      {/* ---------------------------------------------- */}
      {/*                      CTA                       */}
      {/* ---------------------------------------------- */}
      <aside>
        <ShareTank />
      </aside>
      {/* ---------------------------------------------- */}
      {/*                     FOOTER                     */}
      {/* ---------------------------------------------- */}
      <footer className={styles.directionsFooter}>
        <Footer />
      </footer>
    </div>
  );
}
