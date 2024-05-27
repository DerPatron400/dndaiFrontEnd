"use client";
import React, { useState } from "react";

import Choose from "./Choose";

export default function Index({ character, setCharacter }) {
  const handleChangeAbilities = (abilities) => {
    setCharacter((prev) => ({
      ...prev,
      abilities,
    }));
  };

  return (
    <div className=' text-white  flex justify-start items-center gap-5 h-full  w-full'>
      <Choose
        abilities={character.abilities}
        _pointsToSpend={character.pointsToSpend}
        handleChangeAbilities={handleChangeAbilities}
      />
    </div>
  );
}
