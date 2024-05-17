import React from "react";
import ForgotPass from "@/components/auth/forgotPass";
import dynamic from "next/dynamic";

export default function page() {
  return (
    <div className='bg-russianViolet bg-gradient w-screen h-screen flex justify-center items-center'>
      <ForgotPass />
    </div>
  );
}
