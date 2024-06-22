import React from "react";
import Card from "@/components/ui/Shared/Card/character";
import CustomButton from "@/components/ui/custom-button";

export default function index() {
  return (
    <div className=" border-white w-full flex flex-col bg-gradient pt-[130px] md:pt-[0px] px-6 lg:px-12 md:pb-64 ">
      <div className=" flex justify-end gap-24 my-5">
        <h1 className="headline-3 text-center w-1/2">
          Begin your journey by selecting{" "}
          <span className="text-irisPurpleLight">your hero!</span>
        </h1>
        <div className="pt-2">
          <CustomButton>
            <img src="/Icons/CreateCharacter.svg" alt="" />
            Create character
          </CustomButton>
        </div>
      </div>
      <div className=" w-full grid grid-cols-12 gap-[20px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
}
