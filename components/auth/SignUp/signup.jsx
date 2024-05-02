"use client";
import React, { useState } from "react";

import Step1 from "./Step1";
import Step2 from "./Step2";
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

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  console.log(step);
  return (
    <div
      className={`text-white w-[345px] h-auto flex flex-col justify-between items-start gap-8 
            ${step === 1 ? "h-auto gap-4" : "h-auto gap-0"}`}
    >
      <div className='flex flex-col gap-4'>
        <h1 className='headline-3 '>Create account</h1>
        <span className='text-gray2 running-text-small '>
          Already have an account? <span className='text-white'>Sign in</span>
        </span>
      </div>
      {step == 1 && <Step1 setStep={setStep} user={user} setUser={setUser} />}
      {step == 2 && <Step2 setStep={setStep} user={user} setUser={setUser} />}
    </div>
  );
}
