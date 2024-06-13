"use client";
import React, { useState } from "react";

import Choose from "./Choose";

export default function Index({ character, setCharacter }) {
  const handleSetEquipments = (equipment) => {
    setCharacter((prev) => ({
      ...prev,
      equipment,
    }));
  };
  return (
    <div className=' text-white  flex justify-start items-center gap-5 h-full w-full md:h-[652px] xl:h-[500px] 2xl:h-[652px] pb-28 md:pb-0'>
      <Choose
        handleSetEquipments={handleSetEquipments}
        equipments={character.equipment}
      />
    </div>
  );
}
