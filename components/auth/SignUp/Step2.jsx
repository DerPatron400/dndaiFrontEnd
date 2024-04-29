import React from "react";
import CustomInput from "../../ui/custom-input";
import CustomButton from "../../ui/custom-button";
import { Checkbox } from "../../ui/checkbox";
export default function Step2() {
  return (
    <div className='w-full flex flex-col gap-6'>
      <CustomInput placeholder='USERNAME' className={"w-full"} />
      <CustomInput placeholder='E-MAIL' className={"w-full"} />
      <CustomInput placeholder='NAME' className={"w-full"} />
      <CustomInput placeholder='SURNAME' className={"w-full"} />
      <CustomInput placeholder='PASSWORD' className={"w-full"} />
      {/* <div>
        <ul>
          <li>At least 8 characters</li>
          <li>Contains a number</li>
          <li>Contains a special character</li>
        </ul>
      </div> */}
      <div className='flex w-full justify-center items-center gap-3'>
        <Checkbox className='border border-irisPurpleLight ' />
        <span className='text-white running-text-small  text-left'>
          By selecting I agree to the dndai{" "}
          <span className='text-irisPurpleLight'>terms and conditions. </span>
          You can read how we use and protect your data in our{" "}
          <span className='text-irisPurpleLight'>privacy policy.</span>
        </span>
      </div>
      <div className='w-full'>
        <CustomButton variant={"primary"} className={"w-full font-bold"}>
          CREATE ACCOUNT{" "}
          <img src='/Icons/ArrowRight.svg' alt='' className='h-5 w-5' />
        </CustomButton>
      </div>
    </div>
  );
}
