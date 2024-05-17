"use client";
import React, { useState } from "react";

import Choose from "./Choose";
import Info from "./Info";

export default function Index({ character, setCharacter }) {
  const handleSelectClass = (_class) => {
    setCharacter((prev) => ({
      ...prev,
      class: _class,
    }));
  };

  return (
    <div className=' text-white  flex justify-start items-center gap-5 h-full md:h-[652px]   w-full pb-28 md:pb-0'>
      <Choose _class={character.class} handleSelectClass={handleSelectClass} />
      <Info _class={character.class} />
    </div>
  );
}
