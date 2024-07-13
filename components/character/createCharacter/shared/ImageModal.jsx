import React from "react";
import useCharacterStore from "@/utils/characterStore";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/iconButton";
import CustomIconbutton from "@/components/ui/custom-iconbutton";

export default function ImageModal() {
  const { selectedCharacteristic, showModal, setShowModal } =
    useCharacterStore();
  return (
    <div
      className={cn(
        "bg-blur-bottom-menu ease-animate md:hidden flex items-center justify-center fixed w-screen h-screen !z-[100] left-0 top-0 p-5 opacity-0 pointer-events-none",
        showModal && "opacity-100 pointer-events-auto"
      )}
    >
      <div className='flex flex-col gap-5 relative'>
        <CustomIconbutton
          onClick={() => setShowModal(false)}
          className={"absolute top-4 right-4 bg-blur-icon-button"}
        >
          <img src='/Icons/Cancel.svg' alt='' className='h-5 w-5 ' />
        </CustomIconbutton>
        <img
          src={selectedCharacteristic.image}
          alt=''
          className='rounded-[16px]'
        />
        <div className='flex flex-col gap-4'>
          <span className='headline-2 text-white'>
            {selectedCharacteristic.name}
          </span>
          <span className='running-text text-gray2'>
            {selectedCharacteristic.description ||
              "Astral Elves, born of the Astral Plane and rooted in the Feywild, radiated with divine energy, embodying a celestial essence distinct from their terrestrial kin."}
          </span>
        </div>
      </div>
    </div>
  );
}
