import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import pictureaboutFourthSection from "../../../Images/fourth-section-about-picture.png";
import "../fourthSectionAbout/fourthSectionAbout.css";

const fourthSectionAbout = () => {
  return (
    <div className="about-fourth-section">
      <div className="about-fourth-container">
        <div className="about-left-fourth-section">
          <img src={pictureaboutFourthSection} alt="picture fourth section" />
        </div>

        <div className="about-right-fourth-section">
          <h4>About Us</h4>
          <h2>We Can Save More Lifes With Your Helping Hand.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>
          <ul>
            <li>
              <AiOutlineCheckCircle /> The standard chunk of Lorem Ipsum used
              since.
            </li>
            <li>
              <AiOutlineCheckCircle /> Randomised words which don't look even
              slightly believable.
            </li>
            <li>
              <AiOutlineCheckCircle /> Making this the first true generator on
              the Internet.
            </li>
          </ul>
          <button>More About</button>
        </div>
      </div>
    </div>
  );
};

export default fourthSectionAbout;
