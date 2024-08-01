import React from "react";
import CustomRadioButton from "@/components/ui/custom-radio-button";
import { cn } from "@/lib/utils";
import { RACE_GENDER } from "../constants";
import Image from "next/image";

export default function Info({ race, handleSelectRace }) {
  const handleSelect = (gender) => {
    handleSelectRace({ ...race, gender });
  };

  return (
    <div
      className={cn(
        "hidden md:block w-2/5 border bg-white/10 overflow-y-scroll hide-scrollbar border-white/10 rounded-[16px] pb-5 md:max-w-[350px] h-fit max-h-full 2xl:max-w-[467px]",
        !race.name && "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex h-fit flex-col w-full">
        <div className="w-full h-auto relative">
          {race?.name && (
            <Image
              src={`https://dndai-images.s3.eu-central-1.amazonaws.com/race/${race.name
                .toLowerCase()
                .replace(" ", "-")}.webp`}
              alt={race?.name}
              layout="responsive"
              width={500}
              height={300}
              objectFit="contain"
              className="w-full"
            />
          )}
        </div>

        <div className="p-5 pb-0 flex flex-col h-full justify-around gap-4">
          <CustomRadioButton
            options={RACE_GENDER}
            selectedOption={race?.gender}
            className={"flex flex-row flex-wrap"}
            onChange={handleSelect}
          />
          <span className="headline-4">{race?.name}</span>
          <span className="text-gray2 running-text">{race?.description}</span>
        </div>
      </div>
    </div>
  );
}