import React, { Suspense, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpSquare, ArrowDownSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HowToPlay = () => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to("#howToPlay", { duration: 1, y: 10 }).to("#howToPlay", {
      duration: 1,
      y: 0,
    });

    // // Hide the arrow when scrolling starts
    // gsap.to("#howToPlay", {
    //   scrollTrigger: {
    //     trigger: "#howToPlay",
    //     start: "top top+=50", // Adjust as needed
    //     end: "bottom top",
    //     scrub: true,
    //   },
    //   opacity: 0,
    //   y: 20,
    //   duration: 0.8,
    //   ease: "power1.easeInOut",
    // });
  }, []);

  return (
    <div
      id='howToPlay'
      className='fixed flex flex-row gap-x-2 justify-center  items-center top-16 left-[50%] -translate-x-[50%] z-[100]'
    >
      <div className=' hidden md:flex flex-col items-center gap-y-1'>
        <ArrowUpSquare size={28} strokeWidth={1} className='text-green-500' />
        <ArrowDownSquare size={28} strokeWidth={1} className='text-green-500' />
      </div>
      <span className='text-white hidden md:block'>
        Use Up And Down Arrow Key to move
      </span>
      <span className='md:hidden text-white text-sm  w-[80vw]'>
        Use Buttons at bottom left to move dragon forward or backwards
      </span>
    </div>
  );
};

export default HowToPlay;
