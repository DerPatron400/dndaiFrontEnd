import React from "react";
import CustomIconbutton from "./custom-iconbutton";

export default function CustomIconButtonText() {
  return (
    <div className={"flex justify-center items-center gap-2"}>
      <CustomIconbutton className={"border-white"}>
        <img src='/Icons/Check.svg' alt='logo' className='h-5 w-5 invert ' />
      </CustomIconbutton>
      <span className='text-white running-text-mono uppercase'> Text</span>
    </div>
  );
}
