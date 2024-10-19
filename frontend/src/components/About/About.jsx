import React from "react";
import "../About/About.css";
import FirstSectionAbout from "../About/Sections/firstSectionAbout/firstSectionAbout.jsx";
import SecondSectionAbout from "./Sections/secondSectionAbout/secondSectionAbout";
import ThirdSectionAbout from "./Sections/thirdSectionAbout/thirdSectionAbout";
import FourthSectionAbout from "./Sections/fourthSectionAbout/fourthSectionAbout";
import FifthSectionAbout from "./Sections/fifthSectionAbout/fifthSectionAbout";
import SixthSectionAbout from "./Sections/sixthSectionAbout/sixthSectionAbout";
import SeventhSectionAbout from "./Sections/seventhSectionAbout/seventhSectionAbout";
import EightSectionAbout from "./Sections/eightSectionAbout/eightSectionAbout";

const About = () => {
  return (
    <div className="about-container">
      <FirstSectionAbout />
      <SecondSectionAbout />
      <ThirdSectionAbout />
      <FourthSectionAbout />
      <FifthSectionAbout />
      <SixthSectionAbout />
      <SeventhSectionAbout />
      <EightSectionAbout />
    </div>
  );
};

export default About;
