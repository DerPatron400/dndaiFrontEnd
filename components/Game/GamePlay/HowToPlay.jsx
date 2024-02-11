import React, { Suspense, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpSquare, ArrowDownSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HowToPlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to("#howToPlay", { duration: 1, y: 10 }).to("#howToPlay", {
      duration: 1,
      y: 0,
    });

    // // Hide the component after 10 seconds
    // const timeoutId = setTimeout(() => {
    //   setIsVisible(false);
    // }, 10000);

    // Cleanup the timeout when the component is unmounted
    // return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          id='howToPlay'
          className='fixed flex flex-row gap-x-2 justify-center  items-center top-16  w-screen   left-0 z-[100]'
        >
          <div className='hidden md:flex flex-col items-center gap-y-1'>
            <ArrowUpSquare
              size={28}
              strokeWidth={1}
              className='text-green-500'
            />
            <ArrowDownSquare
              size={28}
              strokeWidth={1}
              className='text-green-500'
            />
          </div>
          <span className='text-white hidden md:block'>
            Use Up And Down Arrow Key to move
          </span>
          <span className='md:hidden text-white text-sm  w-[80vw]'>
            Use Buttons at bottom left to move dragon forward or backwards
          </span>
        </div>
      )}
    </>
  );
};

export default HowToPlay;
