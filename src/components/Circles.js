import React, { useState } from "react";
import Tooltip from "./Tooltip";

const Circles = ({
  data,
  xAccessor,
  yAccessor,
  colorAccessor,
  unscaledX,
  unscaledY,
  unscaledColor,
}) => {
  const [isShown, setIsShown] = useState(false);
  const [tooltipInfo, setTooltipInfo] = useState({ x: 0, y: 0, content: [] });
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
            setTooltipInfo({
              x: xAccessor(d),
              y: yAccessor(d),
              content: [
                `Dew Point: ${unscaledX(d)}`,
                `Humidity: ${unscaledY(d)}`,
                `Cloud cover: ${unscaledColor(d)}`,
              ],
            });
            return setIsShown(true);
          }}
          onMouseLeave={() => setIsShown(false)}
        />
      ))}

      <Tooltip
        x={tooltipInfo.x}
        y={tooltipInfo.y}
        width={200}
        height={50}
        isShown={isShown}
        content={tooltipInfo.content}
      />
    </>
  );
};

export default Circles;
