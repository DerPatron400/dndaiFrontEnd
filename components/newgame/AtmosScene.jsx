// AtmosScene.js
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Experience from "./Experience";
import GameLoop from "@/components/shared/GameLoop";

export default function AtmosScene() {
  const buttonRef = useRef();
  const [pages, setPages] = useState(2);

  const [showButton, setShowButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("text");

  const addToScene = (type) => {
    setType(type);
    setPages((prev) => prev + 1);
  };

  return (
    <div className='relative'>
      <div className='fixed top-0 border left-0 h-[100vh] w-screen'>
        <Canvas>
          <color attach='background' args={["#ececec"]} />

          <Experience pages={pages} setOpen={setOpen} open={open} type={type} />
        </Canvas>
      </div>

      <GameLoop open={open} setOpen={setOpen} addToScene={addToScene} />
    </div>
  );
}
