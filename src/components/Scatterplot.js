import React from "react";
import { extent, scaleLinear } from "d3";
import Chart from "./Chart";
import Axis from "./Axis";
import Circles from "./Circles";
import { useChartDimensions } from "../utils/utils";

const Scatterplot = ({ data, xAccessor, yAccessor, colorAccessor }) => {
  const [ref, dimensions] = useChartDimensions();

  const xScale = scaleLinear()
    .domain(extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const colorScale = scaleLinear()
    .domain(extent(data, colorAccessor))
    .range(["skyblue", "darkslategrey"]);

  const xAccessorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScaled = (d) => yScale(yAccessor(d));
  const colorAccessorScaled = (d) => colorScale(colorAccessor(d));

  const xTicks = xScale.ticks(10);
  const yTicks = yScale.ticks(4);

  return (
    <div ref={ref}>
      <Chart dimensions={dimensions}>
        <Circles
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          colorAccessor={colorAccessorScaled}
          unscaledX={xAccessor}
          unscaledY={yAccessor}
          unscaledColor={colorAccessor}
        />
        <Axis
          dimensions={dimensions}
          direction="x"
          scale={xScale}
          ticks={xTicks}
          label="Dew point (&deg;F)"
        />
        <Axis
          dimensions={dimensions}
          direction="y"
          scale={yScale}
          ticks={yTicks}
          label="Relative humidity"
        />
      </Chart>
    </div>
  );
};

export default Scatterplot;
