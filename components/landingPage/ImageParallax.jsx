"use client";
import React from "react";
import { Parallax } from "react-scroll-parallax";
import useDeviceDetect from "@/hooks/useDviceDetect";

export default function ImageParallax() {
  const { isMobile } = useDeviceDetect();

  return (
    <div className="h-full w-full relative flex flex-col gap-10 md:px-0 px-4 justify-center items-center">
      {!isMobile ? (
        <>
          <h1
            style={{
              mixBlendMode: "difference",
              filter: "invert(0)",
            }}
            className="headline-1 text-center  text-white z-[10]"
          >
            DISCOVER ENDLESS CREATIVE POSSIBILITIES.
          </h1>
          <Parallax
            translateY={5}
            speed={-8}
            tagOuter="figure"
            className=" absolute top-[15%] left-[15%]"
          >
            <img
              src="/parallax/Image1.png"
              alt="Parallax Image 1"
              className="w-24 object-contain !z-[30]"
            />
          </Parallax>
          <Parallax
            translateY={15}
            speed={-10}
            tagOuter="figure"
            className="absolute top-[10%] right-[15%]"
          >
            <img
              src="/parallax/Image2.png"
              alt="Parallax Image 2"
              className="w-80 object-contain"
            />
          </Parallax>
          <Parallax
            translateY={20}
            speed={-10}
            tagOuter="figure"
            className="absolute top-[30%] left-[5%]"
          >
            <img
              src="/parallax/Image3.png"
              alt="Parallax Image 3"
              className="w-64 object-contain"
            />
          </Parallax>
          <Parallax
            translateY={5}
            speed={-10}
            tagOuter="figure"
            className="absolute top-[60%] right-[5%]"
          >
            <img
              src="/parallax/Image4.png"
              alt="Parallax Image 4"
              className="w-96 object-contain"
            />
          </Parallax>
          <Parallax
            translateY={10}
            speed={-8}
            tagOuter="figure"
            className="absolute top-[50%] left-[46%]"
          >
            <img
              src="/parallax/Image5.png"
              alt="Parallax Image 5"
              className="w-32 object-contain z-10"
            />
          </Parallax>
          <Parallax
            translateY={15}
            speed={-10}
            tagOuter="figure"
            className="absolute top-[65%] left-[5%]"
          >
            <img
              src="/parallax/Image6.png"
              alt="Parallax Image 6"
              className="w-48 object-contain"
            />
          </Parallax>
        </>
      ) : (
        <>
          <Parallax
            translateY={15}
            speed={-10}
            tagOuter="figure"
            className="w-full flex justify-start"
          >
            <img
              src="/parallax/Image2.png"
              alt="Parallax Image 2"
              className="w-80 object-contain"
            />
          </Parallax>
          <Parallax
            translateY={15}
            speed={-10}
            tagOuter="figure"
            className="w-full flex justify-end"
          >
            <img
              src="/parallax/Image1.png"
              alt="Parallax Image 1"
              className="w-24 object-contain"
            />
          </Parallax>

          <Parallax
            translateY={15}
            speed={-10}
            tagOuter="figure"
            className="w-full"
          >
            <img
              src="/parallax/Image3.png"
              alt="Parallax Image 3"
              className="w-64 object-contain"
            />
          </Parallax>
          <h1
            style={{
              mixBlendMode: "difference",
              filter: "invert(0)",
            }}
            className="headline-1 md:text-[90px] text-[34px] text-center text-white z-50"
          >
            DISCOVER ENDLESS CREATIVE POSSIBILITIES.
          </h1>
          <Parallax
            translateY={15}
            speed={-10}
            tagOuter="figure"
            className="w-full"
          >
            <img
              src="/parallax/Image5.png"
              alt="Parallax Image 5"
              className="w-32 object-contain z-10"
            />
          </Parallax>
          <Parallax
            translateY={15}
            speed={-10}
            tagOuter="figure"
            className="w-full flex justify-end"
          >
            <img
              src="/parallax/Image6.png"
              alt="Parallax Image 6"
              className="w-48 object-contain"
            />
          </Parallax>
          <Parallax
            translateY={15}
            speed={-10}
            tagOuter="figure"
            className="w-full"
          >
            <img
              src="/parallax/Image4.png"
              alt="Parallax Image 4"
              className="w-96 object-contain"
            />
          </Parallax>
        </>
      )}
    </div>
  );
}
