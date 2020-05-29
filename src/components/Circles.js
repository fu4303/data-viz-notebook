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
        width={100}
        height={100}
      />
    </>
  );
};

const Tooltip = ({ x, y, width, height }) => {
  return (
    <g transform={`translate(${x - width / 2} ${y - height - 10})`}>
      <rect width={width} height={height} fill="white" />
      <text
        transform={`translate(${width / 2} ${height / 2})`}
        style={{
          color: "black",
          textAnchor: "middle",
          fontSize: "12px",
        }}
      >
        tooltip
      </text>
    </g>
  );
};

export default Circles;
