import React from "react";
import styles from "./Banner.module.css";

function Banner() {
  return (
    <div>
      <div className={styles.heroBannerDiv}>
        <img
          src="/assets/images/HeroBanner.png"
          alt="Hero Banner"
          className={styles.heroBanner}
        />
      </div>
    </div>
  );
}

export default Banner;
