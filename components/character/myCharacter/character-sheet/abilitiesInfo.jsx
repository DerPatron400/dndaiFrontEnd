import { extractSection } from "@/lib/Helpers/shared";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
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

export default function abilitiesInfo({ character }) {
  const [spells, setSpells] = useState([]);
  const [additionalNotes, setAdditionalNotes] = useState();
  useEffect(() => {
    let _spells = extractSection(character.value, "spells");
    _spells = _spells ? _spells.replaceAll("-", "").trim().split("\n") : null;
    setSpells(_spells);
    let _addtionalNotes = extractSection(
      character.value,
      "additionalNotes"
    )?.trim();
    setAdditionalNotes(_addtionalNotes);
  }, [character]);

  return (
    <div className='flex flex-col gap-5 z-[1]'>
      <div className=' h-auto p-5 pt-6  flex flex-col gap-4 justify-start bg-white/10 rounded-[16px] border border-white/10'>
        <span className='headline-4'>Additional Notes</span>
        <span className='running-text text-gray2'>{additionalNotes}</span>
      </div>
      <div
        className={cn(
          " h-auto p-6 px-5 uppercase flex flex-col gap-6 justify-start bg-white/10 rounded-[16px] border border-white/10",
          spells?.length === 0 && "hidden"
        )}
      >
        <span className='headline-4'>Spells</span>
        <ul className='flex running-text-mono flex-col gap-6 '>
          {spells?.map((spell, index) => (
            <li key={index}>{spell}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
