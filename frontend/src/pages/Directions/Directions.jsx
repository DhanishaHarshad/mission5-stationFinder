import React from "react";
import styles from "./Directions.module.css";
import Map from "../../shared/map/Map";
import backIconButton from "/assets/icons/misc/BackDefault.png";
import plusIconButton from "/assets/icons/misc/AddDefault.png";

export default function Directions({ selectedStation }) {
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
                  <button className={styles.directionsBackIconButton}>
                    <img
                      src={backIconButton}
                      alt="back-icon"
                      className={styles.directionsIconImg}
                    />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.directionsSearchInput}
                  required
                />
              </div>

              {/* "plus" icon + station address */}
              <div className={styles.directionsInputRow}>
                <input
                  type="text"
                  placeholder="Station Address"
                  className={styles.directionsSearchInput}
                  required
                />
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
              station card here
            </div>
          </section>
          {/* ---------------------------------------------- */}
          {/*                RIGHT SECTION                   */}
          {/* ---------------------------------------------- */}
          <section className={styles.directionsRightSection}>
            <Map />
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
