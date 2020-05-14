import React, { useRef, useEffect } from "react";
import { extent, select, scaleLinear, axisBottom, axisLeft } from "d3";
import { dataset } from "../data/weather";
import dimensions from "../utils/dimensions";

const Scatterplot = () => {
  const svgRef = useRef();
  const xAccessor = (d) => d.dewPoint;
  const yAccessor = (d) => d.humidity;
  const colorAccessor = (d) => d.cloudCover;

  const xScale = scaleLinear()
    .domain(extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const colorScale = scaleLinear()
    .domain(extent(dataset, colorAccessor))
    .range(["skyblue", "darkslategrey"]);

  useEffect(() => {
    const svgElement = select(svgRef.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    const bounds = svgElement
      .append("g")
      .style(
        "transform",
        `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
      );

    bounds
      .selectAll("circle")
      .data(dataset)
      .join("circle")
      .attr("cx", (d) => xScale(xAccessor(d)))
      .attr("cy", (d) => yScale(yAccessor(d)))
      .attr("r", 5)
      .attr("fill", (d) => colorScale(colorAccessor(d)));

    const xAxisGenerator = axisBottom().scale(xScale);

    const xAxis = bounds
      .append("g")
      .call(xAxisGenerator)
      .style("transform", `translateY(${dimensions.boundedHeight}px)`);

    const yAxisGenerator = axisLeft().scale(yScale).ticks(4);

    const yAxis = bounds.append("g").call(yAxisGenerator);
  }, []);
  return <svg ref={svgRef}></svg>;
};

export default Scatterplot;
