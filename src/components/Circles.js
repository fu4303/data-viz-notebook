import React from "react";

const Circles = ({ data, xAccessor, yAccessor, colorAccessor }) => {
  return (
    <>
      {data.map((d, i) => (
        <circle
          key={i}
          cx={xAccessor(d)}
          cy={yAccessor(d)}
          r={5}
          fill={colorAccessor(d)}
        />
      ))}
    </>
  );
};

export default Circles;
