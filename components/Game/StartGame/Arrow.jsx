import React, { useEffect, useState } from "react";
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
  }, []); // Empty dependency array ensures it runs only once on mount

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check on mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="downArrow"
      className={`absolute flex flex-col justify-center items-center ${
        isMobile ? "top-[8%]" : "top-[8%]"
      } left-[50%] transform -translate-x-1/2 z-[100]`}
    >
      <IoIosArrowDown size={90} className="text-green-500" />
      <span className="text-white">Scroll down</span>
    </div>
  );
};

export default Arrow;
