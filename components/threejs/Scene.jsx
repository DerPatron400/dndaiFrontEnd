import React, { Suspense, useState, useEffect } from "react";
import Form from "./Form";
import DownArrow from "./Arrow";
import { BackgroundScene } from "../BackgroundScene";

export default function Scene() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="bg-black z-[1] relative">
      <BackgroundScene setLoaded={setLoaded} />
      <div className="relative h-full w-screen model-trigger overflow-hidden ">
        {loaded && <Form />}
        <DownArrow />
      </div>
    </div>
  );
}
