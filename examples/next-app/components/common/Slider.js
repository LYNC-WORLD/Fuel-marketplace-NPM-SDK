import { useRef, useState } from "react";
import { svgIcons } from "@/collections/svg";

export default function Slider({ children, showItems, totalItems, gapAmount }) {
  const sliderRef = useRef();
  const [scrollCount, setScrollCount] = useState(showItems);

  function sliderScroll(direction) {
    if (!sliderRef) return;

    const sliderWidth = sliderRef.current.clientWidth;
    const scrollAmount = parseInt((sliderWidth - gapAmount) / showItems) + 20;

    if (direction === "previous") {
      sliderRef.current.scrollLeft -= scrollAmount;
      setScrollCount((value) => value - 1);
    } else {
      sliderRef.current.scrollLeft += scrollAmount;
      setScrollCount((value) => value + 1);
    }
  }

  return (
    <>
      <div className="slider-container relative">
        <div className="slider-items-container w-full" ref={sliderRef}>
          {children}
        </div>
        {scrollCount > showItems ? (
          <button
            className="slider-btn box circle absolute prev"
            onClick={() => sliderScroll("previous")}
          >
            {svgIcons.nextFill}
          </button>
        ) : null}
        {scrollCount < totalItems ? (
          <button
            className="slider-btn box circle absolute next"
            onClick={() => sliderScroll("next")}
          >
            {svgIcons.nextFill}
          </button>
        ) : null}
      </div>
    </>
  );
}
