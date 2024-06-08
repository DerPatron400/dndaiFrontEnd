"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function CustomTextArea({
  placeholder,
  value,
  onChange,
  isComment,
  className,
}) {
  const [inFocus, setInFocus] = useState(false);

  return (
    <div
      className={cn(
        " h-[200px] w-full running-text  group",
        isComment && "h-16"
      )}
    >
      <textarea
        type='text'
        id={placeholder}
        value={value}
        className={cn(
          "block w-full h-[80px]  overflow-y-hidden py-[28px]  resize-none  peer/input ps-5 pe-[70px] box-border running-text  placeholder:opacity-100 text-white border border-gray2 rounded-[10px] bg-transparent hover:border-white cursor-pointer duration-300 transition-all focus:outline-0 focus:ring-offset-0 focus:ring-inset-irisPurpleLight focus:!ring-irisPurpleLight focus:!border-irisPurpleLight  placeholder:text-gray2  focus:shadow-text-area  ",
          isComment && "h-16 !py-5",
          className
        )}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
    </div>
  );
}
