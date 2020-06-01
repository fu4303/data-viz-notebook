import React from "react";

const Tooltip = ({ x, y, width, height, isShown = false }) => {
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

export default Tooltip;
