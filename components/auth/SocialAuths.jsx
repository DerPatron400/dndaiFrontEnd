import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

export default function SocialAuths({ isSignup = false }) {
  const handleContinueWithGoogle = async (user) => {};
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
        onClick={login_action}
        className='shadow py-2 w-full flex  items-center justify-center gap-x-2 rounded-md bg-white   text-slate-800'
      >
        <img src='/Logo/google.png' className='h-5 object-contain' /> Continue
        With Google
      </button>
      <button className='py-2 w-full flex items-center justify-center gap-x-2 rounded-md bg-white   text-slate-800'>
        <img src='/Logo/twitter.png' className='h-4 object-contain' /> Continue
        With Twitter
      </button>
    </div>
  );
}
