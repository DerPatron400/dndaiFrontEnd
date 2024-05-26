import React from "react";
import IconButton from "@/components/ui/custom-iconbutton";
import CustomIconbutton from "@/components/ui/custom-iconbutton";

export default function characterInfo() {
  return (
    <div>
      {" "}
      <div className="w-full h-full bg-white/10 rounded-[10px] flex flex-col justify-start">
        <img
          src="/images/CreateCharacter/CharacterName/CharacterName.png"
          alt=""
          className="h-[345px] object-cover rounded-t-[10px] "
        />
        <div className="flex flex-col p-5 gap-[20px]">
          <div className=" flex justify-between items-center">
            <span className=" headline-4 text-white ">NAME</span>
            <IconButton className="bg-white  font-roboto-mono hover:bg-white h-6 w-6"></IconButton>
          </div>
          <div className="flex flex-col running-text-mono">
            <span className="text-white ">LEVEL 72</span>
            <span className=" text-irisPurpleLight">
              HALF-ELF <span className=" text-sandyOrange">SORCERER</span>
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-[16px] w-full flex justify-start gap-[12px] px-[10px]">
        <CustomIconbutton className={"w-[36px] h-[36px] bg-blur"}>
          <img src="/icons/Vector.svg" alt="" className="h-3 w-3" />
        </CustomIconbutton>
        <CustomIconbutton className={"w-[36px] h-[36px] bg-blur"}>
          <img src="/icons/info.svg" alt="" className="h-3 w-3 " />
        </CustomIconbutton>
      </div>
    </div>
  );
}
