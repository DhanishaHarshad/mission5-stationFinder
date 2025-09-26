import React from "react";
import Styles from "./Header.module.css";

//image import
import ZEnergyLogo from "../../../public/assets/images/ZEnergyLogo.png";
import CroppedHeaderImage from "../../../public/assets/images/CroppedHeader.png";

function Header() {
  return (
    <div className={Styles.header}>
      <img src={CroppedHeaderImage} alt="Header Image" className="zEnergyNav" />
      {/* bottom left navigation */}
      <div className={Styles.bottomLeft}>
        <a></a>
        <a>At The Station</a>
        <a>Rewards & Promotions</a>
        <a href="/find-station">Find Station</a>
        <a></a>
        <a></a>
      </div>
    </div>
  );
}

export default Header;
