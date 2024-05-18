"use client";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Link from "next/link";
const INITIAL_USER = {
  username: "",
  email: "",
  name: "",
  surname: "",
  password: "",
};
export default function signup() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(INITIAL_USER);

  const reset = () => {
    setUser(INITIAL_USER);
  };

  return (
    <div
      className={`text-white w-[345px] h-full flex flex-col justify-center items-start gap-8 
            ${step === 1 ? "h-full gap-4" : "h-full gap-0 py-20"}`}
    >
      <div className='flex flex-col gap-4'>
        <h1 className='headline-3 '>Create account</h1>
        <span className='text-gray2 running-text-small '>
          Already have an account?{" "}
          <Link className='text-white' href={"/auth/sign-in"}>
            Sign in
          </Link>
        </span>
      </div>
      {step == 1 && <Step1 setStep={setStep} user={user} setUser={setUser} />}
      {step == 2 && (
        <Step2 setStep={setStep} user={user} setUser={setUser} reset={reset} />
      )}
    </div>
  );
}
