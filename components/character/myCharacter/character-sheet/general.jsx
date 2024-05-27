import { extractSection } from "@/lib/Helpers/createCharacter";
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

const RenderEquipmentData = ({ image, title, value }) => {
  return (
    <div className='flex col-span-1 flex-col justify-center items-start gap-3'>
      <img src={image} alt='' className='h-[153px] w-[153px] rounded-[10px]' />

      <div className='flex flex-col gap-4 '>
        <span className='text-gray2 description'>{title}</span>
        <span className='running-text-mono'>{value}</span>
      </div>
    </div>
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

  weapon: "",
  secondary: "",
  armor: "",
  toolAndAmmo: "",
};
export default function general({ character }) {
  const [generalInfo, setGeneralInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!character) return;

    let _background = extractSection(character.value, "background")?.trim();
    let _alignment = extractSection(character.value, "alignment");
    let _xpPoints = extractSection(character.value, "xp points") || 0;
    let _personality = extractSection(character.value, "personality").split(
      ","
    )[0];
    let _ideal = extractSection(character.value, "ideal").split("-");
    let _bond = extractSection(character.value, "bond").split("-");
    let _flaw = extractSection(character.value, "flaw").split("-");
    let _equipment = extractSection(character.value, "startingEquipment")
      ?.trim()
      .replaceAll("-", "")
      .split("\n")
      .splice(1);
    // let _hitPoints = extractSection(character.value, "hit point");
    // let _armorClass = extractSection(character.value, "armor class");

    setGeneralInfo((prev) => ({
      ...prev,
      background: _background,
      alignment: _alignment,
      xpPoints: _xpPoints,
      personality: _personality,
      ideal: {
        value: _ideal[0],
        description: _ideal[1],
      },
      bond: {
        value: _bond[0],
        description: _bond[1],
      },
      flaw: {
        value: _flaw[0],
        description: _flaw[1],
      },
      weapon: _equipment[0]?.split("(")[0].trim(),
      secondary: _equipment[1]?.split("(")[0].trim(),
      armor: _equipment[2]?.split("(")[0].trim(),
      toolAndAmmo: _equipment[3]?.split("(")[0].trim(),
    }));
  }, [character]);
  return (
    <div className='flex flex-col gap-4 md:gap-5'>
      <div className='grid grid-cols-4 md:grid-cols-3 gap-4 md:gap-5 uppercase'>
        <RenderData
          title='General'
          data={[
            {
              key: "gender",
              value: character?.personal?.gender || "male",
            },
            {
              key: "background",
              value: generalInfo.background,
            },
            {
              key: "alignment",
              value: generalInfo.alignment,
            },
            {
              key: "xp points",
              value: generalInfo.xpPoints,
            },
          ]}
          className={"col-span-2 md:col-span-1"}
        />
        <RenderData
          title='Personality'
          data={[
            {
              key: "Personality",
              value: generalInfo.personality,
            },
            {
              key: "Ideal",
              value: generalInfo.ideal.value,
              description: generalInfo.ideal.description,
            },
            {
              key: "Bond",
              value: generalInfo.bond.value,
              description: generalInfo.bond.description,
            },
            {
              key: "Flaw",
              value: generalInfo.flaw.value,
              description: generalInfo.flaw.description,
            },
          ]}
          className={"col-span-2 md:col-span-1"}
        />
        <RenderData
          title='Defence'
          data={[
            {
              key: "Hit Point",
              value: "140",
            },
            {
              key: "Armor Class",
              value: "61",
            },
          ]}
          className={"col-span-4 md:col-span-1"}
          containerClassName='flex-row md:flex-col'
        />
      </div>

      <div className=' h-auto  p-5 pt-6 bg-white/10 border border-white/10 rounded-[16px] uppercase'>
        <div className=' flex flex-col gap-5'>
          <span className='headline-4'>Equipment</span>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
            <RenderEquipmentData
              image='https://dndai-images.s3.eu-central-1.amazonaws.com/equipment/weapon.webp'
              title='Weapon'
              value={generalInfo.weapon}
            />
            <RenderEquipmentData
              image='https://dndai-images.s3.eu-central-1.amazonaws.com/equipment/secondary.webp'
              title='Secondary'
              value={generalInfo.secondary}
            />
            <RenderEquipmentData
              image='https://dndai-images.s3.eu-central-1.amazonaws.com/equipment/armor.webp'
              title='Armor'
              value={generalInfo.armor}
            />
            <RenderEquipmentData
              image='https://dndai-images.s3.eu-central-1.amazonaws.com/equipment/tool-and-ammo.webp'
              title='Tool & Ammo'
              value={generalInfo.toolAndAmmo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
