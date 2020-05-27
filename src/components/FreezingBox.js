import React from "react";

const FreezingBox = ({ dimensions, freezingPoint }) => {
  return (
    <rect
      x={0}
      y={freezingPoint}
      width={dimensions.boundedWidth}
      height={dimensions.boundedHeight - freezingPoint}
      fill="cornflowerblue"
    />
  );
};

export default FreezingBox;
