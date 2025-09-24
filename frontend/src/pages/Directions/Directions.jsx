import React from "react";

export default function Directions() {
  return (
    <div className="directionsWrapper">
      {/* nav bar */}
      {/* TODO: this should conditional render station name */}
      {/* Main Content */}
      <main className="directionsBody">
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
          {/* TODO: check with Rachel if her station card is reusable */}
          {/* station card */}
          <div>
            <div>fuel</div>
            <div>hours</div>
            <div>service</div>
          </div>
        </section>
        {/* -------- RIGHT SECTION -------- */}
        <section className="directionsRightSection">
          right section - map
        </section>
      </main>

      {/* -------- CTA -------- */}
      <aside className="directionsCTAWrapper">
        CTA here
        <div></div>
        <div className="directionsCTARightSection">
          <h6>Z App</h6>
          <p>
            Sign up to Sharetank, the virtual fuel tank you can fill anytime,
            anywhere and share with up to 5 friends or whānau
          </p>
        </div>
      </aside>

      {/* -------- FOOTER -------- */}
    </div>
  );
}
