"use client";

import Checkmail from "@/components/auth/checkmail";
import authStore from "@/utils/authStore";
import React, { useState } from "react";
import useCustomToast from "@/hooks/useCustomToast";
import { resendVerificationLink } from "@/actions/auth";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const { invokeToast } = useCustomToast();
  const { email } = authStore();
  const subtext =
    " We have sent you a link to verify your E-mail. You may need to check your spam folder.";

  const handleResend = async () => {
    console.log("here");
    setIsLoading(true);
    try {
      await resendVerificationLink(email);
      invokeToast(
        "A verification email has been sent to your email",
        "Success"
      );
      // resend email
    } catch (error) {
      console.log(error);
      invokeToast("Error sending email", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='text-white h-full md:h-screen w-full flex items-center justify-center'>
      <Checkmail
        subtext={subtext}
        isLoading={isLoading}
        handleResend={handleResend}
      />
    </div>
  );
}
