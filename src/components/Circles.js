import React, { useState } from "react";
import Tooltip from "./Tooltip";

const Circles = ({ data, xAccessor, yAccessor, colorAccessor }) => {
  const [isShown, setIsShown] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  return (
    <>
      {data.map((d, i) => (
        <circle
          key={i}
          cx={xAccessor(d)}
          cy={yAccessor(d)}
          r={5}
          fill={colorAccessor(d)}
          onMouseEnter={() => {
            setTooltipPosition({ x: xAccessor(d), y: yAccessor(d) });
            return setIsShown(true);
          }}
          onMouseLeave={() => setIsShown(false)}
        />
      ))}
      <Tooltip
        x={tooltipPosition.x}
        y={tooltipPosition.y}
        width={200}
        height={40}
        isShown={isShown}
      />
    </>
  );
};

export default Circles;
