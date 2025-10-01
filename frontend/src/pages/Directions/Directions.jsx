import React, { useState, useEffect } from "react";
import styles from "./Directions.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function Directions({ userLocation, selectedStation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [stationAddress, setStationAddress] = useState("");
  const [localUserLocation, setLocalUserLocation] = useState(null); // initialy map component owns userLocation and pass in a prop but have refactored it and Direction component is the parent
  const { station } = useStationResults();
  const [directions, setDirections] = useState(null); // show route on map

  // Get user location via browser
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocalUserLocation({ lat: coords.latitude, lng: coords.longitude });
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
      console.log("📍show me your location:", data);
      return data;
    } catch (err) {
      console.error(
        "🥲 Unable to locate you. Geocoding error:",
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
        const userEnteredLocation = await geocodeAddress(query);
        console.log("📍is this where you located:", userEnteredLocation);

        const coords = userEnteredLocation?.location;

        if (
          coords &&
          typeof coords.lat === "number" &&
          typeof coords.lng === "number" &&
          isFinite(coords.lat) &&
          isFinite(coords.lng)
        ) {
          setLocalUserLocation(coords);
        } else {
          console.warn("🤔 Invalid geocode result:", coords);
        }
      } catch (err) {
        console.error("❌ Geocode lookup failed:", err.message);
      }
    }
  };

  // Trigger draw route on map when both points are ready
  useEffect(() => {
    const isValidCoords = (location) =>
      location &&
      typeof location.lat === "number" &&
      typeof location.lng === "number";

    if (
      !isValidCoords(localUserLocation) ||
      !isValidCoords(selectedStation?.location)
    )
      return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: localUserLocation,
        destination: selectedStation.location,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("❌ Directions request failed:", result);
        }
      }
    );
  }, [localUserLocation, selectedStation]);

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
              userLocation={localUserLocation}
              stationLocation={selectedStation?.location}
              directions={directions}
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
