import "./App.css";
import Canvas from "./canvas";

import { useState } from "react";

function App() {
  const [rotation, setRotation] = useState(0);
  const [distance, setDistance] = useState(5);
  const [cameraFOV, setFOV] = useState(120);
  return (
    <div className="App">
      <Canvas
        width="1000"
        height="600"
        cameraRotation={rotation}
        distance={distance}
        cameraFOV={cameraFOV}
      ></Canvas>
      <div className="Options" style={{ marginTop: "40px" }}>
        <label>Rotation from center (Degrees)</label>
        <input
          type="text"
          value={rotation}
          onChange={(e) => {
            setRotation(e.target.value);
          }}
        ></input>
        <label>Distance from center (Inches)</label>
        <input
          type="text"
          value={distance}
          onChange={(e) => {
            setDistance(e.target.value);
          }}
        ></input>
        <label>Camera FOV in deg</label>
        <input
          type="text"
          value={cameraFOV}
          onChange={(e) => {
            setFOV(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
}

export default App;
