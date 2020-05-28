import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
// import Gauge from "./components/Gauge";
import { dataset } from "./data/weather";

function App() {
  const [data, setData] = useState(dataset);

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Dashboard data={data} />
        {/* <Gauge value={70} label="test label" units="test units" /> */}
      </main>
    </div>
  );
}

export default App;
