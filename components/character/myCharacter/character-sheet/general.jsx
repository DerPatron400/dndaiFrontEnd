import { extractSection } from "@/lib/Helpers/shared";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const RenderData = ({ title, data, className, containerClassName }) => {
  return (
    <div
      className={cn(
        " h-full  overflow-hidden py-6 px-5 bg-white/10 border border-white/10 rounded-[16px]",
        className
      )}
    >
      <div className=' flex flex-col gap-6'>
        <span className='headline-4 w-full truncate'>{title}</span>
        <div className={cn("flex flex-col gap-6", containerClassName)}>
          {data.map((item, index) => (
            <div
              key={index}
              className='flex flex-col justify-center items-start gap-4 '
            >
              <span className='text-gray2 description'>{item.key}</span>
              <span className='running-text-mono'>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RenderEquipmentData = ({ value, className, length, index }) => {
  if (value === "") return null;

  return (
    <span
      className={cn(
        "running-text-mono  border-b border-white/10 py-5",
        length % 2 === 0
          ? (index === length - 1 || index === length - 2) && "!pb-0 border-0"
          : index === length - 1 && "!pb-0 border-0",
        className
      )}
    >
      {value}
    </span>
  );
};

const INITIAL_STATE = {
  background: "",
  alignment: "",
  xpPoints: 0,
  personality: "",
  ideal: {
    value: "",
    description: "",
  },
  bond: {
    value: "",
    description: "",
  },
  flaw: {
    value: "",
    description: "",
  },
  hitPoints: 0,
  armorClass: 0,
  gold: 0,
  equipment: [],
  weapon: "",
  secondary: "",
  armor: "",
  toolAndAmmo: "",
};
export default function general({ character }) {
  const [generalInfo, setGeneralInfo] = useState(INITIAL_STATE);

  return (
    <div className='flex flex-col gap-4 md:gap-5 z-[1]'>
      <div className='grid grid-cols-4 md:grid-cols-3 gap-4 md:gap-5 uppercase'>
        <RenderData
          title='General'
          data={[
            {
              key: "gender",
              value: character?.value?.gender || "male",
            },
            {
              key: "background",
              value: character.value.background,
            },
            {
              key: "alignment",
              value: character.value.alignment,
            },
            {
              key: "xp points",
              value: character.value.xp,
            },
          ]}
          className={"col-span-2 md:col-span-1"}
        />
        <RenderData
          title='Personality'
          data={[
            {
              key: "Personality",
              value: character.value.personality_traits.personality_trait,
            },
            {
              key: "Ideal",
              value: character.value.personality_traits.ideal,
              description: "",
            },
            {
              key: "Bond",
              value: character.value.personality_traits.bond,
              description: "",
            },
            {
              key: "Flaw",
              value: character.value.personality_traits.flaw,
              description: "",
            },
          ]}
          className={"col-span-2 md:col-span-1"}
        />

        <RenderData
          title='Defence'
          data={[
            {
              key: "Hit Point",
              value: character.value.hp,
            },
            {
              key: "Armor Class",
              value: character.value.armor_class || character.value.ac,
            },
          ]}
          className={"col-span-4 md:col-span-1"}
          containerClassName='flex-row md:flex-col'
        />
      </div>

      <div className=' h-auto  p-5 pt-6 bg-white/10 border border-white/10 rounded-[16px] uppercase'>
        <div className=' flex flex-col '>
          <div className='flex w-full flex-col gap-4 items-start justify-between '>
            <span className='headline-4'>Inventory</span>
            <div className='w-full grid-cols-2 grid gap-x-5 '>
              <RenderEquipmentData
                value={character.value.gold + " Gold"}
                index={0}
                length={character.value.length + 1}
                className={""}
              />
              {character.value.equipment?.map((item, index) => (
                <RenderEquipmentData
                  key={index}
                  value={item}
                  index={index + 1}
                  length={character.value.equipment.length + 1}
                  className={""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
