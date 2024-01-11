"use client";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import { MdFullscreen, MdClose } from "react-icons/md";

const ImageComponent = ({ image, key }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <div
      key={key}
      className='relative rounded-lg overflow-hidden p-4 cursor-pointer'
      data-aos='fade-left'
    >
      <img
        src={image}
        alt='Your Image Alt Text'
        className='w-full border-2 border-green-500 h-[60vh] object-cover rounded-md transition-transform duration-300 transform scale-100 hover:scale-105'
        onClick={openFullscreen}
      />

      {isFullscreen && (
        <div className='fixed inset-0  z-50 flex justify-center items-center'>
          <div className='absolute inset-0 bg-black opacity-80'></div>
          <div className='relative max-w-screen-lg max-h-screen overflow-hidden'>
            <img
              src={image}
              alt='Fullscreen Image'
              className='w-full h-full object-cover'
            />
            <div className='absolute top-4 right-4 cursor-pointer'>
              <MdClose
                className='text-black'
                size={34}
                onClick={closeFullscreen}
              />
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className='absolute inset-0 bg-black opacity-0 rounded-md transition-opacity duration-300 hover:opacity-60 flex justify-end items-start'>
        <MdFullscreen
          className='text-green-600 m-4 hover:text-white transition-colors duration-300'
          size={44}
          onClick={openFullscreen}
        />
      </div>
    </div>
  );
};

export default ImageComponent;
