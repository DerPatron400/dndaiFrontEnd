import React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
export default function CustomRadioButton({
  options = ["Option One", "Option Two"],
}) {
  return (
    <RadioGroup defaultValue='option-one'>
      {options.map((option) => (
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            className='h-6 w-6 text-gray2 border-gray2 hover:border-white ease-animate data-[state=checked]:!border-irisPurpleLight '
            value={option.toLowerCase().replaceAll(" ", "-")}
            id={option.toLowerCase().replaceAll(" ", "-")}
          />
          <Label
            htmlFor={option.toLowerCase().replaceAll(" ", "-")}
            className='running-text-mono uppercase'
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
