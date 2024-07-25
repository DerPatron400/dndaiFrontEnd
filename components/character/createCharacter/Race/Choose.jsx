import React, { useEffect, useState } from "react";
import SearchInput from "@/components/ui/search-input";
import CustomRadioButton from "@/components/ui/custom-radio-button";
import { cn } from "@/lib/utils";
import { RACE } from "../constants";
import useCharacterStore from "@/utils/characterStore";
import Information from "@/components/ui/Icons/Information";

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
    <div className="md:rounded-[16px] flex flex-col gap-5 w-full md:w-3/5 h-full md:p-5  md:pt-6 md:border md:border-white/10 md:bg-white/[8%] md:pb-0">
      {/* For PC */}
      <h1 className="headline-4 hidden md:block">Race</h1>
      <SearchInput
        query={raceQuery}
        setQuery={setRaceQuery}
        className={"hidden md:block"}
      />
      {/* Ends */}

      {/* For mobile */}
      <CustomRadioButton
        options={["male", "female", "diverse"]}
        selectedOption={race?.gender}
        className={"flex flex-row flex-wrap md:hidden"}
        onChange={handleSelect}
      />
      {/* Ends */}
      <div className="grid grid-cols-12 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-10 2xl:grid-cols-12 gap-4 md:gap-5 w-full overflow-auto hide-scrollbar md:pb-5">
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
            className={`flex cursor-pointer col-span-4 md:col-span-4  xl:col-span-2 flex-col running-text-mono uppercase justify-start items-start gap-3  `}
          >
            <div className="relative w-full  ">
              <img
                src={`https://dndai-images.s3.eu-central-1.amazonaws.com/race/${name
                  .toLowerCase()
                  .replace(" ", "-")}.webp`}
                alt={name}
                className={` w-full relative object-contain ease-animate rounded-[10px] ${
                  race?.name === name && "border-2 border-irisPurpleLight"
                }`}
              />
              <Information
                onClick={handleShowModal}
                src="/Icons/"
                className={cn(
                  "h-6 w-6  left-2 bottom-2 md:hidden ease-animate  absolute ",
                  race?.name !== name && "opacity-0 pointer-events-none"
                )}
              />
            </div>
            <span className="description">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
