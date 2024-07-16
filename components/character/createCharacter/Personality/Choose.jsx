import React from "react";

import Card from "./Card";
import { PERSONALITIES } from "../constants";

const _Personality = [
  // Personality Trait
  {
    name: "PERSONALITY",
    img: "/images/CreateCharacter/Personality/Frame.png",
    optionArray: PERSONALITIES.personality,
    description:
      "A distinct characteristic or habit that defines how a character behaves or interacts with others.",
  },
  // Ideal
  {
    name: "IDEAL",
    img: "/images/CreateCharacter/Personality/ideal.png",
    optionArray: PERSONALITIES.ideal,
    description:
      "A core belief or value that drives a character's actions and decisions.",
  },
  // Bond
  {
    name: "BOND",
    img: "/images/CreateCharacter/Personality/bond.png",
    optionArray: PERSONALITIES.bond,
    description:
      "A deep connection or commitment to a person, place, group, or cause that a character feels strongly about.",
  },
  // Flaw
  {
    name: "FLAW",
    img: "/images/CreateCharacter/Personality/flaw.png",
    optionArray: PERSONALITIES.flaw,
    description:
      "A weakness or shortcoming that can lead to a character's downfall or create complications.",
  },
];

export default function Choose({ handleSetPersonality, personalities }) {
  const handlePersonalityChange = (key, value) => {
    handleSetPersonality({
      ...personalities,
      [key]: value,
    });
  };
  return (
    <div className='md:rounded-[16px]  w-full md:w-full lg:w-4/5 flex flex-col gap-6  h-fit max-h-full  md:p-5 md:pt-6  md:border border-white/10 md:bg-white/[8%]  overflow-y-scroll hide-scrollbar'>
      <h1 className='headline-4 hidden md:block'>Personality</h1>

      <div className=' w-full h-auto flex justify-between flex-col md:flex-row items-center gap-16 md:gap-5'>
        {_Personality.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            img={`https://dndai-images.s3.eu-central-1.amazonaws.com/personality/${item.name
              .toLowerCase()
              .replaceAll(" ", "-")}.webp`}
            optionArray={item.optionArray}
            tooltip={item.description}
            handlePersonalityChange={handlePersonalityChange}
            selectedOption={personalities[item.name?.toLowerCase()]}
          />
        ))}
      </div>
    </div>
  );
}
