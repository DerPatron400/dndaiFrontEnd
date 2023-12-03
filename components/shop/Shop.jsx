import React, { useEffect } from "react";
import Product from "./Product";
import AOS from "aos";
import "aos/dist/aos.css";

function Shop() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='w-full mx-auto mt-10 mb-10 h-auto bg-black text-white rounded-md shadow-md font-sans'>
      <div className='relative w-screen h-[50vh]'>
        <img
          src='/shop-bg.jpg'
          alt='image here'
          className='w-full h-full object-cover'
          style={{ position: "absolute", zIndex: "1" }}
        />
        <div className='absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 text-center text-white z-10'>
          <h1 className='text-[3rem] font-bold leading-[4.5rem]'>
            Welcome to the <span className='text-green-500 '>DnDAI</span> Shop!
          </h1>
          <p className='text-lg'>
            Explore our exclusive products and enhance your DnDAI experience.
          </p>
        </div>
      </div>
      <div
        className='absolute top-0 left-0 w-full h-full bg-black opacity-50'
        style={{ zIndex: "-1" }}
      ></div>

      <div className='flex justify-center items-center'>
        <div className='p-6 w-[100%] mt-4 mb-10 h-auto bg-transparent text-white rounded-md shadow-md'>
          <div className='mb-6' data-aos='fade-up' data-aos-delay='700'>
            <h2 className='text-4xl font-semibold mb-10 flex justify-center items-center '>
              Our <span className='text-green-500 ml-2'>Products</span>
            </h2>
            <div className='flex flex-wrap justify-between'>
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className='mb-6'
                  data-aos='fade-up'
                  data-aos-delay={100}
                >
                  <Product />
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-center items-center mt-10'>
            {" "}
            <div
              className='mb-8 p-6 rounded-md boxshadow-lg w-[80%] text-center'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <h2 className='text-3xl font-semibold text-white mb-4'>
                About DnDAI <span className='text-green-500'>Credits</span>
              </h2>
              <p className='text-gray-400'>
                To maintain the quality of our platform and provide you with a
                seamless experience, we have introduced a system of "Credits"
                available for purchase. Each "Credit" enables you to perform an
                action in the game—whether it's initiating a new game, manually
                saving progress, creating an image, or contributing user input
                to a story. We appreciate your understanding and support as we
                strive to offer you an exceptional and sustainable experience on
                our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
