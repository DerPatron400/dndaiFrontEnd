"use client";
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { continueWithGoogle, getUserData } from "@/api/auth";
import useUserStore from "@/utils/store/userStore";
import Cookie from "universal-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SocialAuths({ isLoading, setIsLoading }) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const cookies = new Cookie();
  const handleContinueWithGoogle = async (user) => {
    try {
      setIsLoading(true);
      const data = await continueWithGoogle(user);
      setUser(data);

      cookies.set("token", data.token, { path: "/" });
      toast.success("Login Successful");
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some error occurred");
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
    <div className='space-y-2'>
      <button
        type='button'
        disabled={isLoading}
        onClick={login_action}
        className='shadow py-2 w-full flex  items-center justify-center gap-x-2 rounded-md bg-white   text-slate-800'
      >
        <img src='/Logo/google.png' className='h-5 object-contain' /> Continue
        With Google
      </button>

      {/* <a className='a-button row-container' href={getTwitterOauthUrl()}>
        <button
          type='button'
          disabled={isLoading}
          //onClick={onTwitterConnect}
          className='py-2 w-full flex items-center justify-center gap-x-2 rounded-md bg-white   text-slate-800'
        >
          <img src='/Logo/twitter.png' className='h-4 object-contain' />{" "}
          Continue With Twitter
        </button>
      </a> */}
    </div>
  );
}
