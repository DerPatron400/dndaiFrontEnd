import React, { useEffect, useState } from "react";
import SearchInput from "@/components/ui/search-input";
import CustomRadioButton from "@/components/ui/custom-radio-button";
import { cn } from "@/lib/utils";
import { RACE } from "../constants";
import useCharacterStore from "@/utils/characterStore";

export default function Choose({ race, handleSelectRace }) {
  const { raceQuery, setRaceQuery, setShowModal, setSelectedCharacteristic } =
    useCharacterStore();

  const handleSelect = (gender) => {
    handleSelectRace({ ...race, gender });
  };

  useEffect(() => {
    if (race.name) {
      //focus div with id of this name
      document
        .getElementById(race.name)
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);
  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <div className='md:rounded-[16px] flex flex-col gap-5 w-full md:w-3/5 h-full md:p-5  md:pt-6 md:border md:border-white/10 md:bg-white/[8%]  md:pb-0'>
      {/* For PC */}
      <h1 className='headline-4 hidden md:block'>Race</h1>
      <SearchInput
        query={raceQuery}
        setQuery={setRaceQuery}
        className={"hidden md:block"}
      />
      {/* Ends */}

      {/* For mobile */}
      <CustomRadioButton
        options={["male", "female", "diverse"]}
        className={"flex flex-row flex-wrap md:hidden"}
        onChange={handleSelect}
      />
      {/* Ends */}
      <div className='grid grid-cols-12 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-10 2xl:grid-cols-12 gap-4 md:gap-5 w-full overflow-auto hide-scrollbar md:pb-5'>
        {RACE.filter(({ name }) => {
          if (raceQuery) {
            return name.toLowerCase().includes(raceQuery.toLowerCase());
          }

          return true;
        }).map(({ name, description }, index) => (
          <div
            id={name}
            key={index}
            onClick={() => {
              handleSelectRace({
                ...race,
                name: name,
                description: description,
              });
              setSelectedCharacteristic({
                name,
                image: `https://dndai-images.s3.eu-central-1.amazonaws.com/race/${name
                  .toLowerCase()
                  .replace(" ", "-")}.webp`,
                description: description,
              });
            }}
            className={`flex cursor-pointer col-span-4 md:col-span-4 relative xl:col-span-2 flex-col running-text-mono uppercase justify-start items-start gap-3  `}
          >
            <img
              onClick={handleShowModal}
              src={`/Icons/InfoButton.svg`}
              className={cn(
                `w-6 h-6 left-2 top-[75px] md:hidden ease-animate object-cover absolute`,
                race?.name !== name && "opacity-0 pointer-events-none"
              )}
            />
            <img
              src={`https://dndai-images.s3.eu-central-1.amazonaws.com/race/${name
                .toLowerCase()
                .replace(" ", "-")}.webp`}
              alt={name}
              className={` w-full  h-[107px] md:h-[118px] 2xl:h-[200px] ease-animate object-cover rounded-[10px] ${
                race?.name === name && "border-2 border-irisPurpleLight"
              }`}
            />
            <span className='description'>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
