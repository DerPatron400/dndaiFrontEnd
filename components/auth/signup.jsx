"use client";
import React, { useState } from "react";
import CustomInput from "../ui/custom-input";
import CustomButton from "../ui/custom-button";
import { Checkbox } from "../ui/checkbox";

export default function signup() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div
      className={`text-white w-[345px] h-[340px] flex flex-col justify-between items-start border 
            ${showForm ? "h-[584px] gap-4" : "h-[340px] gap-0"}`}
    >
      <div>
        <h1 className="text-[44px] font-helvetica-now-display font-medium">
          Create account
        </h1>
        <span className="text-gray2 font-helvetica-now-display">
          Already have an account? <span className="text-white">Sign in</span>
        </span>
      </div>
      {!showForm ? (
        <>
          <CustomInput placeholder="E-MAIL" />
          <div onClick={handleShowForm} className="w-full">
            <CustomButton variant={"primary"} className={"w-full font-bold"}>
              NEXT{" "}
              <img src="/Icons/ArrowRight.svg" alt="" className="h-5 w-5" />
            </CustomButton>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            <div className="border-t border-white w-full"></div>
            <div className="px-2 text-lg text-gray-300">OR</div>
            <div className="border-t border-white w-full"></div>
          </div>
          <CustomButton variant={"primary"} className={"w-full font-bold"}>
            CONTINUE WITH GOOGLE
          </CustomButton>
        </>
      ) : (
        <>
          <CustomInput placeholder="USERNAME" />
          <CustomInput placeholder="E-MAIL" />
          <CustomInput placeholder="NAME" />
          <CustomInput placeholder="SURNAME" />
          <CustomInput placeholder="PASSWORD" />
          <div>
            <ul>
              <li>At least 8 characters</li>
              <li>Contains a number</li>
              <li>Contains a special character</li>
            </ul>
          </div>
          <div className="flex w-full justify-center items-center gap-2">
            <Checkbox className="border border-irisPurpleLight" />
            <span className="text-white font-helvetica-now-display text-left">
              By selecting I agree to the dndai{" "}
              <span className="text-irisPurpleLight">
                terms and conditions.{" "}
              </span>
              You can read how we use and protect your data in our{" "}
              <span className="text-irisPurpleLight">privacy policy.</span>
            </span>
          </div>
          <div className="w-full">
            <CustomButton variant={"primary"} className={"w-full font-bold"}>
              CREATE ACCOUNT{" "}
              <img src="/Icons/ArrowRight.svg" alt="" className="h-5 w-5" />
            </CustomButton>
          </div>
        </>
      )}
    </div>
  );
}
