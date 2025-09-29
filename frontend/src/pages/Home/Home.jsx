// import React from "react";
import React from "react";

import Header from "../../shared/header/Header";
import Banner from "./components/Banner";
import MiddleSection from "./components/MiddleSection";
import ShareTank from "../../shared/shareTank/shareTank";
import Footer from "../../shared/footer/Footer";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeStyling}>
      <Header />
      <Banner />
      <div className={styles.homeMiddleSection}>
        <MiddleSection />
      </div>
      <ShareTank />
      <Footer />
    </div>
  );
}
