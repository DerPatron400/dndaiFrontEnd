"use client";
import React, { useState } from "react";
import CustomInput from "@/components//ui/custom-input";
import CustomButton from "@/components/ui/custom-button";
import GoogleAuth from "../Socials/Google";
import { validateEmail } from "@/lib/Helpers/auth";
import { verifyEmailExists } from "@/actions/auth";
import CustomValidationtext from "@/components/ui/custom-validationtext";
export default function Step1({ setStep, user, setUser }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const next = async () => {
    try {
      const response = await verifyEmailExists(user.email);
      console.log(response);
      if (response.exists) {
        setError("Email already exists");
      } else {
        setStep(2);
      }
    } catch (error) {}
  };

  //pass input, setInput state to CustomInput component
  return (
    <div className='w-full flex flex-col gap-6 pt-14 md:pt-0'>
      <div className='flex flex-col gap-3'>
        <CustomInput
          placeholder='E-MAIL'
          className={"w-full"}
          error={error}
          value={user?.email}
          onChange={(value) => setUser({ ...user, email: value })}
          icon={
            validateEmail(user?.email) &&
            !error && (
              <img
                src='/Icons/Success.svg'
                alt='Success'
                className=' h-4 w-4'
              />
            )
          }
        />
        {error && <CustomValidationtext validator={false} text={error} />}
      </div>
      <CustomButton
        variant={"primary"}
        disabled={
          user?.email.length === 0 || !validateEmail(user?.email) || isLoading
        }
        onClick={next}
      >
        NEXT <img src='/Icons/ArrowRight.svg' alt='' className='h-5 w-5' />
      </CustomButton>

      <div className='flex items-center justify-center w-full running-text-mono uppercase'>
        <div className='border-t border-gray3 w-full'></div>
        <div className='px-2 text-lg text-gray2'>OR</div>
        <div className='border-t border-gray3 w-full'></div>
      </div>
      <GoogleAuth isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
}
