import styles from "./styles/StationTitle.module.css"

export default function StationTitle() {
  return (
    <main className={styles.stationTitle}>
        {/*___ DYNAMICALLY render station name and address from db ___  */}
      <h3>Z Station</h3>
      <p>Address</p>
    </main>
  )
}
