// import React from "react";
import React from "react";

import Header from "../../shared/header/Header";
import Footer from "../../shared/footer/Footer";
import Styles from "./Home.module.css";

import heroBanner from "../../../public/assets/images/HeroBanner.png";
import HeaderImage from "../../../public/assets/images/Header.png";
// import homeSectionOne from "../../../public/assets/images/HomeSection1.png";
// import homeSectionTwo from "../../../public/assets/images/HomeSection2.png";
import homeSectionThree from "../../../public/assets/images/HomeSection3.png";
import homeSelectionFour from "../../../public/assets/images/HomeSection4.png";
import homeMiddleImage from "../../../public/assets/images/HomeMiddleImage.png";

import buttonArrow from "../../../public/assets/icons/misc/HomeArrow.png";

export default function Home() {
  return (
    <div className={Styles.homeStyling}>
      {/* <Header /> */}
      <img src={HeaderImage} />

      <div className={Styles.heroBannerDiv}>
        <img src={heroBanner} alt="Hero Banner" className={Styles.heroBanner} />
      </div>

      {/* <img src={homeSectionOne} /> */}
      <div className={Styles.homeMiddleSection}>
        <p>We're There</p>
        <br />
        <p> Where You Need Us </p>
        <button>
          Find a Station
          <img src={buttonArrow} className={Styles.homeArrowStyling} />
        </button>
        <img src={homeMiddleImage} className={Styles.ladyWithPhone} />
        <div></div>
      </div>
      <img src={homeSectionThree} />
      <img src={homeSelectionFour} />

      <Footer />
    </div>
  );
}
