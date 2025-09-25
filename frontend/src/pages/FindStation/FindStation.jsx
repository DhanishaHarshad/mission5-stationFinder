import styles from "./FindStation.module.css"

export default function FindStation() {
  
  return (
    <div className={styles.findStationPage}>
      <header><h1>Header</h1></header>
      <div className={styles.pageName}>
        <h3>Find Station</h3>
      </div>
      <main className={styles.content}>
        <section className={styles.stationContainer}>
        <form className={styles.searchBar}>
          <label>Search Placeholder</label>
          <input type="text" placeholder="search location"/>
          <img src="/assets/filters/D-FilterDefault.png" alt="filter button" />
        </form>
        <section className={styles.stationCards}>
          <h1>Station Card Container</h1>
        </section>
        </section>
        <section className={styles.mapContainer}>
          <h3>MAP</h3>
        </section>
      </main>
    </div>
  )
}
