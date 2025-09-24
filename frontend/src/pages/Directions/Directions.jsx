import React from "react";

export default function Directions() {
  return (
    <div className="directionsWrapper">
      {/* nav bar */}
      {/* TODO: this should conditional render station name */}
      {/* Main Content */}
      <main className="directionsStationCard">
        station name here
        {/* -------- LEFT SECTION -------- */}
        <section className="directionsLeftSection">
          left section
          <div className="directionsSearchWrapper">
            <input
              type="text"
              placeholder="Search"
              className="directionsSearchInput"
              required
            />
            <input
              type="text"
              placeholder="Station Address"
              className="directionsSearchInput"
              required
            />
          </div>
          <div>fuel</div>
          <div>hours</div>
          <div>service</div>
        </section>
        {/* -------- RIGHT SECTION -------- */}
        <section className="directionsRightSection">
          right section - map
        </section>
      </main>

      {/* -------- CTA -------- */}
      <aside> CTA here </aside>

      {/* -------- FOOTER -------- */}
    </div>
  );
}
