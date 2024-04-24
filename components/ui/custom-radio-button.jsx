import React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
export default function CustomRadioButton() {
  return (
    <RadioGroup defaultValue='option-one'>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem
          className='h-6 w-6 text-gray2 border-gray2 hover:border-white ease-animate data-[state=checked]:!border-irisPurpleLight '
          value='option-one'
          id='option-one'
        />
        <Label htmlFor='option-one' className='running-text-mono'>
          Option One
        </Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option-two' id='option-two' />
        <Label htmlFor='option-two'>Option Two</Label>
      </div>
    </RadioGroup>
  );
}
