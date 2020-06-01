import React from "react";

const Tooltip = ({ x, y, width, height, isShown = false, content }) => {
  let boxX1, boxX2, boxY1, boxY2;
  let pointRight = `${x + 5},${y - 10}`;
  let pointBottom = `${x},${y - 5}`;
  let pointLeft = `${x - 5},${y - 10}`;

  if (x < width / 2) {
    boxX1 = x / 2;
    boxX2 = x / 2 + width;
    boxY1 = y - 10 - height;
    boxY2 = y - 10;
  } else {
    boxX1 = x - width / 2;
    boxX2 = x + width / 2;
    boxY1 = y - 10 - height;
    boxY2 = y - 10;
  }
  const topLeft = `${boxX1},${boxY1}`;
  const bottomLeft = `${boxX1},${boxY2}`;
  const topRight = `${boxX2},${boxY1}`;
  const bottomRight = `${boxX2},${boxY2}`;

  const points = [
    topLeft,
    topRight,
    bottomRight,
    pointRight,
    pointBottom,
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
          y={y - 20 - height / 2 + i * 12}
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
