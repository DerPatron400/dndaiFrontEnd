import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { CLASSES } from "../constants";
import useCharacterStore from "@/utils/characterStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function Choose({ _class, handleSelectClass }) {
  const { setShowModal, setSelectedCharacteristic } = useCharacterStore();
  useEffect(() => {
    if (_class && window.innerWidth > 768) {
      //focus div with id of this name
      document
        .getElementById(_class.name)
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [_class]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className='md:rounded-[16px] flex flex-col gap-5 w-full md:w-3/5 h-full  md:p-5  md:pt-6 md:border md:border-white/10 md:bg-white/[8%]  overflow-auto hide-scrollbar'>
      <h1 className='headline-4 hidden md:block'>Class</h1>

      <div className='grid grid-cols-12 lg:grid-cols-10 gap-4 md:gap-5 w-full'>
        {CLASSES.map(({ name, description }, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
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
                  className={`flex cursor-pointer col-span-4 md:col-span-4 relative lg:col-span-2 flex-col running-text-mono uppercase justify-start items-start gap-3  `}
                >
                  <img
                    src={`/Icons/InfoButton.svg`}
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
                    className={`w-full  h-[107px] md:h-[118px]  ease-animate object-cover rounded-[10px] ${
                      _class?.name === name
                        ? "border-2 border-irisPurpleLight"
                        : ""
                    }`}
                  />
                  <span>{name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side='bottom'>
                <span className='!running-text-small '>{name}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
