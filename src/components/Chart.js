import React from "react";

const Chart = ({ dimensions, children }) => {
  return (
    <svg width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}
      >
        {children}
      </g>
    </svg>
  );
};

export default Chart;
