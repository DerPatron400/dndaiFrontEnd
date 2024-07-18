import React from "react";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import Plus from "@/components/ui/Icons/Plus";
import Minus from "@/components/ui/Icons/Minus";
import { cn } from "@/lib/utils";
export default function AdjustTextSize({
  textSize,
  setTextSize,
  className = "",
}) {
  return (
    <div className={cn("flex gap-2 justify-start items-center", className)}>
      <span className='running-text-mono uppercase text-gray2'>Text Size</span>
      <CustomIconbutton
        disabled={textSize <= 17}
        onClick={() => setTextSize((prev) => prev - 1)}
        variant={"primary"}
        className={"h-[25px] w-[25px]"}
      >
        <Minus className=' w-[9px] h-[1px] fill-russianViolet' />
      </CustomIconbutton>

      <CustomIconbutton
        onClick={() => setTextSize((prev) => prev + 1)}
        disabled={textSize >= 22}
        variant={"primary"}
        className={"h-[25px] w-[25px]"}
      >
        <Plus className='h-[9px] w-[9px] fill-russianViolet' />
      </CustomIconbutton>
    </div>
  );
}
