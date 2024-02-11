"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { resetPassword } from "@/api/auth";

const PasswordResetPage = () => {
  const [password, setPassword] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //get token from search params
  const searchParams = useSearchParams();

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Invalid token");
      return;
    }
    if (!isValidPassword(password)) {
      toast.error(
        "Password must contain atleast 8 characters including uppercase, lowercase and digit"
      );
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(password, token);

      toast.success("Password reset successful");
    } catch (error) {
      console.log(error?.response?.data?.message || "An error occurred");
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen '>
      <div className=' p-8 shadow-md rounded-md'>
        <h2 className='text-2xl font-bold mb-4 text-white'>Password Reset</h2>

        <div className='mb-4'>
          <label htmlFor='password' className='mb-1 block text-md text-white'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='********'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-[30vw] px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='confirmpassword'
            className='mb-1 block text-md text-white'
          >
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmpassword'
            name='confirmpassword'
            placeholder='********'
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className='w-[30vw] px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-blue-500'
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={password === "" || passwordConfirm === "" || isLoading}
          className='  disabled:opacity-60 disabled:cursor-not-allowed  bg-gradient-to-t from-green-950 to-green-500 text-white px-4 py-2  rounded-md hover:to-green-700 hover:from-green-400 disabled:hover:from-green-950 disabled:hover:to-green-500  focus:outline-none transition-colors duration-300 w-40'
        >
          {isLoading ? "Loading..." : "reset password"}
        </button>
      </div>
    </div>
  );
};

export default PasswordResetPage;
