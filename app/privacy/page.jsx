"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Privacy() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="w-screen h-full flex justify-center items-center bg-black">
      <div className="md:w-[70vw] w-[90vw] mx-auto mt-10 mb-10 p-8 h-auto bg-transparent text-white rounded-md shadow-lg font-sans">
        <div data-aos="fade-up">
          <h2 className="text-3xl font-semibold mb-6 flex justify-center items-center text-center">
            <span className="text-white">
              Privacy <span className="text-green-500">Policy</span>
            </span>
          </h2>

          <section>
            <h1 className="text-xl font-medium mb-2">Privacy Policy</h1>
            <hr className="border border-green-500  w-1/3 mb-2" />

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              eget consectetur libero. Integer convallis, lacus vel interdum
              lobortis, massa enim ullamcorper eros, eget ultrices ex tortor eu
              odio. Nulla at quam risus. Sed euismod, magna nec suscipit
              pellentesque, dolor lorem consectetur odio, vel ultricies turpis
              sapien sit amet lacus. In dapibus nisi at sem pulvinar suscipit.
              Morbi nec tellus sem. Phasellus sollicitudin, mauris non vehicula
              efficitur, tortor magna facilisis libero, sit amet fermentum elit
              sapien nec ipsum. Cras eget commodo massa. Sed ut ex bibendum,
              tristique nisi et, vehicula urna. Quisque fringilla turpis velit,
              ut pharetra nulla iaculis sit amet. Nulla facilisi. Morbi a ante
              vel eros tempor aliquet.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
