"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Imprint() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='w-screen min-h-[68vh] flex justify-center items-center bg-black'>
      <div className='md:w-[70vw] w-[90vw] mx-auto mt-10 mb-10 p-8 h-auto bg-transparent text-white rounded-md shadow-lg font-sans'>
        <div data-aos='fade-up'>
          <h2 className='text-3xl font-semibold my-10 flex justify-center items-center text-center'>
            <span className='text-white'>Imprint</span>
          </h2>

          <section>
            <h3 className='text-xl mb-2 font-medium'>Imprint</h3>
            <hr className='border border-green-500  w-1/3 mb-2' />
            <span>
              This website is operated by Alexander Ksela as an individual and
              is not affiliated with any formal business entity. The content on
              this website is Alexander Ksela's personal views and opinions.
              <p>Copyright © 2024 dndai.app. All rights reserved.</p>
            </span>
          </section>
          <hr className='border-t border-green-500 my-6' />

          <section>
            <h3 className='text-xl mb-2 font-medium'>Contact</h3>
            <ul className='list-disc ml-6'>
              <li>Alexander Ksela</li>
              <li>Brockmanngasse 38</li>
              <li>8010 Graz, Austria.</li>
              <li>info@dndai.app</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Imprint;
