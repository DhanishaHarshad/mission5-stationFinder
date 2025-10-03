import styles from "./StationCard.module.css"
import StationTitle from "./stationDetails/StationTitle"
import OperatingHours from "./stationDetails/OperatingHours"
import Fuels from "./stationDetails/Fuels"
import Services from "./stationDetails/Services"
import GetDirections from "./stationDetails/GetDirections"

export default function StationCard({ station }) {
 
  return (
    <main className={styles.stationCardContainer}>
      <StationTitle 
        name={station.name}
        address={station.address}
      />
      <OperatingHours
        operatingHours={station.openingHours}
      />
      <Fuels
        fuelPrices={station.fuelPrices}
      />
      <Services
        services={station.services}
      />
      <GetDirections/>
    </main>
  )
}
