import React from "react";
import Card from "./Card";
import { EQUIPMENTS } from "../constants";
const _Equipment = [
  //name, img, optionArray
  {
    name: "WEAPON",
    img: "/images/CreateCharacter/Equipment/img1.png",
    optionArray: EQUIPMENTS.weapon,
  },
  {
    name: "SECONDARY",
    img: "/images/CreateCharacter/Equipment/img2.png",
    optionArray: EQUIPMENTS.secondaryweapon,
  },
  {
    name: "ARMOR",
    img: "/images/CreateCharacter/Equipment/img3.png",
    optionArray: EQUIPMENTS.armour,
  },
  {
    name: "TOOL & AMMO",
    img: "/images/CreateCharacter/Equipment/img4.png",
    optionArray: EQUIPMENTS["tool&ammo"],
  },
];
export default function Choose({ equipments, handleSetEquipments }) {
  const handleEquipmentChange = (key, value) => {
    handleSetEquipments({
      ...equipments,
      [key]: value,
    });
  };
  return (
    <div className='md:rounded-[16px]  w-full md:w-full lg:w-4/5 flex flex-col gap-6  h-fit max-h-full mb-auto md:p-5 md:pt-6  md:border border-white/10 md:bg-white/[8%]  overflow-auto hide-scrollbar'>
      <h1 className='headline-4 hidden md:block'>Starting Equipment</h1>

      <div className=' w-full h-auto flex justify-between flex-col md:flex-row items-center gap-16 md:gap-5'>
        {_Equipment.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            img={
              `https://dndai-images.s3.eu-central-1.amazonaws.com/equipment/${item.name
                .toLowerCase()
                .replaceAll(" ", "-")
                .replace("&", "and")}.webp` || item.img
            }
            optionArray={item.optionArray}
            handleEquipmentChange={handleEquipmentChange}
            selectedOption={
              equipments[item.name?.toLowerCase().replaceAll(" ", "")]
            }
          />
        ))}
      </div>
    </div>
  );
}
