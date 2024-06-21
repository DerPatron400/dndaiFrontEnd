"use client";
import React, { useState } from "react";

import Choose from "./Choose";
import Info from "./Info";

export default function Index({ character, setCharacter }) {
  const handleAlignmentChange = (alignment) => {
    setCharacter((prev) => ({
      ...prev,
      alignment,
    }));
  };
  return (
    <div className=' text-white  flex justify-start items-center gap-5 md:h-[652px] xl:h-[500px] 2xl:h-[652px] max-h-fit   w-full pb-28 md:pb-0 '>
      <Choose
        handleAlignmentChange={handleAlignmentChange}
        alignment={character.alignment}
      />
      <Info alignment={character.alignment} />
    </div>
  );
}
