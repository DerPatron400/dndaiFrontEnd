"use client";
import React from "react";
import CustomButton from "../ui/custom-button";

export default function checkmail() {
  return (
    <div className=" text-white h-[278px] w-[345px] flex text-center flex-col justify-between items-center">
      <div className="flex flex-col justify-center items-center">
        <img src="/Icons/plane.png" alt="" className="w-[171px] h-[86px]" />
        <h1 className="text-[28px] font-helvetica-now-display font-medium mt-2">
          Check your E-Mails
        </h1>
        <span className="text-gray2 text-[15px]  font-helvetica-now-display">
          We have sent you a link to reset your password by E-Mail. You may need
          to check your spam folder.
        </span>
      </div>

      <div className="w-full">
        <CustomButton variant={"primary"} className={"w-full font-bold"}>
          RESEND LINK
        </CustomButton>
      </div>
      <span className="text-white text-[15px] font-helvetica-now-display">
        Back to sign up
      </span>
    </div>
  );
}
