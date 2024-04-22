import React from "react";
import Images from "./images";
import { Button } from "../ui/button";

export default function imagesVisual() {
  return (
    <div className=" w-full flex flex-col justify-center items-center py-20 text-white">
      <h1 className="headline-1 md:text-[90px] text-[34px] text-center">
        AN INFINITE WORLD OF VISUALIZATION.
      </h1>
      <div className="flex justify-center items-center w-full">
        <Images />
      </div>
      <Button className="mt-10 py-2 px-10 font-roboto-mono font-semibold">
        MORE IMAGES
      </Button>
    </div>
  );
}
