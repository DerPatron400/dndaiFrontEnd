"use client";
import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import useMeasure from "react-use-measure";
import { animate, useMotionValue, motion } from "framer-motion";
import { cn } from "@/lib/utils";
const Images = ({ direction }) => {
  const [images, setImages] = useState(Array.from({ length: 7 }));
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for right, -1 for left
  const containerRef = useRef(null);
  const [ref, { width }] = useMeasure();
  const [_ref, { width: _width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const _xTranslation = useMotionValue(0);

  // // Automatic scrolling using requestAnimationFrame
  // const autoScroll = () => {
  //   const container = containerRef.current;
  //   if (container) {
  //     console.log("scrolling");
  //     // Adjust the speed by changing the value added to scrollLeft
  //     container.scrollLeft -= 1; // Smaller value for smoother scrolling
  //     // console.log(container.scrollLeft);
  //     //scroll right

  //     // Use requestAnimationFrame for smoother animations
  //   }
  //   requestAnimationFrame(autoScroll);
  // };

  // useEffect(() => {
  //   // Start the autoScroll function
  //   autoScroll();

  //   // Cleanup function to stop the animation when the component unmounts
  //   return () => {
  //     // Cancel the animation frame request
  //     window.cancelAnimationFrame(autoScroll);
  //   };
  // }, []);

  useEffect(() => {
    let controls;

    let finalPosition = -width / 2 - 12;

    controls = animate(xTranslation, [0, finalPosition], {
      duration: 24,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
      ease: "linear",
    });

    return () => controls.stop();
  }, [xTranslation, width]);

  useEffect(() => {
    let controls;

    let finalPosition = -width / 2 - 12;

    controls = animate(_xTranslation, [0, -finalPosition], {
      duration: 24,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
      ease: "linear",
    });

    return () => controls.stop();
  }, [_xTranslation, _width]);

  return (
    <main className='max-w-screen w-screen !overflow-x-hidden'>
      <motion.div
        style={{ x: xTranslation }}
        ref={ref}
        className={cn(
          " flex absolute top-0 left-0 gap-6 w-auto overflow-x-hidden "
        )}
      >
      {[...images, ...images].map((_, index) => (
        <div
          key={index}
          className='min-w-64 w-64 h-64 bg-irisPurpleLight rounded-md'
        >
          <img
            src={`/images/Marquee/rowUpper${index + 1}.png`} 
            alt={`Image ${index}`}
            className='w-full h-full object-cover bg-irisPurpleLight rounded-md'
          />
        </div>
      ))}
      </motion.div>
      <motion.div
        style={{ x: _xTranslation }}
        ref={_ref}
        className={cn(
          " flex absolute right-0 flex-row-reverse top-[280px] gap-6 w-auto overflow-x-hidden "
        )}
        // style={{
        //   gridAutoFlow: "column",
        //   transformOrigin: "center",
        //   // scrollBehavior: "smooth",
        //   // direction
        //   //direction: "rtl",
        // }}
      >
        {[...images, ...images].map((_, index) => (
        <div
        key={index}
        className='min-w-64 w-64 h-64 bg-irisPurpleLight rounded-md'
      >
        <img
          src={`/images/Marquee/rowLower${index + 1}.png`} 
          alt={`Image ${index}`}
          className='w-full h-full object-cover bg-irisPurpleLight rounded-md'
        />
      </div>
        ))}
      </motion.div>
    </main>
  );
};

export default Images;
