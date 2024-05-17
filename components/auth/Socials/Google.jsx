"use client";
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { continueWithGoogle, getUserData } from "@/actions/auth";
import Cookie from "universal-cookie";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/ui/custom-button";
import useCustomToast from "@/hooks/useCustomToast";
import useUserStore from "@/utils/userStore";
export default function GoogleAuth({ isLoading, setIsLoading }) {
  const router = useRouter();
  const { invokeToast } = useCustomToast();

  const { setUser } = useUserStore();

  const cookies = new Cookie();
  const handleContinueWithGoogle = async (user) => {
    try {
      setIsLoading(true);
      const data = await continueWithGoogle(user);
      setUser(data);

      cookies.set("token", data.token, { path: "/" });

      invokeToast("Login Successful", "Success");
      router.push("/");
    } catch (error) {
      invokeToast(error?.response?.data?.message || "Error", "Error");
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const login_action = useGoogleLogin({
    onSuccess: async (user) => {
      await handleContinueWithGoogle(user);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <CustomButton
      disabled={isLoading}
      variant={"primary"}
      onClick={login_action}
    >
      <img src='/Icons/Google.png' alt='' />
      CONTINUE WITH GOOGLE
    </CustomButton>
  );
}
