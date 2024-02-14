"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Script from "next/script";

function Cookies() {
  useEffect(() => {
    AOS.init();
  }, []);

  const handleCookiebotLoadStart = () => {
    console.log("Cookiebot script loading started");
  };

  const handleCookiebotLoad = () => {
    console.log("Cookiebot script loaded successfully");
  };

  const handleCookiebotError = (error) => {
    console.error("Error loading Cookiebot script:", error);
  };

  return (
    <div className='w-screen h-full flex flex-col justify-center items-center bg-black'>
      <div className='relative'>
        <img
          src='/cookie.png'
          alt='Header Image Alt Text'
          className='w-full h-[70vh] object-cover mb-4 rounded-md'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
      </div>
      {/*         
      <Script
        id='Cookiebot'
        src='https://consent.cookiebot.com/uc.js'
        data-cbid='27dc0d94-2824-4194-9303-e668151380fa'
        data-blockingmode='auto'
        type='text/javascript'
      ></Script> */}
      <Script
        id='CookieDeclaration'
        src='https://consent.cookiebot.com/27dc0d94-2824-4194-9303-e668151380fa/cd.js'
        type='text/javascript'
        async
        onLoad={handleCookiebotLoad}
        onError={handleCookiebotError}
        className='absolute top-0'
        dangerouslySetInnerHTML={{
          __html: `this.onloadstart = ${handleCookiebotLoadStart.toString()};`,
        }}
      ></Script>

      <div className='md:w-[70vw] w-[90vw] mx-auto mt-10 mb-10 p-8 h-auto bg-transparent text-white rounded-md shadow-lg font-sans'>
        <div></div>
        <div data-aos='fade-up'>
          <h2 className='text-3xl font-semibold mb-6 flex justify-center items-center text-center'>
            <span className='text-white'>
              Regularly scanned by{" "}
              <span className='text-green-500'>Cookiebot </span>, the
              auto-generated cookie information is located beneath the footer.
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Cookies;
