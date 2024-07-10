import React from "react";

const NavMenu = ({ menu }) => {
  return (
    <div className='w-auto md:w-1/2 lg:w-1/4 p-2 flex flex-col gap-9 z-10 '>
      <h3 className='  text-irisPurpleLight running-text-mono '>
        {menu.heading}
      </h3>
      <ul className='flex flex-col gap-4'>
        {menu.navlinks.map((link, index) => (
          <li key={index}>
            <a
              href='#'
              className='text-white ease-animate hover:text-gray2  running-text'
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default function Footer() {
  return (
    <footer className='bg-russianViolet w-full  text-white pt-0 pb-16 md:px-12 px-5  md:py-16 '>
      <div className=' w-full'>
        <div className='w-full md:w-1/2 flex flex-wrap md:gap-8 gap-3 gap-y-12 justify-between '>
          {/* Help and Support Section */}
          <NavMenu
            menu={{
              heading: "HELP AND SUPPORT",
              navlinks: ["Contact Us", "FAQ", "How To Play"],
            }}
          />
          <NavMenu
            menu={{
              heading: "LEGAL",
              navlinks: ["Imprint", "Terms and Service", "Privacy"],
            }}
          />
          <NavMenu
            menu={{
              heading: " SOCIAL MEDIA",
              navlinks: ["Discord", "Twitter"],
            }}
          />
        </div>
        {/* Copyright Notice */}
        <div className='text-left  relative !z-10 mt-14 running-text-mono '>
          <p className='z-10 text-white'>DND AI © 2024 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
