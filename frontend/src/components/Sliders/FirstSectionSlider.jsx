import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import FirstSectionSliderData from "../Sliders/FirstSectionSliderData.jsx";
import "../Sliders/FirstSectionSlider.css";
function FirstSectionSlider() {
  const items = FirstSectionSliderData.map((type) => {
    return (
      <div className="item-firstSection" key={type}>
        <img src={type.image} alt="test" />
      </div>
    );
  });
  return (
    <div className="first-carousel-container">
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{ 0: { items: 1 }, 767: { items: 3 }, 1023: { items: 5 } }}
        disableDotsControls={true}
        disableButtonsControls={true}
        infinite={true}
        autoPlay={true}
        autoPlayInterval={3000}
      ></AliceCarousel>
    </div>
  );
}
export default FirstSectionSlider;
