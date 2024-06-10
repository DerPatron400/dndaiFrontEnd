import React from "react";
import CustomRadioButton from "@/components/ui/custom-radio-button";
import { cn } from "@/lib/utils";
import { RACE_GENDER } from "../constants";

export default function Info({ race, handleSelectRace }) {
  const handleSelect = (gender) => {
    handleSelectRace({ ...race, gender });
  };
  return (
    <div
      className={cn(
        "hidden md:block w-2/5 h-full border bg-white/10 border-white/10 rounded-[16px] overflow-y-scroll pb-6 hide-scrollbar md:max-h-[652px] md:max-w-[467px] ",
        !race.name && "opacity-0 pointer-events-none"
      )}
    >
      <div className='flex h-full flex-col w-full'>
        <div className='w-full h-[440px]'>
          <img
            src={` https://dndai-images.s3.eu-central-1.amazonaws.com/race/${race?.name
              .toLowerCase()
              .replace(" ", "-")}.webp`}
            alt={race?.name}
            className='h-full object-cover w-full '
          />
        </div>

        <div className='p-4 flex flex-col justify-around gap-4 '>
          <CustomRadioButton
            options={RACE_GENDER}
            selectedOption={race?.gender}
            className={"flex flex-row flex-wrap "}
            onChange={handleSelect}
          />
          <span className='headline-4'>{race?.name}</span>
          <span className='text-gray2 running-text '>{race?.description}</span>
        </div>
      </div>
    </div>
  );
}
