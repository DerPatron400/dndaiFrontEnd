import React from "react";
import { DialogContent } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";

export default function imageZoom() {
  return (
    <DialogContent className=" text-white bg-transparent border-none p-0">
      <>
        <div className="grid grid-cols-1 gap-4  ">
          <img
            src="/images/CreateCharacter/CharacterName/CharacterName.png"
            className="w-full h-[107px] md:h-[500px] md:w-full ease-animate object-cover rounded-[10px] "
          />
        </div>
      </>

      <div className="flex justify-between ">
        <div className="flex justify-start gap-4 ">
          <button className="running-text-mono flex items-center pe-5 ps-[20px] gap-2 h-[48px] px-6 bg-white/10 hover:bg-white/10 uppercase border border-white/10 hover:border-white/20 active:bg-white/20 active:border-white/40 disabled:opacity-30 rounded-[10px]  cursor-pointer z-[10] ease-animate  hover:!duration-200 active:!duration-100">
            <img
              src="/Icons/Generate.svg"
              alt=""
              className="h-4 w-4 opacity-70"
            />
            Generate another image
          </button>
          <button className="running-text-mono flex items-center pe-5 ps-[20px] gap-2 h-[48px] px-6 bg-white/0 hover:bg-white/10 uppercase border border-white/0 hover:border-white/20 active:bg-white/20 active:border-white/40 disabled:opacity-30 rounded-[10px]  cursor-pointer z-[10] ease-animate  hover:!duration-200 active:!duration-100">
            <img
              src="/Icons/Download.svg"
              alt=""
              className="h-4 w-4 opacity-70 invert"
            />
            download image
          </button>
        </div>
        <CustomButton withIcon>
          <img src="/Icons/Cancel.svg" alt="" className="w-6 h-6 opacity-70" />
          <span className="running-text-mono text-white">CLOSE</span>
        </CustomButton>
      </div>
    </DialogContent>
  );
}
