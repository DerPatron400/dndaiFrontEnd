import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Experience from "./Experience";
import { ScrollControls } from "@react-three/drei";

export default function AtmosScene() {
  return (
    <div className="h-[95vh]">
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={5} damping={0.3}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
