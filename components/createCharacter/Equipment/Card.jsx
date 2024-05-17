import React from "react";
import CustomRadioButton from "@/components/ui/custom-radio-button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function Card({
  optionArray,
  img,
  name,
  handleEquipmentChange,
  selectedOption,
}) {
  const key = name.toLowerCase().replaceAll(" ", "");
  return (
    <div className='w-full h-auto md:h-full md:min-h-full gap-6 md:gap-0 flex flex-col  md:bg-white/[2%] md:border border-white/5 rounded-[10px] overflow-hidden'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='w-full h-[353px]  md:w-full md:h-[186px]'>
              <img
                src={img}
                alt=''
                className='h-full w-full object-cover   rounded-[10px]  md:rounded-none'
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <span className='!running-text-small '>{name}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className='md:p-5 md:pt-5 flex flex-col h-full items-start justify-start gap-5 md:gap-6'>
        <span className='running-text-mono text-gray2 '>{name}</span>
        <CustomRadioButton
          className={cn(
            "flex items-start flex-col flex-wrap max-h-[160px] md:max-h-full gap-y-4 w-full",
            optionArray.length < 8 && "max-h-[90px]"
          )}
          options={optionArray}
          selectedOption={selectedOption}
          onChange={(value) => handleEquipmentChange(key, value)}
        />
      </div>
    </div>
  );
}
