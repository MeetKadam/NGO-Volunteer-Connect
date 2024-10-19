import React from "react";
import "../firstSectionAbout/firstSectionAbout.css";
import FirstSectionPic from "../../../Images/about-section-first-pic.jpg";

function firstSectionAbout() {
  return (
    <div className="about-first-section">
      <div className="first-section-container">
        <div className="first-section-centered-div">
          <h2>About Us</h2>
          <p>
            {" "}
            <a href="#">Home</a>/About
          </p>
        </div>
      </div>
    </div>
  );
}

export default firstSectionAbout;
