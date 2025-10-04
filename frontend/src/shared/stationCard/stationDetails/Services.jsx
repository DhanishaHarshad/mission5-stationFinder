import styles from "./styles/Services.module.css";
import { serviceIcon } from "../../../utils/serviceIcons.js"; 

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
          const icon = serviceIcon[service.type];
          return (
            <div key={service.id} className={styles.serviceItem}>
              <span className={styles.serviceName}>
                {icon && <img src={icon} alt={service.name} />}
                {service.name}
              </span>
            </div>
          );
        })}
      </section>
    </main>
  );
}
