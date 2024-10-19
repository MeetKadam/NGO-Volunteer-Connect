import React from "react";
import "../secondSectionAbout/secondSectionAbout.css";
import SeconSectionPic from "../../../Images/second-section-about-picture.jpg";
import Modal from "../secondSectionAbout/popupSecondSection.jsx";

function secondSectionAbout() {
  return (
    <div className="about-second-section">
      <div className="second-section-container">
        <div className="image-container-second-about-section">
          <img src={SeconSectionPic} alt="second-section-picture" />
          <div className="ghana-video">
            <Modal />
          </div>
        </div>

        <h2>
          See what we do for the <span>poor people and the children</span>
        </h2>

        <hr />
      </div>
    </div>
  );
}

export default secondSectionAbout;
