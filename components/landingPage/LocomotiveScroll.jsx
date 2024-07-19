import React, { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
export default function LocomotiveScrollInitiate({ scrollRef, locoScrollRef }) {
  useEffect(() => {
    if (scrollRef.current) {
      locoScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        // Add other Locomotive Scroll options here
      });
    }

    return () => {
      if (locoScrollRef.current) {
        locoScrollRef.current.destroy();
        locoScrollRef.current = null;
      }
    };
  }, [scrollRef.current]);
  return null;
}
