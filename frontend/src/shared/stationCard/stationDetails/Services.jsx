import styles from "./styles/Services.module.css";
import { formatServices } from "../../../utils/serviceIcons.js";

export default function Services({ services }) {

  if (!services || services.length === 0) {
    return (
      <main className={styles.servicesContainer}>
        <h4>Services Available</h4>
        <p>No services available.</p>
      </main>
    );
  }

  return (
    <main className={styles.servicesContainer}>
      <h4>Services Available</h4>
      <section className={styles.servicesAvailable}>
        {services.map((service) => {
          const match = formatServices.find(
            (f) => f.service_type === service.type
          );
          
          const serviceName = service.name; 
          
          return (
            <div key={service.id} className={styles.serviceItem}> 
              {match ? (
                <span className={styles.serviceName}>
                  <img src={match.icon} alt={serviceName} />
                  {serviceName}
                </span>
              ) : (
                <span>{serviceName}</span>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
