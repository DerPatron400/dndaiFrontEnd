"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { requestPasswordReset } from "@/api/auth";
import { redirect } from "next/dist/server/api-utils";

//component
const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmailValid(email)) {
      toast.error("Invalid email");
      return;
    }
    try {
      setIsLoading(true);
      const redirectURL = "https://dndai.app/auth/password-reset";
      // Send the reset link
      await requestPasswordReset(email, redirectURL);
      toast.success("Reset link sent successfully");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
    // Reset the email input
  };

  return (
    <div className="min-h-[60vh] text-white gap-y-6 mt-20 flex items-center justify-center flex-col">
      <div className="text-center">
        <h1 className="text-2xl">Password Reset</h1>
        <span className="opacity-70">
          An Email with reset link would be send to this address
        </span>
      </div>

      <div className="mt-3">
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
          className="w-[30vw] text-black px-3 py-1.5 rounded"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={email.length === 0 || isLoading}
        className="  disabled:opacity-60 disabled:cursor-not-allowed  bg-gradient-to-t from-green-950 to-green-500 text-white px-4 py-2  rounded-md hover:to-green-700 hover:from-green-400 disabled:hover:from-green-950 disabled:hover:to-green-500  focus:outline-none transition-colors duration-300 w-40"
      >
        {isLoading ? "Sending..." : "Send Reset Link"}
      </button>
    </div>
  );
};

export default PasswordResetPage;
