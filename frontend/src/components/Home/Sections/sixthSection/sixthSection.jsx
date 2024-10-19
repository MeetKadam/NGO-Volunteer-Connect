import React from "react";
import "../sixthSection/sixthSection.css";
import SixthSectionSlider from "../../../Sliders/SixthSectionSlider.jsx";
function sixthSection() {
  return (
    <div className="home-sixth-section">
      <div className="sixth-container">
        <div className="sixth-upper-container">
          <h4>Testimonial</h4>
          <h2>What People Say About Us</h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form,
          </p>
        </div>
        <div className="sixth-lower-container">
          <SixthSectionSlider />
        </div>
      </div>
    </div>
  );
}
export default sixthSection;
