import React from "react";
import { timeParse } from "d3";
import Histogram from "./Histogram";
import Scatterplot from "./Scatterplot";
import LineGraph from "./LineGraph";

const dateParser = timeParse("%Y-%m-%d");

const humidityAccessor = (d) => d.humidity;
const lengthAccessor = (d) => d.length;
const dateAccessor = (d) => dateParser(d.date);
const temperatureAccessor = (d) => d.temperatureMax;
const dewPointAccessor = (d) => d.dewPoint;
const cloudAccessor = (d) => d.cloudCover;

const Dashboard = ({ data }) => {
  return (
    <div className="dashboard">
      <Histogram
        data={data}
        xAccessor={humidityAccessor}
        yAccessor={lengthAccessor}
        label="Humidity"
      />
      <Scatterplot
        data={data}
        xAccessor={dewPointAccessor}
        yAccessor={humidityAccessor}
        colorAccessor={cloudAccessor}
        label="label goes here"
      />
      <LineGraph
        data={data}
        xAccessor={dateAccessor}
        yAccessor={temperatureAccessor}
        label="Max temperature"
      />
    </div>
  );
};

export default Dashboard;
