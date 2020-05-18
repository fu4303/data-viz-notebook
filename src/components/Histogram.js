import React, { useRef, useEffect } from "react";
import {
  extent,
  select,
  histogram,
  scaleLinear,
  max,
  mean,
  axisBottom,
} from "d3";
import { dataset } from "../data/weather";
import dimensions from "../utils/dimensions";

const metricAccessor = (d) => d.humidity;
const yAccessor = (d) => d.length;

const xScale = scaleLinear()
  .domain(extent(dataset, metricAccessor))
  .range([0, dimensions.boundedWidth])
  .nice();

const binsGenerator = histogram()
  .domain(xScale.domain())
  .value(metricAccessor)
  .thresholds(12);

const bins = binsGenerator(dataset);

const yScale = scaleLinear()
  .domain([0, max(bins, yAccessor)])
  .range([dimensions.boundedHeight, 0])
  .nice();

const barPadding = 1;

const Histogram = () => {
  const svgRef = useRef();

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

    const binsGroup = bounds.append("g");
    const binGroups = binsGroup.selectAll("g").data(bins).enter().append("g");
    // barRects
    binGroups
      .append("rect")
      .attr("x", (d) => xScale(d.x0) + barPadding / 2)
      .attr("y", (d) => yScale(yAccessor(d)))
      .attr("width", (d) => max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
      .attr("height", (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
      .attr("fill", "cornflowerblue");
    //barText
    binGroups
      .filter(yAccessor)
      .append("text")
      .attr("x", (d) => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
      .attr("y", (d) => yScale(yAccessor(d)) - 5)
      .text(yAccessor)
      .style("text-anchor", "middle")
      .attr("fill", "darkgrey")
      .style("font-size", "12px")
      .style("font-family", "sans-serif");

    const xAxisGenerator = axisBottom().scale(xScale);

    const xAxis = bounds
      .append("g")
      .call(xAxisGenerator)
      .style("transform", `translateY(${dimensions.boundedHeight}px)`);
    // xAxisLabel
    xAxis
      .append("text")
      .attr("x", dimensions.boundedWidth / 2)
      .attr("y", dimensions.margin.bottom - 10)
      .attr("fill", "black")
      .text("Humidity")
      .style("font-size", "12px")
      .style("font-family", "sans-serif")
      .style("text-anchor", "middle");

    const meanValue = mean(dataset, metricAccessor);
    // meanLine
    bounds
      .append("line")
      .attr("x1", xScale(meanValue))
      .attr("x2", xScale(meanValue))
      .attr("y1", dimensions.boundedHeight)
      .attr("y2", 0)
      .attr("stroke", "maroon")
      .attr("stroke-dasharray", "2px 4px");
    //meanLabel
    bounds
      .append("text")
      .attr("x", xScale(meanValue))
      .attr("y", -5)
      .text("mean")
      .attr("fill", "maroon")
      .style("font-size", "12px")
      .style("font-family", "sans-serif")
      .style("text-anchor", "middle");
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default Histogram;
