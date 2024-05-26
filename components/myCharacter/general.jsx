import React from "react";

export default function general() {
  return (
    <>
      <div className="flex gap-[16px] uppercase">
        <div className=" h-[400px] w-[223px] p-[24px] bg-white/10 rounded-[16px]">
          <div className=" flex flex-col gap-[24px]">
            <span className="text-xl">General</span>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col justify-center items-start ">
                <span className="text-gray2 text-sm">Gender</span>
                <span className="text-lg">Male</span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-gray2 text-sm">Background</span>
                <span className="text-lg">Acolyte</span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-gray2 text-sm">Alignment</span>
                <span className="text-lg">Chaotic Evil</span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-gray2 text-sm">XP points</span>
                <span className="text-lg">8.935</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-[400px] w-[223px] p-[24px] bg-white/10 rounded-[16px] ">
          <div className=" flex flex-col gap-[24px]">
            <span className="text-xl">Personality</span>
            <div className="flex flex-col gap-[26px]">
              <div className="flex flex-col justify-center items-start ">
                <span className="text-gray2 text-sm">Personality</span>
                <span className="text-lg">Optimistic</span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-gray2 text-sm">Ideal</span>
                <span className="text-lg">Power</span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-gray2 text-sm">Bond</span>
                <span className="text-lg">Revenge</span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-gray2 text-sm">Flaw</span>
                <span className="text-lg">Addiction</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-[400px] w-[223px] p-[24px] bg-white/10 rounded-[16px]">
          <div className=" flex flex-col gap-[24px]">
            <span className="text-xl">Defence</span>
            <div className="flex flex-col gap-[26px]">
              <div className="flex flex-col justify-center items-start ">
                <span className="text-gray2 text-sm">Hit Point</span>
                <span className="text-lg">140</span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-gray2 text-sm">Armor Class</span>
                <span className="text-lg">61</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" h-full  p-[24px] bg-white/10 rounded-[32px] uppercase">
        <div className=" flex flex-col gap-[24px]">
          <span className="text-xl">Equipment</span>
          <div className="flex gap-[26px]">
            <div className="flex flex-col justify-center items-start gap-[16px]">
              <div className="h-[153px] w-[153px] rounded-[10px] bg-white/10"></div>
              <div className="flex flex-col ">
                <span className="text-gray2 running-text-mono">Weapon</span>
                <span className="running-text-mono">Diamond Class</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-[16px]">
              <div className="h-[153px] w-[153px] rounded-[10px] bg-white/10"></div>
              <div className="flex flex-col ">
                <span className="text-gray2 running-text-mono">Secondary</span>
                <span className="running-text-mono">Book of shadows</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-[16px]">
              <div className="h-[153px] w-[153px] rounded-[10px] bg-white/10"></div>
              <div className="flex flex-col ">
                <span className="text-gray2 running-text-mono">Armor</span>
                <span className="running-text-mono">Cloth armor</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-[16px]">
              <div className="h-[153px] w-[153px] rounded-[10px] bg-white/10"></div>
              <div className="flex flex-col ">
                <span className="text-gray2 running-text-mono">
                  Tool & Ammo
                </span>
                <span className="running-text-mono">Thieves Tool</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
