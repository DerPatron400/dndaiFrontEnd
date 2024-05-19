"use client";
import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import useMeasure from "react-use-measure";
import { animate, useMotionValue, motion } from "framer-motion";
import { cn } from "@/lib/utils";
const Images = ({ direction }) => {
  const [images, setImages] = useState(Array.from({ length: 14 }));
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for right, -1 for left
  const containerRef = useRef(null);
  const [ref, { width }] = useMeasure();
  const [_ref, { width: _width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const _xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;

    let finalPosition = -width / 2 - 12;

    controls = animate(xTranslation, [0, finalPosition], {
      duration: 34,
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
      duration: 34,
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
            className='min-w-64 w-64 h-64 bg-transparent rounded-md'
          >
            <img
              src={`https://dndai-images.s3.eu-central-1.amazonaws.com/marquee/rowLower${
                index + 1
              }.webp`}
              alt={`Image ${index}`}
              className='w-full h-full object-cover bg-transparent rounded-md'
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
      >
        {[...images, ...images].map((_, index) => (
          <div
            key={index}
            className='min-w-64 w-64 h-64 bg-transparent rounded-md'
          >
            <img
              src={`https://dndai-images.s3.eu-central-1.amazonaws.com/marquee/rowUpper${
                index + 1
              }.webp`}
              alt={`Image ${index}`}
              className='w-full h-full object-cover bg-transparent rounded-md'
            />
          </div>
        ))}
      </motion.div>
    </main>
  );
};

export default Images;
