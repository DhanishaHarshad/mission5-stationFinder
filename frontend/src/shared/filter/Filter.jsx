import React from "react";
import { useEffect, useState } from "react";
import styles from "./Filter.module.css";

// import { createRoot } from "react-dom/client";

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

const SERVICE_LABELS = {
  EV_fast_charging: "EV Fast Charging",
  EV_ultra_fast_charging: "EV Ultra Fast Charging",
  Zexpress_coffee_and_food: "Zexpress Coffee & Food",
  "f'real": "F'real Shakes",
  preorder_coffee: "Preorder Coffee",
  "24/7_pay_by_pump": "24/7 Pay at Pump",
  pay_by_plate: "Pay by Plate",
  pay_in_z_app: "Pay in Z App",
  atm: "ATM",
  restrooms: "Restrooms",
  LPG_bottle_swap: "LPG Bottle Swap",
  recycling: "Recycling",
  trailer_hire: "Trailer Hire",
  wifi: "Wi-Fi",
  car_wash: "Car Wash",
  super_long_hoses: "Super Long Hoses",
  tyre_pressure: "Tyre Pressure",
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

function Filter() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchStations = async (filters = {}) => {
    setLoading(true);

    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([v]) => v != null && v !== "")
    );

    const params = new URLSearchParams(cleanedFilters).toString();
    const url = params
      ? `${API_BASE}/api/zstations?${params}`
      : `${API_BASE}/api/zstations`;

    console.log("fetching", url);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setStations(data);
    } catch (err) {
      console.error("Error fetching the stations", err);
      setStations([]);
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
        <button
          type="button"
          aria-expanded={dropdownOpen}
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <img src="/assets/filters/FilterIcon.png" />
          Filter
        </button>
        {/* <div className={styles.dropdownMenuDiv}> */}
        {dropdownOpen && (
          <div className={styles.dropdownDiv}>
            {ALL_SERVICES.map((service) => (
              <label key={service} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => toggleService(service)}
                />
                {SERVICE_LABELS[service] || service}
              </label>
            ))}

            <button
              type="button"
              style={{ marginTop: "0.5rem" }}
              onClick={applyFilters}
              disabled={loading}
            >
              Apply Filter
            </button>
          </div>
        )}
        {/* </div> */}
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
