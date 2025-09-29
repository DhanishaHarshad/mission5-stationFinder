import React from "react";
import { useEffect, useState } from "react";
import styles from "./Filter.module.css";

const ALL_SERVICES = [
  "EV_fast_charging",
  "EV_ultra_fast_charging",
  "Zexpress_coffee_and_food",
  "f'real",
  "preorder_coffee",
  "24/7_pay_by_pump",
  "pay_by_plate",
  "pay_in_z_app",
  "atm",
  "restrooms",
  "LPG_bottle_swap",
  "recycling",
  "trailer_hire",
  "wifi",
  "car_wash",
  "super_long_hoses",
  "tyre_pressure",
];

function Filter() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedServices, setSelectedServices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchStations = async (filters = {}) => {
    setLoading(true);
    const params = new URLSearchParams(filters).toString();
    const url = params
      ? `http://localhost:4000/stations?${params}`
      : `http://localhost:4000/stations`; //  no dangling ?

    console.log("fetching", url);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setStations(data);
    } catch (err) {
      console.error("Error fetching the stations", err);
    } finally {
      setLoading(false);
    }
  };

  //fetch the stations dynamically
  useEffect(() => {
    fetchStations();
  }, []);

  const applyFilters = () => {
    const filters = {};
    if (selectedServices.length > 0) {
      filters.services = selectedServices.join(",");
    }

    fetchStations(filters);
    setDropdownOpen(false);
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className={styles.filteringDiv}>
      {/* Dropdown */}
      <div className={styles.buttonDiv}>
        <button type="button" onClick={() => setDropdownOpen((prev) => !prev)}>
          <img src="/assets/filters/FilterIcon.png" />
          Filter
        </button>
        <div className={styles.dropdownMenuDiv}>
          {dropdownOpen && (
            <div className={styles.dropdownDiv}>
              {ALL_SERVICES.map((service) => (
                <label key={service} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => toggleService(service)}
                  />
                  {service}
                </label>
              ))}

              <button
                type="button"
                style={{ marginTop: "0.5rem" }}
                onClick={applyFilters}
              >
                Apply Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results  THIS IS JUST FILLER FOR NOW SO I COULD SEE THE RESULTS*/}
      {loading ? (
        <p>Loading stations...</p>
      ) : stations.length === 0 ? (
        <p>No stations found.</p>
      ) : (
        <ul>
          {stations.map((station) => (
            <li key={station._id}>
              <strong>{station.station_name}</strong> — {station.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Filter;
