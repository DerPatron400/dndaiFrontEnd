import React from "react";
import Images from "./images";
import Button from "../ui/custom-button";

export default function imagesVisual() {
  return (
    <div className=' h-full w-screen flex flex-col justify-center items-center text-white md:py-64 py-16 pb-32'>
      <h1 className='headline-1 text-center mb-16 px-12 z-10'>
        AN INFINITE WORLD OF VISUALIZATION.
      </h1>
      <div className='flex flex-col relative gap-6 mb-12 h-[540px] justify-center bg-transparent items-center w-[100%] overflow-hidden'>
        <Images />
      </div>
      <Button>MORE IMAGES</Button>
    </div>
  );
}
