"use client";
import React, { useState } from "react";
import IconButton from "@/components/ui/custom-iconbutton";
import { cn } from "@/lib/utils";
import CustomButton from "./custom-button";

export default function CustomInputIcon({
  placeholder,
  icon,
  isSubtle,
  isComment,
  text = "",
  className,
}) {
  const [inFocus, setInFocus] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div
      className={cn(
        "relative h-[80px] w-96 running-text  group",
        isComment && "h-16",
        className
      )}
    >
      <div className="absolute inset-y-0 end-0 flex  items-center pe-5 ps-[14px] pointer-events-none">
        {isSubtle ? (
          <CustomButton disabled={!value} variant={"subtle"} withIcon={true}>
            {icon}
            {text}
          </CustomButton>
        ) : (
          <IconButton
            className={cn(
              "bg-white/30 text-russianViolet transition-all duration-300 ease-in-out group ",
              value && "bg-white "
            )}
          >
            {icon}
          </IconButton>
        )}
      </div>
      <textarea
        type="text"
        id={placeholder}
        value={value}
        className={cn(
          "block w-full h-[80px]  overflow-y-hidden py-[28px]  resize-none  peer/input ps-5 pe-[70px] box-border    running-text  placeholder:opacity-100 text-white border border-gray2 rounded-[10px] bg-transparent hover:border-white cursor-pointer duration-300 transition-all focus:outline-0 focus:ring-offset-0 focus:ring-inset-irisPurpleLight focus:!ring-irisPurpleLight focus:!border-irisPurpleLight  placeholder:text-gray2  focus:shadow-text-area  ",
          isComment && "h-16 !py-5"
        )}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
    </div>
  );
}
