import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import FifthSectionSliderData from "../Sliders/FifthSectionSliderData.jsx";
import "../Sliders/FifthSectionSlider.css";
function FifthSectionSlider() {
  const items = FifthSectionSliderData.map((type) => {
    return (
      <div className="item-fifthSection" key={type}>
        <img src={type.image} alt="test" />
        <br />
        <a href="/"> {type?.name} </a>
        <p> {type?.description} </p>
      </div>
    );
  });
  return (
    <div className="test1">
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: { items: 1 },
          767: { items: 3 },
          1023: { items: 3 },
          1439: { items: 4 },
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
export default FifthSectionSlider;
