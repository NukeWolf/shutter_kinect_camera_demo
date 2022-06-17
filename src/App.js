import "./App.css";
import Canvas from "./canvas";

import { useState } from "react";

function App() {
  const [rotation, setRotation] = useState(0);
  const [distance, setDistance] = useState(5);
  const [cameraFOV, setFOV] = useState(120);
  const [cameraDepth, setCameraDepth] = useState(87);
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div className="App">
      <Canvas
        width="1000"
        height="600"
        cameraRotation={rotation}
        distance={distance}
        cameraFOV={cameraFOV}
        cameraDepth={cameraDepth}
        originalCamera={showCamera}
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
        <br />
        <label>Distance from center (Inches)</label>
        <input
          type="text"
          value={distance}
          onChange={(e) => {
            setDistance(e.target.value);
          }}
        ></input>
        <br />

        <label>Camera FOV in deg</label>
        <input
          type="text"
          value={cameraFOV}
          onChange={(e) => {
            setFOV(e.target.value);
          }}
        ></input>
        <br />

        <label>Camera Depth in Inches</label>
        <input
          type="text"
          value={cameraDepth}
          onChange={(e) => {
            setCameraDepth(e.target.value);
          }}
        ></input>
        <br />
        <label>Show Original Camera?</label>
        <input
          type="checkbox"
          onChange={(e) => {
            setShowCamera(!showCamera);
          }}
        />
      </div>
    </div>
  );
}

export default App;
