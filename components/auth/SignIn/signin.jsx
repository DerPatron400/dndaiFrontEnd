"use client";
import React from "react";
import CustomInput from "../../ui/custom-input";
import CustomButton from "../../ui/custom-button";
import { Checkbox } from "../../ui/checkbox";

export default function signin() {
  return (
    <div className='text-white w-[345px] h-auto mt-10 flex flex-col justify-between items-start  gap-6'>
      <div className='flex flex-col gap-4'>
        <h1 className='headline-3'>Sign in</h1>
        <span className='text-gray2  running-text-small'>
          No account yet? <span className='text-white'>Create an account</span>
        </span>
      </div>
      <div className='flex w-full flex-col gap-6'>
        <CustomInput placeholder='E-MAIL OR USERNAME' />
        <div className='gap-2.5 flex flex-col'>
          <CustomInput placeholder='PASSWORD' />
          <span className='text-white running-text-small cursor-pointer'>
            Forgot password?
          </span>
        </div>
      </div>

      <div className='flex flex-col w-full gap-6'>
        <div className='flex w-full justify-between items-center'>
          <div className='flex justify-center items-center gap-2'>
            <Checkbox className='border border-irisPurpleLight' />
            <span className='text-white running-text-small text-center'>
              Stay logged in
            </span>
          </div>
          <CustomButton variant={"primary"} className={"font-bold"}>
            SIGN IN{" "}
          </CustomButton>
        </div>
        <div className='flex items-center justify-center w-full running-text-mono'>
          <div className='border-t border-gray3 w-full'></div>
          <div className='px-2 text-lg text-gray2'>OR</div>
          <div className='border-t border-gray3 w-full'></div>
        </div>
        <CustomButton variant={"primary"} className={"w-full font-bold"}>
          CONTINUE WITH GOOGLE
        </CustomButton>
      </div>
    </div>
  );
}
