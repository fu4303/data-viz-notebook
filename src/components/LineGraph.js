import React, { useRef, useEffect } from "react";
import {
  extent,
  select,
  scaleLinear,
  scaleTime,
  timeParse,
  line,
  axisLeft,
  axisBottom,
  timeFormat,
} from "d3";
import Chart from "./Chart";
import Axis from "./Axis";
import Line from "./Line";
import { useChartDimensions } from "../utils/utils";

const LineGraph = ({ data, xAccessor, yAccessor, label }) => {
  const [ref, dimensions] = useChartDimensions();

  const yScale = scaleLinear()
    .domain(extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0]);

  const freezingTemperaturePlacement = yScale(32);

  const xScale = scaleTime()
    .domain(extent(data, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const lineGenerator = line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  const linePath = lineGenerator(data);
  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  const xTicks = xScale.ticks(numberOfTicks);
  const yTicks = yScale.ticks(10);
  const formatDate = timeFormat("%-b %-d");

  console.log(yTicks);
  return (
    <div ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis
          dimensions={dimensions}
          direction="x"
          scale={xScale}
          ticks={xTicks}
          formatTick={formatDate}
        />
        <Axis
          dimensions={dimensions}
          direction="y"
          scale={yScale}
          label={label}
          ticks={yTicks}
        />

        <Line linePath={linePath} />
      </Chart>
    </div>
  );
};

export default LineGraph;
