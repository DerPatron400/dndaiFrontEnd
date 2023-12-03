import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Model } from "./Bird";
import Loader from "./Loader";
import Form from "./Form";
import Navbar from "../navigation/Navbar";

export default function Scene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-black z-[1] ">
      {/* {loaded && <Navbar />} */}
      <div className="fixed top-0 left-0 bg-black w-screen h-screen overflow-y-scroll z-[3] ">
        <Canvas className="z-10">
          <Suspense fallback={<Loader />}>
            <Environment preset="apartment" />
            <Model setLoaded={setLoaded} />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative h-full w-screen model-trigger overflow-hidden ">
        {loaded && <Form />}
      </div>
    </div>
  );
}
