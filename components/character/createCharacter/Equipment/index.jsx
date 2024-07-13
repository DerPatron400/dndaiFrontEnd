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
    <div className=' text-white  flex justify-start items-center gap-5 h-full w-full  pb-28 md:pb-0'>
      <Choose
        handleSetEquipments={handleSetEquipments}
        equipments={character.equipment}
      />
    </div>
  );
}
