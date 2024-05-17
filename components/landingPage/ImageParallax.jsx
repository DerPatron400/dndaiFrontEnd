"use client";
import React from "react";
import { Parallax } from "react-scroll-parallax";
import useDeviceDetect from "@/hooks/useDeviceDetect";

export default function ImageParallax() {
  const { isMobile } = useDeviceDetect();

  return (
    <div className="h-full w-[99%] me-auto  relative flex flex-col gap-y-10  px-4 md:px-12 justify-center items-center">
      {!isMobile ? (
        <div className="relative h-full flex items-center justify-center">
          <h1
            style={{
              mixBlendMode: "exclusion",
            }}
            className="headline-1 text-center  text-white z-[10] "
          >
            DISCOVER ENDLESS CREATIVE POSSIBILITIES.
          </h1>

          <Parallax
            translateY={5}
            speed={-8}
            className=" absolute w-1/12 top-[15%] left-[14%]"
          >
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image1.png"
              alt="Parallax Image 1"
              className="w-full object-contain "
            />
          </Parallax>
          <Parallax
            translateY={15}
            speed={-10}
            className="absolute w-3/12 top-[10%] right-[16%]"
          >
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image2.png"
              alt="Parallax Image 2"
              className="w-full object-contain"
            />
          </Parallax>
          <Parallax
            translateY={20}
            speed={-10}
            className="absolute w-3/12 top-[30%] left-0"
          >
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image3.png"
              alt="Parallax Image 3"
              className="w-full object-contain"
            />
          </Parallax>
          <Parallax
            translateY={5}
            speed={-10}
            className="absolute w-4/12 top-[60%] right-[0%]"
          >
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image4.png"
              alt="Parallax Image 4"
              className="w-full object-contain"
            />
          </Parallax>
          <Parallax
            translateY={10}
            speed={-8}
            className="absolute w-2/12 top-[50%] left-[50%]  "
          >
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image5.png"
              alt="Parallax Image 5"
              className="w-full object-contain z-10 translate-x-[-50%]"
            />
          </Parallax>
          <Parallax
            translateY={15}
            speed={-10}
            className="absolute w-2/12 top-[65%] left-[8%]"
          >
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image6.png"
              alt="Parallax Image 6"
              className="w-full object-contain"
            />
          </Parallax>
        </div>
      ) : (
        <div className="relative flex flex-col gap-y-[64px] mt-16">
          <Parallax
            translateY={15}
            speed={-10}
            className="w-full flex justify-start"
          >
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image2.png"
              alt="Parallax Image 2"
              className="w-2/3 object-contain"
            />
          </Parallax>
          <Parallax
            translateY={15}
            speed={-10}
            className="w-full flex justify-end"
          >
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image1.png"
              alt="Parallax Image 1"
              className="w-1/3 object-contain"
            />
          </Parallax>

          <Parallax translateY={15} speed={-10} className="w-full">
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image3.png"
              alt="Parallax Image 3"
              className="w-full object-contain"
            />
          </Parallax>
          <h1
            style={{
              mixBlendMode: "exclusion",
            }}
            className="headline-1 top-[50%] translate-y-[-50%] self-center text-center text-white absolute !z-10"
          >
            DISCOVER ENDLESS CREATIVE POSSIBILITIES.
          </h1>
          <Parallax translateY={15} speed={-10} className="w-full">
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image5.png"
              alt="Parallax Image 5"
              className="w-1/2 object-contain  z-10"
            />
          </Parallax>
          <Parallax
            translateY={15}
            speed={-10}
            className="w-full flex justify-end"
          >
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image6.png"
              alt="Parallax Image 6"
              className="w-1/3 object-contain"
            />
          </Parallax>
          <Parallax translateY={15} speed={-10} className="w-full">
            <img
              style={{
                mixBlendMode: "exclusion",
              }}
              src="/parallax/Image4.png"
              alt="Parallax Image 4"
              className="w-full object-contain"
            />
          </Parallax>
        </div>
      )}
    </div>
  );
}
