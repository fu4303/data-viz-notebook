import React from "react";

const Bars = ({
  data,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor,
  xLabelAccessor,
  yLabelAccessor,
}) => {
  return (
    <>
      {data.map((d, i) => (
        <>
          {d.length && (
            <text
              x={xLabelAccessor(d)}
              y={yLabelAccessor(d)}
              fill="cornflowerblue"
              style={{
                fontSize: "12px",
                color: "grey",
                textAnchor: "middle",
              }}
            >
              {d.length}
            </text>
          )}

          <rect
            key={i}
            x={xAccessor(d)}
            y={yAccessor(d)}
            width={widthAccessor(d)}
            height={heightAccessor(d)}
            fill="cornflowerblue"
          />
        </>
      ))}
    </>
  );
};

export default Bars;
