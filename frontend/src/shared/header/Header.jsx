import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <img
        src="/assets/images/CroppedHeader.png"
        alt="Header Image"
        className="zEnergyNav"
      />
      {/* bottom left navigation */}
      <div className={styles.bottomLeft}>
        <a>At The Station</a>
        <a>Rewards & Promotions</a>
        <a href="/find-station">Find Station</a>
      </div>
      <div className={styles.bottomLeft}></div>
    </div>
  );
}

export default Header;
