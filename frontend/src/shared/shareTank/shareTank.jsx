import React from "react";
import homeSectionFour from "../../../public/assets/images/homeSection4.png";
import styles from "./shareTank.module.css";

function shareTank() {
  return (
    <div>
      <img src={homeSectionFour} className={styles.homeSectionFour} />
    </div>
  );
}

export default shareTank;
