import React, { useState, useEffect } from "react";
import SearchInput from "@/components/ui/search-input";
import { cn } from "@/lib/utils";
import { BACKGROUND } from "../constants";
import useCharacterStore from "@/utils/characterStore";

export default function Choose({ background, handleSelectBackground }) {
  const {
    backgroundQuery,
    setBackgroundQuery,
    setShowModal,
    setSelectedCharacteristic,
  } = useCharacterStore();

  useEffect(() => {
    if (background?.name) {
      //focus div with id of this name
      document
        .getElementById(background.name)
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);
  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <div className='md:rounded-[16px] flex flex-col gap-5 w-full md:w-3/5 h-full md:p-5  md:pt-6 md:border md:border-white/10 md:bg-white/[8%] md:pb-0  '>
      <h1 className='headline-4 hidden md:block'>Background</h1>
      <SearchInput
        query={backgroundQuery}
        setQuery={setBackgroundQuery}
        className={"hidden md:block"}
      />
      <div className='grid grid-cols-12 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-10 2xl:grid-cols-12 gap-4 md:gap-5 w-full overflow-auto hide-scrollbar md:pb-5'>
        {BACKGROUND.filter(({ name }) => {
          if (backgroundQuery) {
            return name.toLowerCase().includes(backgroundQuery.toLowerCase());
          }

          return true;
        }).map(({ name, description }, index) => (
          <div
            id={name}
            key={index}
            onClick={() => {
              handleSelectBackground({ name, description });
              setSelectedCharacteristic({
                name,
                image: `https://dndai-images.s3.eu-central-1.amazonaws.com/backgrounds/${name
                  .toLowerCase()
                  .replace(" ", "-")}.webp`,
                description,
              });
            }}
            className={`flex cursor-pointer col-span-4 md:col-span-4  relative xl:col-span-2 flex-col running-text-mono uppercase justify-start items-start gap-3  `}
          >
            <img
              onClick={handleShowModal}
              src={`/Icons/InfoButton.svg`}
              className={cn(
                `w-6 h-6 left-2 top-[75px] md:hidden ease-animate object-cover absolute`,
                background?.name !== name && "opacity-0 pointer-events-none"
              )}
            />
            <img
              src={`https://dndai-images.s3.eu-central-1.amazonaws.com/backgrounds/${name
                .toLowerCase()
                .replaceAll(" ", "-")}.webp`}
              alt={name}
              className={` w-full h-[107px] md:h-[118px] 2xl:h-[200px]  ease-animate object-cover rounded-[10px] ${
                background?.name === name
                  ? "border-2 border-irisPurpleLight"
                  : ""
              }`}
            />
            <span className='description'>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
