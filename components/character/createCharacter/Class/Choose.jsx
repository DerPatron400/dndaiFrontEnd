import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { CLASSES } from "../constants";
import useCharacterStore from "@/utils/characterStore";

export default function Choose({ _class, handleSelectClass }) {
  const { setShowModal, setSelectedCharacteristic } = useCharacterStore();
  useEffect(() => {
    if (_class?.name) {
      //focus div with id of this name
      document
        .getElementById(_class.name)
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className='md:rounded-[16px] flex flex-col gap-5 w-full md:w-3/5 h-full  md:p-5  md:pt-6 md:border md:border-white/10 md:bg-white/[8%] md:pb-0  '>
      <h1 className='headline-4 hidden md:block'>Class</h1>

      <div className='grid grid-cols-12 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-10 2xl:grid-cols-12 gap-4 md:gap-5  w-full overflow-auto hide-scrollbar md:pb-5'>
        {CLASSES.map(({ name, description }, index) => (
          <div
            key={index}
            id={name}
            onClick={() => {
              handleSelectClass({ name: name, description: description });
              setSelectedCharacteristic({
                name,
                image: `https://dndai-images.s3.eu-central-1.amazonaws.com/class/${name
                  .toLowerCase()
                  .replace(" ", "-")}.webp`,
                description: description,
              });
            }}
            className={`flex cursor-pointer col-span-4 md:col-span-4 relative xl:col-span-2 flex-col running-text-mono uppercase justify-start items-start gap-3  `}
          >
            <img
              src={`/Icons/Info-btn.svg`}
              onClick={handleShowModal}
              className={cn(
                `w-6 h-6 left-2 top-[75px] md:hidden ease-animate object-cover absolute`,
                _class?.name !== name && "opacity-0 pointer-events-none"
              )}
            />
            <img
              src={`https://dndai-images.s3.eu-central-1.amazonaws.com/class/${name
                .toLowerCase()
                .replaceAll(" ", "-")}.webp`}
              alt={name}
              className={` w-full object-contain ease-animate rounded-[10px] ${
                _class?.name === name ? "border-2 border-irisPurpleLight" : ""
              }`}
            />
            <span className='description'>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
