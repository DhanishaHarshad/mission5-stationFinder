import { useState } from "react";
import styles from "./styles/OperatingHours.module.css";

export default function OperatingHours({ operatingHours }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className={styles.operatingHoursContainer}>
      <h4 
        className={styles.dropdownHeader} 
        onClick={() => setIsOpen(!isOpen)}
      >
        Open Hours 
        <img 
          src="/assets/icons/misc/DropdownOpenDefault.png" 
          alt="dropdown-icon" 
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
        />
      </h4>
      <ul 
        className={`${styles.hoursList} ${isOpen ? styles.open : ""}`}
      >
        {operatingHours.map(({ day, hours }) => (
          <li key={day} className={styles.hoursItem}>
            <span className={styles.day}>{day}</span>
            <span className={styles.time}>{hours}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
