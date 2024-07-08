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
      <div className=" flex flex-col gap-6">
        <span className="headline-4 w-full truncate">{title}</span>
        <div className={cn("flex flex-col gap-6", containerClassName)}>
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-start gap-4 "
            >
              <span className="text-gray2 description">{item.key}</span>
              <span className="running-text-mono">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RenderEquipmentData = ({ image, title, value }) => {
  return (
    <div className="flex flex-col justify-center items-start w-full">
      <div className="flex w-full gap-4">
        <span className="running-text-mono w-1/2 border-b border-white/10 py-2">
          {title}
        </span>
        <span className="running-text-mono w-1/2 border-b border-white/10 py-2">
          {value}
        </span>
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
  gold: 0,

  weapon: "",
  secondary: "",
  armor: "",
  toolAndAmmo: "",
};
export default function general({ character }) {
  const [generalInfo, setGeneralInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!character) return;

    console.log(character.value, character);

    let _background = extractSection(character.value, "background")?.trim();
    let _alignment = extractSection(character.value, "alignment");
    let _xpPoints = extractSection(character.value, "xp") || 1;
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
      .splice(1) || ["", "", "", ""];
    let _gold = extractSection(character.value, "startingEquipment")
      ?.trim()
      .replaceAll("-", "")
      .split("\n")
      .splice(0);
    let _hitPoints = extractSection(character.value, "hitpoints");
    let _armorClass = extractSection(character.value, "armorclass");
    console.log(_gold[0]);
    setGeneralInfo((prev) => ({
      ...prev,
      background: _background,
      alignment: _alignment || character.general.alignment,
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
      hitPoints: _hitPoints,
      armorClass: _armorClass,
      gold: _gold[0].replace("Gold", "").trim(),
    }));
  }, [character]);
  return (
    <div className="flex flex-col gap-4 md:gap-5 z-[1]">
      <div className="grid grid-cols-4 md:grid-cols-3 gap-4 md:gap-5 uppercase">
        <RenderData
          title="General"
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
          title="Personality"
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
          title="Defence"
          data={[
            {
              key: "Hit Point",
              value: generalInfo.hitPoints,
            },
            {
              key: "Armor Class",
              value: generalInfo.armorClass,
            },
          ]}
          className={"col-span-4 md:col-span-1"}
          containerClassName="flex-row md:flex-col"
        />
      </div>

      <div className=" h-auto  p-5 pt-6 bg-white/10 border border-white/10 rounded-[16px] uppercase">
        <div className=" flex flex-col ">
          <div className="flex w-full items-center justify-between ">
            <span className="headline-4">Inventory</span>
            {/* <div className="flex items-center running-text-small gap-1.5 ">
              {generalInfo.gold}
              <img
                src="/Icons/Gold.svg"
                alt="gold"
                className="h-[18px] object-contain"
              />
            </div> */}
          </div>
          <div className="w-full flex ">
            {/* <RenderEquipmentData
              image="https://dndai-images.s3.eu-central-1.amazonaws.com/equipment/weapon.webp"
              title="Weapon"
              value={generalInfo.weapon}
            /> */}
            {/* <RenderEquipmentData
              image="https://dndai-images.s3.eu-central-1.amazonaws.com/equipment/secondary.webp"
              title="Secondary"
              value={generalInfo.secondary}
            />
            <RenderEquipmentData
              image="https://dndai-images.s3.eu-central-1.amazonaws.com/equipment/armor.webp"
              title="Armor"
              value={generalInfo.armor}
            /> */}
            <RenderEquipmentData
              // image="https://dndai-images.s3.eu-central-1.amazonaws.com/equipment/tool-and-ammo.webp"
              title="Tool & Ammo"
              value={generalInfo.toolAndAmmo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
