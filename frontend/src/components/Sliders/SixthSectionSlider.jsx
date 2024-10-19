import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { RiDoubleQuotesR } from "react-icons/ri";
import SixthSectionSliderData from "../Sliders/SixthSectionSliderData.jsx";
import "../Sliders/SixthSectionSlider.css";
function SixthSectionSlider() {
  const items = SixthSectionSliderData.map((type) => {
    return (
      <div className="item-sixthSection" key={type}>
        <div className="item-sixth-img">
          <img src={type.image} alt="test" />
        </div>
        <div className="item-sixth-desc">
          <RiDoubleQuotesR />
          <p> {type?.description} </p>
        </div>
        <div className="item-sixth-name">
          <p> {type?.name} </p>
        </div>
        <div className="item-sixth-title">
          <p> {type?.title} </p>
        </div>
      </div>
    );
  });
  return (
    <div className="sixth-carousel-container">
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: { items: 1 },
          767: { items: 2 },
          1023: { items: 2 },
          1439: { items: 2 },
        }}
        disableDotsControls={true}
        disableButtonsControls={true}
        infinite={true}
        autoPlay={true}
        autoPlayInterval={3000}
      ></AliceCarousel>
    </div>
  );
}
export default SixthSectionSlider;
