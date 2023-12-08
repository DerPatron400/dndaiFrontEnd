// AtmosScene.js
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Experience from "./Experience";

export default function AtmosScene() {
  const buttonRef = useRef();
  const [pages, setPages] = useState(5);

  const handleIncreasePages = () => {
    setPages((prevPages) => prevPages + 1);
  };

  return (
    <div className="h-[95vh]">
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={pages} damping={0.3}>
          <Experience
            buttonRef={buttonRef}
            onIncreasePages={handleIncreasePages}
          />
        </ScrollControls>
      </Canvas>
      <div ref={buttonRef}>
        <button
          onClick={handleIncreasePages}
          className="absolute top-[35%] left-[35%] py-2 px-4 bg-black text-white rounded-lg"
        >
          Scroll
        </button>
      </div>
    </div>
  );
}
