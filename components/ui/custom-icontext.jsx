import React from "react";

import { cn } from "@/lib/utils";
export default function CustomIcontext({ children, className }) {
  return (
    <div
      className={cn(
        "running-text-mono gap-2 text-white px-6 flex items-center  hover:text-gray1 active:text-gray2 uppercase   cursor-pointer z-[10] ease-animate",

        className
      )}
    >
      {children}
    </div>
  );
}
