import { cn } from "@/lib/utils";
import React from "react";

export default function CustomValidationtext({
  validator,
  text,
  isPassword = false,
}) {
  return (
    <div className='flex justify-start items-center gap-2 my-1.5'>
      <img
        src={validator ? "/Icons/Success.svg" : "/Icons/Error.svg"}
        alt='Validation'
        className='h-4 w-4 inline-block ml-2'
      />
      <span
        className={cn(
          validator ? "text-successGreen" : "text-errorRed",
          isPassword && " running-text-small ",
          !isPassword && "uppercase font-roboto-mono text-[10px]"
        )}
      >
        {text}
      </span>
    </div>
  );
}
