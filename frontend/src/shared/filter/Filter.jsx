import React from "react";
import { useEffect, useState } from "react";

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

  //fetch the stations dynamically
  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async (filters = {}) => {
    setLoading(true);
    const params = new URLSearchParams(filters).toString();
    const url = `http://localhost:4000/stations?${params}`;
    console.log("fetching", url);

    try {
      const res = await fetch(url);
      const data = await res.json();
      setStations(data);
    } catch (err) {
      console.error("Error fetching the stations", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filters = {};
    if (selectedServices.length > 0) {
      filters.services = selectedServices.join(".");
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

  // useEffect(() => {
  //   fetchStations({}); //this will load it all on the first render!
  // }, []);

  return (
    <div style={{ padding: "2rem" }}>
      {/* Dropdown */}
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <button onClick={() => setDropdownOpen((prev) => !prev)}>
          Filter by Services
        </button>
        dropdownOpen && (
        <div
          style={{
            position: "absolute",
            background: "#fff",
            border: "1px solid #ccc",
            padding: "1rem",
            width: "250px",
            zIndex: 100,
          }}
        >
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
          <button style={{ marginTop: "0.5rem" }} onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
        )
      </div>

      {/* Results */}
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
