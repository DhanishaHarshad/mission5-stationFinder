import React from "react";

import homeMiddleImage from "../../../../public/assets/images/HomeMiddleImage.png";
import buttonArrow from "../../../../public/assets/icons/misc/HomeArrow.png";

import styles from "./MiddleSection.module.css";

function MiddleSection() {
  return (
    <div className={styles.middleSection}>
      <div>
        <p className={styles.homeMiddleSectionText}>We're There</p>
        <p className={styles.homeMiddleSectionText}>Where You Need Us</p>
        <a href="/find-station">
          <button>
            Find a Station
            <img src={buttonArrow} />
          </button>
        </a>
      </div>
      <div className={styles.imageDiv}>
        {" "}
        <img
          src={homeMiddleImage}
          className={styles.ladyWithPhone}
          alt="image of a z-energy employee holding a cellphone"
        />
      </div>
    </div>
  );
}

export default MiddleSection;
