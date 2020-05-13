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
} from "d3";
import { dataset } from "../data/weather";
import dimensions from "../utils/dimensions";

const LineGraph = () => {
  const svgRef = useRef();
  const dateParser = timeParse("%Y-%m-%d");
  const xAccessor = (d) => dateParser(d.date);
  const yAccessor = (d) => d.temperatureMax;

  useEffect(() => {
    const svgElement = select(svgRef.current);

    svgElement
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    const bounds = svgElement
      .append("g")
      .style(
        "transform",
        `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
      );
    const yScale = scaleLinear()
      .domain(extent(dataset, yAccessor))
      .range([dimensions.boundedHeight, 0]);

    const freezingTemperaturePlacement = yScale(32);
    // freezing temperature box
    bounds
      .append("rect")
      .attr("x", 0)
      .attr("width", dimensions.boundedWidth)
      .attr("y", freezingTemperaturePlacement)
      .attr("height", dimensions.boundedHeight - freezingTemperaturePlacement)
      .attr("fill", "#e0f3f3");
    const xScale = scaleTime()
      .domain(extent(dataset, xAccessor))
      .range([0, dimensions.boundedWidth]);

    const lineGenerator = line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));
    // graph line
    bounds
      .append("path")
      .attr("d", lineGenerator(dataset))
      .attr("fill", "none")
      .attr("stroke", "#af9358")
      .attr("stroke-width", 2);

    const xAxisGenerator = axisBottom().scale(xScale);
    const yAxisGenerator = axisLeft().scale(yScale);
    // xAxis
    bounds
      .append("g")
      .call(xAxisGenerator)
      .style("transform", `translateY(${dimensions.boundedHeight}px)`);
    // yAxis
    bounds.append("g").call(yAxisGenerator);
  }, [dataset]);

  return <svg ref={svgRef}></svg>;
};

export default LineGraph;
