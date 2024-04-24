import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

const Images = ({ speed, direction }) => {
  const [images, setImages] = useState(Array.from({ length: 10 }));
  const [scrollDirection, setScrollDirection] = useState(direction || 1); // Set initial direction
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
  // const autoScroll = () => {
  //   const container = containerRef.current;
  //   if (container) {
  //     // container.scrollLeft += 1 * speed; // Smaller value for smoother scrolling
  //     // to reverse the direction
  //     console.log("Speed:", speed, "Scroll Direction:", scrollDirection);
  //     container.scrollLeft += 1 * speed * scrollDirection;
  //     console.log(container.scrollLeft);

  //     requestAnimationFrame(autoScroll);
  //   }
  // };

  useEffect(() => {
    let animationId;
    const autoScroll = () => {
      const container = containerRef.current;
      if (container) {
        console.log("Speed:", speed, "Scroll Direction:", scrollDirection);
        container.scrollLeft += 1 * speed * scrollDirection;
        console.log(container.scrollLeft);
        animationId = requestAnimationFrame(autoScroll);
      }
    };
    autoScroll();
    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [scrollDirection, speed]);

  return (
    <div
      ref={containerRef}
      className="grid grid-rows-1 gap-6 w-full overflow-x-hidden"
      style={{ gridAutoFlow: "column" }}
    >
      {images.map((_, index) => (
        <div key={index} className="w-64 h-64 bg-irisPurpleLight rounded-md">
          <div
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
