import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import Sheet from "@/components/ui/Icons/Sheet";
import { extractSection } from "@/lib/Helpers/createCharacter";
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

    let _abilityScores = extractSection(details, "abilityscores", true)
      ?.trim()
      .replaceAll("-", "")
      .split("\n");

    setGeneralInfo((prev) => ({
      ...prev,
      appearance: _apperance,
      abbilities: _abilities,
      abilityScores: {
        strength: _abilityScores[0]?.split(":")[1]?.trim(),
        dexterity: _abilityScores[1]?.split(":")[1]?.trim(),
        constitution: _abilityScores[2]?.split(":")[1]?.trim(),
        intelligence: _abilityScores[3]?.split(":")[1]?.trim(),
        wisdom: _abilityScores[4]?.split(":")[1]?.trim(),
        charisma: _abilityScores[5]?.split(":")[1]?.trim(),
      },
    }));
  }, [details]);

  return (
    <div className='absolute top-4 left-4 w-full flex justify-start gap-4 '>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CustomIconbutton className={" bg-blur"}>
              <img src='/icons/Vector.svg' alt='' className='h-3.5 w-3.5' />
            </CustomIconbutton>
          </TooltipTrigger>
          <TooltipContent className='!p-6 !pt-4 !pe-5 ' side='bottom'>
            <div className='flex flex-col gap-4 '>
              <span className='headline-4'>Appeareance</span>
              <span className='running-text'>{generalInfo?.appearance}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CustomIconbutton className={" bg-blur"}>
              <Sheet className='h-3.5 w-3.5' fill={"#fff"} />
            </CustomIconbutton>
          </TooltipTrigger>
          <TooltipContent side='bottom' className='!p-6 !pt-4 !pe-5'>
            <div className='flex flex-col gap-4 '>
              <span className='headline-4'>Abilitiy Scores</span>
              <div className='flex flex-col justify-start gap-5 w-full'>
                {Object.entries(generalInfo.abilityScores).map(
                  ([key, value]) => {
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
                  }
                )}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CustomIconbutton className={" bg-blur"}>
              <img src='/icons/info.svg' alt='' className='h-3.5 w-3.5 ' />
            </CustomIconbutton>
          </TooltipTrigger>
          <TooltipContent side='bottom' className='!p-6 !pt-4 !pe-5'>
            <div className='flex flex-col gap-4 '>
              <span className='headline-4'>Abilities</span>
              <span className='running-text'>{generalInfo?.abbilities}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
