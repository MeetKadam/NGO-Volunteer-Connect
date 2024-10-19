import React from "react";
import pictureThirdSection from "../../../Images/third-section-picture.png";
import "../thirdSection/thirdSection.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
function thirdSection() {
  return (
    <div className="home-third-section">
      <div className="third-container">
        <div className="left-third-section">
          <img src={pictureThirdSection} alt="picture third section" />
        </div>
        <div className="right-third-section">
          <h4>About Us</h4>
          <h2>We Can Save More Lifes With Your Helping Hand.</h2>
          <p>
          We are committed to improving the lives of vulnerable communities through targeted initiatives. Our mission is to provide essential support in areas such as education, healthcare, and poverty alleviation. With your generous contributions, we can create a positive impact and help those in need.
          </p>
          <ul>
              <li>
          <AiOutlineCheckCircle /> Over 10,000 children educated through our programs.
        </li>
        <li>
          <AiOutlineCheckCircle /> Providing healthcare services to underserved populations.
        </li>
        <li>
          <AiOutlineCheckCircle /> Collaborating with local organizations to maximize our impact.
        </li>
          </ul>
          <button>More About</button>
        </div>
      </div>
    </div>
  );
}
export default thirdSection;
