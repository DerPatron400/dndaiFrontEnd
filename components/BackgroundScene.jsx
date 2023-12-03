import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Navbar from "./navigation/Navbar";
import { Model } from "./threejs/Bird";

export function BackgroundScene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-black z-[1]">
      <div className="fixed top-0 left-0 bg-black w-screen h-screen z-[3] ">
        <Canvas className="z-10">
          <Environment preset="apartment" />
          <Model setLoaded={setLoaded} />
        </Canvas>
      </div>
    </div>
  );
}
