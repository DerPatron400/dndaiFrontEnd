import React from "react";
import Images from "./images";
import Button from "../ui/custom-button";

export default function imagesVisual() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-white md:py-64 py-32">
      <h1 className="headline-1 text-center mb-16">
        AN INFINITE WORLD OF VISUALIZATION.
      </h1>
      <div className="flex flex-col gap-6 mb-12 justify-center items-center w-full">
        <Images key="leftToRight" speed={2} direction={1} />
        <Images key="rightToLeft" speed={2} direction={-1} />
      </div>
      <Button>MORE IMAGES</Button>
    </div>
  );
}
