import React from "react";

const axisDirection = {
  x: AxisBottom,
  // y: AxisLeft,
};
const Axis = ({ dimensions, direction, ...props }) => {
  const Component = axisDirection[direction];
  if (!Component) return null;
  return <Component {...props} dimensions={dimensions} />;
};

function AxisBottom({ dimensions, label, scale, formatTick, ticks }) {
  return (
    <g transform={`translate(0, ${dimensions.boundedHeight})`}>
      <line x1={0} x2={dimensions.boundedWidth} y1={0} y2={0} stroke="black" />
      {ticks.map((tick, i) => (
        <React.Fragment key={tick}>
          <line
            x1={scale(tick)}
            x2={scale(tick)}
            y1={0}
            y2={5}
            stroke="black"
          />
          <text
            transform={`translate(${scale(tick)}, 20)`}
            style={{ fontSize: "10px", textAnchor: "middle" }}
          >
            {formatTick(tick)}
          </text>
        </React.Fragment>
      ))}
      <text
        transform={`translate(${dimensions.boundedWidth / 2}, 35)`}
        style={{ color: "black", textAnchor: "middle", fontSize: "12px" }}
      >
        {label}
      </text>
    </g>
  );
}

export default Axis;
