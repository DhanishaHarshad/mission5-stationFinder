import styles from "./styles/Fuels.module.css";
import { formatLastUpdated } from "../../../utils/formatLastUpdated";

export default function Fuels({ fuelPrices }) {
  const fuelIcons = {
    "91": "/assets/icons/fuel/FuelGreen.png",
    "95": "/assets/icons/fuel/FuelRed.png",
    "diesel": "/assets/icons/fuel/FuelBlack.png",
  };
  const lastUpdatedTimestamp =
    fuelPrices.length > 0 ? fuelPrices[0].lastUpdated : null;

  const lastUpdatedText = formatLastUpdated(lastUpdatedTimestamp);

  return (
    <main className={styles.fuelsContainer}>
      <div className={styles.fuelGroup}>
        {fuelPrices.map((fuel) => {
          const fuelType = fuel.type;
          const fuelIcon = fuelIcons[fuelType];
          const fuelName = fuelType === "diesel" ? "Diesel" : fuelType;
          const formattedPrice = `$${
            fuel.price ? fuel.price.toFixed(2) : "--"
          }`;

          return (
            <section className={styles.fuelSection} key={fuel.type}>
              <img src={ fuelIcon } alt={`${ fuelType } fuel icon`}></img>
              <p>{` ${ fuelName } `}</p>
              <h6>{ formattedPrice }</h6>
            </section>
          );
        })}
      </div>
      <p className={styles.lastUpdated}>
        Last Updated { lastUpdatedText }
      </p>
    </main>
  );
}
