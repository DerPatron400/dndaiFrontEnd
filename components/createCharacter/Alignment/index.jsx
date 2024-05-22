"use client";
import React, { useState } from "react";

import Choose from "./Choose";
import Info from "./Info";

export default function Index({ character, setCharacter }) {
  const handleAlignmentChange = (alignment, description) => {
    setCharacter((prev) => ({
      ...prev,
      alignment,
      description,
    }));
  };
  return (
    <div className=" text-white  flex justify-start items-center gap-5 h-[652px]   w-full pb-28 md:pb-0 ">
      <Choose
        handleAlignmentChange={handleAlignmentChange}
        alignment={character.alignment}
      />
      <Info
        alignment={character.alignment}
        description={character.description}
      />
    </div>
  );
}
