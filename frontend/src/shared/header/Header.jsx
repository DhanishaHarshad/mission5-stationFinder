import React from "react";
import Styles from "./Header.module.css";

//image import
import ZEnergyLogo from "../../../public/assets/images/ZEnergyLogo.png";

function Header() {
  return (
    <div className={Styles.header}>
      {/* logo */}
      <img src={ZEnergyLogo} alt="Z Energy Logo" className="zEnergyLogo" />

      {/* top right */}
      <div className={Styles.innerHeader}>
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
      </div>

      <line className={Styles.line} />

      {/* bottom left navigation */}
      <div className={Styles.bottomLeft}>
        <ul>
          <li>
            <p>At The Station</p>
          </li>
          <li>
            <p>Rewards & Promotions</p>
          </li>
          <li>
            <p>Find Station</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
