"use client";
import React, { useEffect } from "react";
import Product from "./Product";
import AOS from "aos";
import "aos/dist/aos.css";

function Shop({ data }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-full mx-auto mb-10 bg-black text-white rounded-md shadow-md font-sans">
      <div className="relative w-full h-[50vh]">
        <img
          src="/shop-bg.png"
          alt="image here"
          className="w-full h-full object-cover"
        />
        <div className="absolute z-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.5em] sm:leading-[2.5em] md:leading-[3.5em] mb-2">
            Welcome to the <span className="text-green-500">DnDAI</span> Shop!
          </h1>
          <p className="text-lg sm:text-xl">
            
          </p>
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        style={{ zIndex: "-1" }}
      ></div>

      <div className="p-4 sm:p-6 lg:p-8 mt-2 sm:mt-4 mb-8 h-auto text-white rounded-md shadow-md">
        <div className="mb-6" data-aos="fade-up" data-aos-delay="700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 md:mb-8 flex justify-center items-center">
            Our <span className="text-green-500 ml-2">Products</span>
          </h2>
          <div className="flex flex-wrap justify-center sm:justify-between">
            {data?.map((product, index) => (
              <div
                key={index}
                className="mb-6"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <Product data={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8 sm:mb-12 lg:mb-16 p-4 sm:p-6 lg:p-8 rounded-md bg-transparent text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4">
            About DnDAI <span className="text-green-500">Credits</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400">
            To maintain the quality of our platform and provide you with a
            seamless experience, we have introduced a system of "Credits"
            available for purchase. Each "Credit" enables you to perform an
            action in the game—whether it's initiating a new game, manually
            saving progress, creating an image, or contributing user input to a
            story. We appreciate your understanding and support as we strive to
            offer you an exceptional and sustainable experience on our platform.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Shop;
