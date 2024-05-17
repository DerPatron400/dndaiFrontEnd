import { cn } from "@/lib/utils";
import React from "react";

export default function CustomValidationtext({ validator, text }) {
  return (
    <div className="flex justify-start items-center gap-2 my-1.5">
      <img
        src={validator ? "/Icons/Success.png" : "/Icons/Error.png"}
        alt="Validation"
        className="h-4 w-4 inline-block ml-2"
      />
      <span
        className={cn(
          "uppercase running-text-small",
          validator ? "text-successGreen" : "text-errorRed"
        )}
      >
        {text}
      </span>
    </div>
  );
}
