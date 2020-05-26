import React from "react";

const Bars = ({
  data,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor,
}) => {
  return (
    <>
      {data.map((d, i) => (
        <rect
          key={i}
          x={xAccessor(d)}
          y={yAccessor(d)}
          width={widthAccessor(d)}
          height={heightAccessor(d)}
          fill="cornflowerblue"
        />
      ))}
    </>
  );
};

export default Bars;
