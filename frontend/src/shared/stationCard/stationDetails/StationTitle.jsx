import styles from "./styles/StationTitle.module.css"

export default function StationTitle({ name, address }) {
  return (
    <main className={styles.stationTitle}>
      <h3>{ name }</h3>
      <p>{ address }</p>
    </main>
  )
}
