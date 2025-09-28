import React from "react";
import styles from "./Banner.module.css";

import heroBanner from "../../../../public/assets/images/HeroBanner.png";

function Banner() {
  return (
    <div>
      <div className={styles.heroBannerDiv}>
        <img src={heroBanner} alt="Hero Banner" className={styles.heroBanner} />
      </div>
    </div>
  );
}

export default Banner;
