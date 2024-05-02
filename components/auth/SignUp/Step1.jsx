import React, { useState } from "react";
import CustomInput from "../../ui/custom-input";
import CustomButton from "../../ui/custom-button";

export default function Step1({ setStep, user, setUser }) {
  const next = () => {
    setStep(2);
  };

  //pass input, setInput state to CustomInput component
  return (
    <div className='w-full flex flex-col gap-6'>
      <CustomInput
        placeholder='E-MAIL'
        className={"w-full"}
        value={user.email}
        onChange={(value) => setUser({ ...user, email: value })}
      />

      <CustomButton
        variant={"primary"}
        disabled={user.email.length === 0}
        onClick={next}
      >
        NEXT <img src='/Icons/ArrowRight.svg' alt='' className='h-5 w-5' />
      </CustomButton>

      <div className='flex items-center justify-center w-full running-text-mono uppercase'>
        <div className='border-t border-gray3 w-full'></div>
        <div className='px-2 text-lg text-gray2'>OR</div>
        <div className='border-t border-gray3 w-full'></div>
      </div>
      <CustomButton variant={"primary"}>CONTINUE WITH GOOGLE</CustomButton>
    </div>
  );
}
