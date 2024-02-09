import React from "react";

export default function SocialAuths({ isSignup = false }) {
  return (
    <div className='space-y-2'>
      <button className='shadow py-2 w-full flex  items-center justify-center gap-x-2 rounded-md bg-white   text-slate-800'>
        <img src='/Logo/google.png' className='h-5 object-contain' />{" "}
        {isSignup ? "Register" : "Login"} With Google
      </button>
      <button className='py-2 w-full flex items-center justify-center gap-x-2 rounded-md bg-white   text-slate-800'>
        <img src='/Logo/twitter.png' className='h-4 object-contain' />{" "}
        {isSignup ? "Register" : "Login"} With Twitter
      </button>
    </div>
  );
}
