import styles from "./StationCard.module.css"
import StationTitle from "./stationDetails/StationTitle"
import OperatingHours from "./stationDetails/OperatingHours"
import Fuels from "./stationDetails/Fuels"
import Services from "./stationDetails/Services"
import GetDirections from "./stationDetails/GetDirections"

export default function StationCard() {
  return (
    <main className={styles.stationCardContainer}>
      <StationTitle />
      {/* ___ CONDITIONALLY render open 24 hours || open now */}
      <p>Operating Hours</p>
      <hr />
      <Fuels/>
      <Services/>
      <GetDirections/>
    </main>
  )
}
