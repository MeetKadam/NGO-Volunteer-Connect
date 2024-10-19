import React from "react";
import "../tenthSection/tenthSection.css";
import TenthSectionSlider from "../../../Sliders/TenthSectionSlider.jsx";
function tenthSection() {
  return (
    <div className="home-tenth-section">
      <div className="tenth-container">
        <div className="tenth-upper-container">
          <h4>Who help us</h4>
          <h2>Our Partners & Donors</h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form,
          </p>
        </div>
        <div className="tenth-lower-container">
          <TenthSectionSlider />
        </div>
      </div>
    </div>
  );
}
export default tenthSection;
