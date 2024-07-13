"use client";
import React, { useState } from "react";

import Choose from "./Choose";

export default function Index({ character, setCharacter }) {
  const handleSetPersonality = (personality) => {
    setCharacter((prev) => ({
      ...prev,
      personality,
    }));
  };

  return (
    <div className=' text-white  flex justify-start items-center gap-5 h-full  w-full pb-28 md:pb-0'>
      <Choose
        handleSetPersonality={handleSetPersonality}
        personalities={character.personality}
      />
    </div>
  );
}
