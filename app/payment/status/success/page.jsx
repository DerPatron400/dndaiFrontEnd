"use client";
import React, { useEffect } from "react";
import { getCredits } from "@/actions/character";
import useUserStore from "@/utils/userStore";
import CustomButton from "@/components/ui/custom-button";
import { useRouter } from "next/navigation";

export default function page() {
  const { user, setYellowCredits, setBlueCredits } = useUserStore();
  const router = useRouter();

  const handleUpdateCredits = async () => {
    try {
      const { credits } = await getCredits(user.token);
      setYellowCredits(credits.yellowCredits);
      setBlueCredits(credits.blueCredits);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleRedirect = () => {
    router.push("/game/character-selection");
  };

  useEffect(() => {
    if (user?.token) handleUpdateCredits();
  }, [user.token]);

  return (
    <div className='fixed  flex items-center justify-center text-white z-10 top-0 left-0 min-h-full w-screen px-11 md:px-0'>
      <div className='w-full md:w-1/4 text-center flex items-center flex-col '>
        <img src='/images/payment/Successful.svg' alt='success' className='' />
        <div className='flex flex-col gap-4 items-center md:w-3/4'>
          <span className='headline-3 '>Thank you for supporting DNDAI!</span>
          <span className='running-text'>
            Your credits will be added to your account promptly.
          </span>
        </div>
        <CustomButton
          onClick={handleRedirect}
          variant='primary'
          className={"mt-8"}
        >
          Start your adventure
        </CustomButton>
      </div>
    </div>
  );
}
