import React from "react";
import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html
      className='absolute top-0 left-0 bg-black !z-[10] w-screen h-screen flex items-center justify-center'
      center
    >
      <div className='text-white absolute top-0 left-0 text-2xl h-screen w-screen bg-red flex items-center justify-center z-[10]'>
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}
