"use client";
import React from "react";
import CustomInput from "../ui/custom-input";
import CustomButton from "../ui/custom-button";

export default function forgotPass() {
  return (
    <div className=' text-white h-auto w-[345px]  flex flex-col justify-between items-start gap-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='running-text-large'>Forgot password?</h1>
        <span className='running-text-small text-gray2'>
          Enter your E-Mail address to reset your password. You may need to
          check your spam folder.
        </span>
      </div>
      <div className='flex flex-col gap-6 w-full'>
        <CustomInput placeholder='E-MAIL' />
        <div className='w-full flex flex-col gap-2.5 '>
          <CustomButton variant={"primary"} className={"w-full font-bold"}>
            RESET PASSWORD
          </CustomButton>
          <span className='running-text-small'>
            I do not have access to my E-Mail address
          </span>
        </div>
      </div>
    </div>
  );
}
