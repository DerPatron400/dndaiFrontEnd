"use client";
import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

const Images = () => {
  const [images, setImages] = useState(Array.from({ length: 10 }));
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for right, -1 for left
  const containerRef = useRef(null);
  const debouncedScroll = useRef(null);

  // Function to load more images
  const loadMoreImages = () => {
    const newImages = Array.from({ length: 10 });
    setImages([...images, ...newImages]);
  };

  // Debounced scroll handler
  useEffect(() => {
    debouncedScroll.current = debounce(() => {
      const container = containerRef.current;
      if (
        container &&
        container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 200
      ) {
        loadMoreImages();
      }
    }, 100);
  }, [images]);

  // Add scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", debouncedScroll.current);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", debouncedScroll.current);
      }
    };
  }, [debouncedScroll.current]);

  // Automatic scrolling using requestAnimationFrame
  const autoScroll = () => {
    const container = containerRef.current;
    if (container) {
      // Adjust the speed by changing the value added to scrollLeft
      container.scrollLeft += 1 * scrollDirection; // Smaller value for smoother scrolling

      // Use requestAnimationFrame for smoother animations
      requestAnimationFrame(autoScroll);
    }
  };

  useEffect(() => {
    // Start the autoScroll function
    autoScroll();

    // Cleanup function to stop the animation when the component unmounts
    return () => {
      // Cancel the animation frame request
      window.cancelAnimationFrame(autoScroll);
    };
  }, [scrollDirection]);

  return (
    <div
      ref={containerRef}
      className="grid grid-rows-2 gap-5 w-full overflow-x-hidden py-10"
      style={{ gridAutoFlow: "column" }}
    >
      {images.map((_, index) => (
        <div
          key={index}
          className="w-[300px] h-[300px] bg-irisPurpleLight rounded-md"
        >
          <img
            src={"/images/Header1.png"}
            alt={`Image ${index}`}
            className="w-full h-full object-cover bg-irisPurpleLight rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default Images;
