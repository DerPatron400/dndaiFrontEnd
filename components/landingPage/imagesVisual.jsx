import React from "react";
import Images from "./images";

export default function imagesVisual() {
  return (
    <div className="border w-full flex flex-col justify-center items-center py-20 text-white">
      <h1 className="headline-1 text-[90px] text-center">
        AN INFINITE WORLD OF VISUALIZATION.
      </h1>
      <div className="flex justify-center items-center w-full">
        <Images />
      </div>
    </div>
  );
}
