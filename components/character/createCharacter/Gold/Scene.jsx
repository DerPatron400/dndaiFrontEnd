import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import { Model } from "./D20";

export default function Scene({
  rolling,
  setRolling,
  selectedFace,
  setSelectedFace,
}) {
  return (
    <Canvas>
      <Stage adjustCamera={0.65} shadows={false} environment={"studio"}>
        <ambientLight intensity={0.5} />

        <directionalLight intensity={1} position={[0, 10, 0]} />
        <directionalLight intensity={1} position={[0, -10, 0]} />

        <Model
          selectedFace={selectedFace}
          setSelectedFace={setSelectedFace}
          rolling={rolling}
          setRolling={setRolling}
        />
      </Stage>
    </Canvas>
  );
}
