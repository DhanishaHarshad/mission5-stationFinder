import React from "react";
import styles from "./Directions.module.css";

export default function Directions({ selectedStation }) {
  return (
    <div className={styles.directionsWrapper}>
      {/* nav bar */}
      <nav> {/* TODO: add navbar link here*/} </nav>

      {/* Main Content */}
      <main className={styles.directionsBody}>
        {/* conditional render / onclick - not hardcoded */}
        <div className={styles.directionsStationNameWrapper}>
          <h1 className={styles.directionsStationName}>
            {selectedStation?.name || "Selected Station"}
          </h1>
        </div>
        {/* -------- LEFT SECTION -------- */}
        <div className={styles.directionsSectionWrapper}>
          <section className={styles.directionsLeftSection}>
            left section
            <div className={styles.directionsSearchWrapper}>
              <input
                type="text"
                placeholder="Search"
                className={styles.directionsSearchInput}
                required
              />
              <input
                type="text"
                placeholder="Station Address"
                className={styles.directionsSearchInput}
                required
              />
            </div>
            {/* TODO: check with Rachel if her station card is reusable */}
            {/* station card */}
            <div className={styles.directionsStationCard}>
              <div className={styles.directionsStationFuel}>fuel</div>
              <div className={styles.directionsStationHours}>hours</div>
              <div className={styles.directionsStationServices}>service</div>
            </div>
          </section>
          {/* -------- RIGHT SECTION -------- */}
          <section className={styles.directionsRightSection}>
            right section - map
          </section>
        </div>
      </main>

      {/* -------- CTA -------- */}
      <aside className={styles.directionsCTAWrapper}>
        {/* TODO: Add CTA links*/}
      </aside>

      {/* -------- FOOTER -------- */}
      <footer className={styles.directionsFooter}>
        {/* TODO: Add footer links */}
      </footer>
    </div>
  );
}
