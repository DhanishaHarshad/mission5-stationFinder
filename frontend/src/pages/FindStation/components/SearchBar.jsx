import React, { useState } from "react";
import styles from "../FindStation.module.css";
import ShareUserLocation from "./ShareUserLocation";
import axios from "axios";

import { formatStation } from "../../../utils/formatStation";

function SearchBar(props) {
  const [city, setCity] = useState("");

  function SearchStations() {
    axios
      .get(`http://localhost:4000/stations?address=${city}`)
      .then((response) => {
        props.setStations(response.data.map(formatStation));
      });
  }

  return (
    <div>
      <form className={styles.searchBar} onSubmit={SearchStations}>
        <img
          src="/assets/icons/misc/SearchDefault.png"
          alt=""
          className={styles.searchIcon}
        />
        <input
          type="text"
          placeholder="City/Town"
          value={city}
          onChange={setCity}
        />
        <ShareUserLocation />
      </form>
    </div>
  );
}

export default SearchBar;
