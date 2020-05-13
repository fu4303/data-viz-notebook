import React from "react";
import "./App.css";
import LineGraph from "./components/LineGraph";
import Gauge from "./components/Gauge";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LineGraph />
        <Gauge value={70} label="test label" units="test units" />
      </header>
    </div>
  );
}

export default App;
