// AtmosScene.js
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Experience from "./Experience";
import GameLoop from "@/components/shared/GameLoop";

export default function AtmosScene() {
  const buttonRef = useRef();
  const [pages, setPages] = useState(2);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [open, setOpen] = useState(false);

  const increaseScroll = () => {
    console.log(document.documentElement.scrollTop);
    const scrollPosition = document.documentElement.scrollTop;
    //buttonRef.current.style.display = "none";
    setPages((prev) => prev + 1);

    document.documentElement.scrollTop = scrollPosition;
  };

  return (
    <div className='relative'>
      <div className='fixed top-0 border left-0 h-[100vh] w-screen'>
        <Canvas>
          <color attach='background' args={["#ececec"]} />

          <Experience
            setShowButton={setShowButton}
            buttonRef={buttonRef}
            setPages={setPages}
            pages={pages}
            setOpen={setOpen}
          />
        </Canvas>

        {/* <div>
          <button
            ref={buttonRef}
            onClick={() => {
              console.log(document.documentElement.scrollTop);
              const scrollPosition = document.documentElement.scrollTop;
              buttonRef.current.style.display = "none";
              setPages((prev) => prev + 1);

              document.documentElement.scrollTop = scrollPosition;
            }}
            className='none top-[50%] left-[50%] fixed translate-x-[-50%] translate-y-[-50%] py-2 px-4 bg-black text-white rounded-lg'
          >
            Scroll
          </button>
        </div> */}
      </div>
      <div
        style={{
          height: `${pages * 100}vh`,
        }}
      ></div>
      <GameLoop open={open} setOpen={setOpen} increaseScroll={increaseScroll} />
    </div>
  );
}
