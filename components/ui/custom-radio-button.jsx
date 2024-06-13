import React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
export default function CustomRadioButton({
  options = ["Option One", "Option Two", "Option Three"],
  className,
  onChange,
  selectedOption,
}) {
  return (
    <RadioGroup
      defaultValue={
        selectedOption?.toLowerCase().replaceAll(" ", "-") || "option-one"
      }
      className={className}
    >
      {options.map((option, index) => (
        <div key={index} className={cn("flex items-center gap-x-2.5 ")}>
          <RadioGroupItem
            onClick={() => onChange(option)}
            className='h-6  w-6 text-gray2 border-gray2 hover:border-white ease-animate data-[state=checked]:!border-irisPurpleLight hover:!duration-200 active:!duration-100 '
            value={option.toLowerCase().replaceAll(" ", "-")}
            id={option.toLowerCase().replaceAll(" ", "-")}
          />
          <Label
            htmlFor={option.toLowerCase().replaceAll(" ", "-")}
            className='running-text-mono  uppercase'
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
