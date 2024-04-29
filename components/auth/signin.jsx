"use client";
import React from "react";
import CustomInput from "../ui/custom-input";
import CustomButton from "../ui/custom-button";
import { Checkbox } from "../ui/checkbox";

export default function signin() {
  return (
    <div className="text-white w-[345px] h-[452px] mt-10 flex flex-col justify-between items-start">
      <div>
        <h1 className="text-[44px] font-helvetica-now-display font-medium">
          Sign in
        </h1>
        <span className="text-gray2 font-helvetica-now-display">
          No account yet? <span className="text-white">Create an account</span>
        </span>
      </div>
      <CustomInput placeholder="E-MAIL OR USERNAME" />
      <CustomInput placeholder="PASSWORD" />
      <span className="text-white font-helvetica-now-display">
        Forgot password?
      </span>
      <div className="flex w-full justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <Checkbox className="border border-irisPurpleLight" />
          <span className="text-white font-helvetica-now-display text-center">
            Stay logged in
          </span>
        </div>
        <CustomButton variant={"primary"} className={"font-bold"}>
          SIGN IN{" "}
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
    </div>
  );
}
