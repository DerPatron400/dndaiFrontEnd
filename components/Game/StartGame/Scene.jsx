import React, { Suspense, useState, useEffect } from "react";
import Form from "./Form";
import DownArrow from "./Arrow";
import { BackgroundScene } from "../../shared/BackgroundScene";

export default function Scene() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className='z-[1] relative'>
      <BackgroundScene setLoaded={setLoaded} loaded={loaded} />
      <div className='relative h-full w-screen model-trigger overflow-hidden '>
        {loaded && <Form />}
        <DownArrow />
      </div>
    </div>
  );
}
