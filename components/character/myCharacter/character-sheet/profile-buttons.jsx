import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import CustomIconbutton from "@/components/ui/custom-iconbutton";
import Sheet from "@/components/ui/Icons/Sheet";
import { extractSection } from "@/lib/Helpers/shared";
import Appearance from "@/components/ui/Icons/Appearance";
import Info from "@/components/ui/Icons/Info";
const INITIAL_STATE = {
  appearance: "",
  abilityScores: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  abbilities: "",
};
export default function ProfileButtons({ details }) {
  const [generalInfo, setGeneralInfo] = useState(INITIAL_STATE);

  useEffect(() => {
    let _apperance = extractSection(details, "appearance")?.trim();
    let _abilities = extractSection(details, "abilities");
    _abilities = _abilities ? _abilities.replaceAll("*", "").trim() : null;

    let _abilityScores = extractSection(details, "abilityscores")
      ?.trim()
      .replaceAll("-", "")
      .split("\n");

    setGeneralInfo((prev) => ({
      ...prev,
      appearance: _apperance,
      abbilities: _abilities,
      abilityScores: {
        strength: _abilityScores[0]?.trim(),
        dexterity: _abilityScores[1]?.trim(),
        constitution: _abilityScores[2]?.trim(),
        intelligence: _abilityScores[3]?.trim(),
        wisdom: _abilityScores[4]?.trim(),
        charisma: _abilityScores[5]?.trim(),
      },
    }));
  }, [details]);

  return (
    <div className='absolute top-4 left-4 w-full flex justify-start gap-4 '>
      <Popover>
        <PopoverTrigger>
          <CustomIconbutton className={" bg-blur"}>
            <Appearance className='h-5 w-5' fill={"#fff"} />
          </CustomIconbutton>
        </PopoverTrigger>
        <PopoverContent className='!p-6 !pt-4 !pe-5 ' side='bottom'>
          <div className='flex flex-col gap-4 '>
            <span className='headline-4'>Appeareance</span>
            <span className='running-text'>{generalInfo?.appearance}</span>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <CustomIconbutton className={" bg-blur"}>
            <Sheet className='h-4.5 w-4.5' fill={"#fff"} />
          </CustomIconbutton>
        </PopoverTrigger>
        <PopoverContent className='!p-6 !pt-4 !pe-5 ' side='bottom'>
          <div className='flex flex-col gap-4 '>
            <span className='headline-4'>Abilitiy Scores</span>
            <div className='flex flex-col justify-start gap-5 w-full'>
              {Object.entries(generalInfo.abilityScores).map(([key, value]) => {
                return (
                  <div
                    className='flex items-center justify-between w-4/4'
                    key={key}
                  >
                    <div
                      key={key}
                      className={`flex cursor-pointer running-text-mono uppercase justify-start items-center gap-3  `}
                    >
                      <img
                        src={`https://dndai-images.s3.eu-central-1.amazonaws.com/abilities/${key}.webp`}
                        className={`w-12 h-12 ease-animate object-cover rounded-[10px] `}
                      />
                      <span>{key}</span>
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='flex items-center gap-2'>
                        <span className='running-text-mono'>{value}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <CustomIconbutton className={" bg-blur"}>
            <Info className='h-4 w-4' fill={"#fff"} />
          </CustomIconbutton>
        </PopoverTrigger>
        <PopoverContent className='!p-6 !pt-4 !pe-5 ' side='bottom'>
          <div className='flex flex-col gap-4 '>
            <span className='headline-4'>Abilities</span>
            <span className='running-text'>{generalInfo?.abbilities}</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
