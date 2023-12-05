import React, { Suspense, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoIosArrowDown } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

const Arrow = () => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to("#downArrow", { duration: 0.5, y: 10 }).to("#downArrow", {
      duration: 0.5,
      y: 0,
    });

    // Hide the arrow when scrolling starts
    gsap.to("#downArrow", {
      scrollTrigger: {
        trigger: "#downArrow",
        start: "top top+=50", // Adjust as needed
        end: "bottom top",
        scrub: true,
      },
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div
      id="downArrow"
      className="absolute flex flex-col justify-center items-center top-[8%] left-[50%] transform -translate-x-1/2 z-[100]"
    >
      <IoIosArrowDown size={40} className="text-green-500" />
      <span className="text-white">Scroll down</span>
    </div>
  );
};

export default Arrow;
