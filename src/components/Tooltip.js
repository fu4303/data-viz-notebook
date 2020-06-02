import React from "react";

const Tooltip = ({
  x,
  y,
  width = 200,
  height = 50,
  isShown = false,
  content,
  dimensions,
}) => {
  let boxX1, boxX2, boxY1, boxY2, pointRight, pointMiddle, pointLeft, points;
  let isUpsideDown = false;
  if (x < width / 2) {
    boxX1 = x / 2;
    boxX2 = boxX1 + width;
  } else if (x > dimensions.boundedWidth - width / 2) {
    boxX2 = x + (dimensions.boundedWidth - x) / 2;
    boxX1 = boxX2 - width;
  } else {
    boxX1 = x - width / 2;
    boxX2 = x + width / 2;
  }
  if (y - height - 10 < 0) {
    boxY1 = y + 10;
    boxY2 = boxY1 + height;
    pointRight = `${x + 5},${y + 10}`;
    pointMiddle = `${x},${y + 5}`;
    pointLeft = `${x - 5},${y + 10}`;
    isUpsideDown = true;
  } else {
    boxY2 = y - 10;
    boxY1 = boxY2 - height;
    pointRight = `${x + 5},${y - 10}`;
    pointMiddle = `${x},${y - 5}`;
    pointLeft = `${x - 5},${y - 10}`;
  }
  const topLeft = `${boxX1},${boxY1}`;
  const bottomLeft = `${boxX1},${boxY2}`;
  const topRight = `${boxX2},${boxY1}`;
  const bottomRight = `${boxX2},${boxY2}`;

  points = isUpsideDown
    ? [
        topLeft,
        pointLeft,
        pointMiddle,
        pointRight,
        topRight,
        bottomRight,
        bottomLeft,
      ].join(" ")
    : [
        topLeft,
        topRight,
        bottomRight,
        pointRight,
        pointMiddle,
        pointLeft,
        bottomLeft,
      ].join(" ");

  if (!isShown) return null;
  return (
    <g>
      <polygon points={points} stroke="blue" strokeWidth="1" fill="white" />
      {content.map((d, i) => (
        <text
          key={i}
          x={boxX1 + width / 2}
          y={
            isUpsideDown
              ? y + 20 + height / 2 - i * 12
              : y - 20 - height / 2 + i * 12
          }
          style={{
            color: "black",
            textAnchor: "middle",
            fontSize: "12px",
            alignmentBaseline: "middle",
          }}
        >
          {d}
        </text>
      ))}
    </g>
  );
};

export default Tooltip;
