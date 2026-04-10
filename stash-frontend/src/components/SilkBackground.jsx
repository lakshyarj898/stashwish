import React from "react";
import Silk from "./Silk";

const SilkBackground = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
      }}
    >
      <Silk
        speed={5}
        scale={1}
        color="#7B48F1"
        noiseIntensity={1.5}
        rotation={0}
      />
    </div>
  );
};

export default SilkBackground;
