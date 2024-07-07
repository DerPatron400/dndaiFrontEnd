"use client";
import React from "react";
import CustomRadioButton from "@/components/ui/custom-radio-button";
import Cards from "@/components/pricing/cardsSection/cards";

export default function index() {
  return (
    <div className="z-10  w-full h-full flex flex-col md:gap-5 gap-10 md:flex-col text-white justify-center items-center">
      <CustomRadioButton
        options={["Monthly", "Semi-Annually", "Annually"]}
        selectedOption={"Monthly"}
        className={"flex flex-row flex-wrap "}
        onChange={() => {
          console.log("clicked");
        }}
        // onChange={handleSelect}
      />
      <div className=" w-full grid grid-cols-4 gap-3">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Cards key={i} />
          ))}
      </div>
    </div>
  );
}
