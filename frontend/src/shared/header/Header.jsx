import React from "react";
import Styles from "./Header.module.css";

//image import
import ZEnergyLogo from "../../../public/assets/images/ZEnergyLogo.png";
import CroppedHeaderImage from "../../../public/assets/images/CroppedHeader.png";

function Header() {
  return (
    <div className={Styles.header}>
      {/* logo */}
      {/* <img src={ZEnergyLogo} alt="Z Energy Logo" className="zEnergyLogo" /> */}

      {/* top right */}
      {/* <div className={Styles.innerHeader}>
        <div className={Styles.topRight}>
          <ul>
            <li>
              <p>About Z</p>
            </li>
            <li>
              <p>Z App</p>
            </li>
          </ul>
        </div>
      </div> */}

      {/* <line className={Styles.line} /> */}
      <img src={CroppedHeaderImage} alt="Header Image" className="zEnergyNav" />
      {/* bottom left navigation */}
      <div className={Styles.bottomLeft}>
        {/* <ul> */}
        {/* <li> */}
        <a>At The Station</a>
        {/* </li> */}
        {/* <li> */}
        <a>Rewards & Promotions</a>
        {/* </li> */}
        {/* <li> */}
        <a href="/find-station">Find Station</a>
        {/* </li> */}
        {/* </ul> */}
      </div>
    </div>
  );
}

export default Header;
