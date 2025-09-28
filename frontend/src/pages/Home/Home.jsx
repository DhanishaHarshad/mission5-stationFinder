// import React from "react";
import React from "react";

import Header from "../../shared/header/Header";
import Banner from "./Banner";
import MiddleSection from "./MiddleSection";
import ShareTank from "../../shared/shareTank/shareTank";
import Footer from "../../shared/footer/Footer";
import styles from "./Home.module.css";

// import heroBanner from "../../../assets/images/HeroBanner.png";
// import HeaderImage from "../../../assets/images/Header.png";
// import homeSectionOne from "../../../public/assets/images/HomeSection1.png";
// import homeSectionTwo from "../../../public/assets/images/HomeSection2.png";
// import homeSectionThree from "../../../assets/images/HomeSection3.png";
// import homeSelectionFour from "../../../public/assets/images/HomeSection4.png";

export default function Home() {
  return (
    <div className={styles.homeStyling}>
      <Header />
      {/* <img src={HeaderImage} /> */}
      <Banner />
      {/* <img src={homeSectionOne} /> */}

      <div className={styles.homeMiddleSection}>
        <MiddleSection />
      </div>

      {/* <img src={homeSectionThree} className={styles.homeSectionThree} /> */}

      <ShareTank />

      <Footer />
    </div>
  );
}
