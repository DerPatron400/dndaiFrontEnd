"use client";
import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

const images = () => {
  const [images, setImages] = useState([]); // Assuming you have an array of images
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const debouncedScroll = useRef(null);

  // Function to load more images
  //   const loadMoreImages = async () => {
  //     setLoading(true);
  //     // Simulate fetching more images
  //     const newImages = await fetchImages(); // Implement fetchImages to fetch new images
  //     setImages((prevImages) => [...prevImages, ...newImages]);
  //     setLoading(false);
  //   };

  // Debounced scroll handler
  useEffect(() => {
    debouncedScroll.current = debounce(() => {
      const container = containerRef.current;
      if (
        container &&
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 200
      ) {
        // loadMoreImages();
        console.log("Loading more images...");
      }
    }, 100);
  }, []);

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
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap justify-center items-center gap-5 border w-full overflow-y-auto"
      style={{ height: "100vh" }}
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="w-1/4 h-2/4 border bg-irisPurpleLight rounded-md"
        >
          <img
            src={"/images/Header.png"}
            alt={`Image ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default images;
