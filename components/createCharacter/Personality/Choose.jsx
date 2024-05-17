import React from "react";

import Card from "./Card";
import { PERSONALITIES } from "../constants";

const _Personality = [
  //name, img, optionArray
  {
    name: "PERSONALITY",
    img: "/images/CreateCharacter/Personality/Frame.png",
    optionArray: PERSONALITIES.personality,
  },
  {
    name: "IDEAL",
    img: "/images/CreateCharacter/Personality/ideal.png",
    optionArray: PERSONALITIES.ideal,
  },
  {
    name: "BOND",
    img: "/images/CreateCharacter/Personality/bond.png",
    optionArray: PERSONALITIES.bond,
  },
  {
    name: "FLAW",
    img: "/images/CreateCharacter/Personality/flaw.png",
    optionArray: PERSONALITIES.flaw,
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
    <div className='md:rounded-[16px]  w-full md:w-full lg:w-4/5 flex flex-col gap-6  h-auto mb-auto md:p-5 md:pt-6  md:border border-white/10 md:bg-white/[8%]  overflow-auto hide-scrollbar'>
      <h1 className='headline-4 hidden md:block'>Personality</h1>

      <div className=' w-full h-full flex justify-between flex-col md:flex-row items-center gap-16 md:gap-5'>
        {_Personality.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            img={`https://dndai-images.s3.eu-central-1.amazonaws.com/personality/${item.name
              .toLowerCase()
              .replaceAll(" ", "-")}.webp`}
            optionArray={item.optionArray}
            handlePersonalityChange={handlePersonalityChange}
            selectedOption={personalities[item.name?.toLowerCase()]}
          />
        ))}
      </div>
    </div>
  );
}
