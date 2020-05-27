import React from "react";

const MeanLine = ({ dimensions, meanValue }) => {
  return (
    <>
      <text
        x={meanValue}
        y={7}
        fill="maroon"
        style={{ fontSize: "12px", textAnchor: "middle" }}
      >
        mean
      </text>
      <line
        x1={meanValue}
        x2={meanValue}
        y1={dimensions.boundedHeight}
        y2={10}
        stroke="maroon"
        strokeDasharray="2 4"
      />
    </>
  );
};

export default MeanLine;
