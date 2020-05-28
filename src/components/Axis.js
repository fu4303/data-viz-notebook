import React from "react";

const axisDirection = {
  x: AxisBottom,
  y: AxisLeft,
};

const Axis = ({ dimensions, direction, ...props }) => {
  const Component = axisDirection[direction];
  if (!Component) return null;
  return <Component {...props} dimensions={dimensions} />;
};

function AxisBottom({
  dimensions,
  label = "",
  scale,
  formatTick = (d) => d,
  ticks,
}) {
  return (
    <g transform={`translate(0, ${dimensions.boundedHeight})`}>
      <line x1={0} x2={dimensions.boundedWidth} y1={0} y2={0} stroke="black" />
      {ticks.map((tick) => (
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
function AxisLeft({
  dimensions,
  label = "",
  scale,
  formatTick = (d) => d,
  ticks,
}) {
  return (
    <g transform={`translate(${0}, 0)`}>
      <line x1={0} x2={0} y1={dimensions.boundedHeight} y2={0} stroke="black" />
      {ticks.map((tick) => (
        <React.Fragment key={tick}>
          <line
            x1={0}
            x2={-5}
            y1={scale(tick)}
            y2={scale(tick)}
            stroke="black"
          />
          <text
            transform={`translate(-15, ${scale(tick) + 3})`}
            style={{ fontSize: "10px", textAnchor: "middle" }}
          >
            {formatTick(tick)}
          </text>
        </React.Fragment>
      ))}
      <text
        transform={`translate(-40, ${
          dimensions.boundedHeight / 2
        }) rotate(-90)`}
        style={{ color: "black", textAnchor: "middle", fontSize: "12px" }}
      >
        {label}
      </text>
    </g>
  );
}

export default Axis;
