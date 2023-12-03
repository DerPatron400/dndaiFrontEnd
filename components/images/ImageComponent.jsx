import React, { useEffect } from "react";
import AOS from "aos";

const ImageComponent = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="rounded-lg overflow-hidden p-4" data-aos="fade-up">
      <img
        src="/image.png"
        alt="Your Image Alt Text"
        className="w-full h-[60vh] object-cover"
      />
    </div>
  );
};

export default ImageComponent;
