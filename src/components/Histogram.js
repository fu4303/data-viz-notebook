import React from "react";
import { extent, histogram, scaleLinear, max, format, mean } from "d3";
import Chart from "./Chart";
import Bars from "./Bars";
import Axis from "./Axis";
import MeanLine from "./MeanLine";
import { useChartDimensions } from "../utils/utils";

const Histogram = ({ data, xAccessor, yAccessor, label }) => {
  const [ref, dimensions] = useChartDimensions();

  const thresholds = dimensions.width < 600 ? 6 : 12;

  const xScale = scaleLinear()
    .domain(extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice(thresholds);

  const binsGenerator = histogram()
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(thresholds);

  const bins = binsGenerator(data);

  const yScale = scaleLinear()
    .domain([0, max(bins, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const barPadding = 1;
  const xAccessorScaled = (d) => xScale(d.x0) + barPadding / 2;
  const yAccessorScaled = (d) => yScale(yAccessor(d));
  const widthAccessor = (d) =>
    max([0, xScale(d.x1) - xScale(d.x0) - barPadding]);
  const heightAccessor = (d) => dimensions.boundedHeight - yScale(yAccessor(d));
  const xLabelAccessor = (d) =>
    xAccessorScaled(d) + (xScale(d.x1) - xScale(d.x0)) / 2;
  const yLabelAccessor = (d) => yAccessorScaled(d) - 8;
  const meanValue = mean(data, xAccessor);
  const meanValueScaled = xScale(meanValue);

  const ticks = xScale.ticks(thresholds);

  const formatTick = format(".2f");
  return (
    <div ref={ref}>
      <Chart dimensions={dimensions}>
        <Bars
          data={bins}
          dimensions={dimensions}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          widthAccessor={widthAccessor}
          heightAccessor={heightAccessor}
          xLabelAccessor={xLabelAccessor}
          yLabelAccessor={yLabelAccessor}
        />
        <MeanLine dimensions={dimensions} meanValue={meanValueScaled} />
        <Axis
          dimensions={dimensions}
          direction="x"
          scale={xScale}
          label={label}
          ticks={ticks}
          formatTick={formatTick}
        />
      </Chart>
    </div>
  );
};

export default Histogram;
