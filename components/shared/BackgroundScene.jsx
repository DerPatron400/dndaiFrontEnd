// BackgroundScene.js

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Model } from "../StartGame/Bird";
import Loader from "../StartGame/Loader";

export function BackgroundScene({ setLoaded }) {
  return (
    <div className='fixed top-0 left-0 bg-black w-screen h-screen z-[3]'>
      <Canvas className='z-10'>
        <Suspense fallback={<Loader />}>
          <Environment preset='apartment' />
          <Model setLoaded={setLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
}
