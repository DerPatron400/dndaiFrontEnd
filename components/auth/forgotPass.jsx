"use client";
import React from "react";
import CustomInput from "../ui/custom-input";
import CustomButton from "../ui/custom-button";

export default function forgotPass() {
  return (
    <div className=" text-white h-[278px] w-[345px] flex flex-col justify-between items-start">
      <div>
        <h1 className="text-[28px] font-helvetica-now-display font-medium">
          Forgot password?
        </h1>
        <span className="text-gray2 text-[15px] font-helvetica-now-display">
          Enter your E-Mail address to reset your password. You may need to
          check your spam folder.
        </span>
      </div>
      <CustomInput placeholder="E-MAIL" />
      <div className="w-full">
        <CustomButton variant={"primary"} className={"w-full font-bold"}>
          RESET PASSWORD
        </CustomButton>
      </div>
      <span className="text-white text-[15px] font-helvetica-now-display">
        I do not have access to my E-Mail address
      </span>
    </div>
  );
}
