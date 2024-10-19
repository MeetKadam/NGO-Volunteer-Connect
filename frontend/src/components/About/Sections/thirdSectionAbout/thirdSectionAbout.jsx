import React from "react";
import medicine from "../../../Images/medicine.png";
import faucet from "../../../Images/water-tap.png";
import vegetable from "../../../Images/vegetable.png";
import hat from "../../../Images/hat.png";
import "../thirdSectionAbout/thirdSectionAbout.css";

function thirdSectionAbout() {
  return (
    <div className="about-third-section">
      <div className="icon-about-div">
        <div className="about-first-box">
          <div className="about-image-box-container">
            <img src={vegetable} />
          </div>
          <a href="#">Healthy Food</a>
        </div>
        <div className="about-second-box">
          <div className="about-image-box-container">
            <img src={faucet} />
          </div>
          <a href="#">Clean Water</a>
        </div>
        <div className="about-third-box">
          <div className="about-image-box-container">
            <img src={medicine} />
          </div>
          <a href="#">Medical Care</a>
        </div>
        <div className="about-fourth-box">
          <div className="about-image-box-container">
            <img src={hat} />
          </div>
          <a href="#">Child Education</a>
        </div>
      </div>
    </div>
  );
}

export default thirdSectionAbout;
