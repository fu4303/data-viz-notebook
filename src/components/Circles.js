import React, { useState } from "react";

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

const Tooltip = ({ x, y, width, height, isShown }) => {
  const points = [
    `${x - width / 2},${y - 10 - height}`,
    `${x + width / 2},${y - 10 - height}`,
    `${x + width / 2},${y - 10}`,
    `${x + 5},${y - 10}`,
    `${x},${y - 5}`,
    `${x - 5},${y - 10}`,
    `${x - width / 2},${y - 10}`,
  ].join(" ");

  if (!isShown) return null;
  return (
    <g>
      <polygon points={points} stroke="blue" strokeWidth="1" fill="white" />
      <text
        x={x}
        y={y - 10 - height / 2}
        style={{
          color: "black",
          textAnchor: "middle",
          fontSize: "12px",
          alignmentBaseline: "middle",
        }}
      >
        tooltip
      </text>
    </g>
  );
};

export default Circles;
