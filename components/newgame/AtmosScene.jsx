// AtmosScene.js
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Experience from "./Experience";

export default function AtmosScene() {
  const buttonRef = useRef();
  const [pages, setPages] = useState(2);
  const [scrollPosition, setScrollPosition] = useState(0);
  return (
    <div className=''>
      <div className='fixed top-0 border left-0 h-[100vh] w-screen'>
        <Canvas>
          <color attach='background' args={["#ececec"]} />

          <Experience buttonRef={buttonRef} setPages={setPages} pages={pages} />
        </Canvas>
      </div>
      <div
        style={{
          height: `${pages * 100}vh`,
        }}
      ></div>
      {/* <div ref={buttonRef}>
        <button
          onClick={handleIncreasePages}
          className='absolute top-[35%] left-[35%] py-2 px-4 bg-black text-white rounded-lg'
        >
          Scroll
        </button>
      </div> */}
    </div>
  );
}
