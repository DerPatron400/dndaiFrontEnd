"use client";
import CustomButton from "@/components/ui/custom-button";
import React from "react";
import { useRouter } from "next/navigation";
import Reset from "@/components/ui/Icons/Reset";

export default function page() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/pricing");
  };
  return (
    <div className='fixed  flex items-center justify-center text-white z-10 top-0 left-0 min-h-full w-screen px-11 md:px-0'>
      <div className=' w-full md:w-1/4 text-center flex items-center flex-col '>
        <img src='/images/payment/Error.svg' alt='success' className='' />
        <div className='flex flex-col gap-4 items-center '>
          <span className='headline-3 '>
            Oh no! It seems something{" "}
            <span className='text-errorRed'>went wrong.</span> Please try again.
          </span>
        </div>
        <CustomButton
          onClick={handleRedirect}
          className={"mt-8"}
          withIcon={true}
        >
          <Reset className='w-5 h-5 fill-white' />
          Retry
        </CustomButton>
      </div>
    </div>
  );
}
