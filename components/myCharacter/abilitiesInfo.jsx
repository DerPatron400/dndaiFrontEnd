import React from "react";
const _ABILITIES = [
  {
    name: "Strength",
    description:
      "Strength measures physical power and the ability to exert force.",
  },
  {
    name: "Dexterity",
    description: "Dexterity gauges agility, reflexes, and coordination.",
  },
  {
    name: "Constitution",
    description: "Constitution represents health, stamina, and vital force.",
  },
  {
    name: "Intelligence",
    description:
      "Intelligence assesses mental acuity, learning ability, and memory.",
  },
  {
    name: "Wisdom",
    description: "Wisdom evaluates perceptiveness, intuition, and insight.",
  },
  {
    name: "Charisma",
    description:
      "Charisma quantifies charm, social influence, and leadership capability.",
  },
];

export default function abilitiesInfo() {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className=" h-[480px] p-[24px] flex flex-col gap-[16px] justify-start bg-white/10 rounded-[16px]">
        <span className="">Ability scores</span>
        <div className="flex flex-col justify-start gap-5 w-full">
          {_ABILITIES.map((ability, index) => {
            const abilityName = ability.name.toLowerCase();

            return (
              <div
                className="flex items-center justify-between w-4/4"
                key={index}
              >
                <div
                  key={index}
                  className={`flex cursor-pointer running-text-mono uppercase justify-start items-center gap-3  `}
                >
                  <img
                    src={`https://dndai-images.s3.eu-central-1.amazonaws.com/abilities/${abilityName}.webp`}
                    className={`w-12 h-12 ease-animate object-cover rounded-[10px] `}
                  />
                  <span>{abilityName}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="running-text-mono">5</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" h-[224px] p-[24px] uppercase flex flex-col gap-[16px] justify-start bg-white/10 rounded-[16px]">
        <span className="text-lg">Spells</span>
        <ul className="flex flex-col gap-[12px] text-sm">
          <li>Eldritch Blast</li>
          <li>Charm person</li>
          <li>Hex</li>
          <li>Hellish Rebuke</li>
        </ul>
      </div>
    </div>
  );
}
