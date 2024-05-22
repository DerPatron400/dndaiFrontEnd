"use client";
import React, { useState } from "react";
import CustomInput from "../../ui/custom-input";
import CustomButton from "../../ui/custom-button";
import { Checkbox } from "../../ui/checkbox";
import GoogleAuth from "../Socials/Google";
import Link from "next/link";
import { login } from "@/actions/auth";
import { validateEmail } from "@/lib/Helpers/auth";
import useCustomToast from "@/hooks/useCustomToast";
import useUserStore from "@/utils/userStore";
import Cookie from "universal-cookie";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const cookies = new Cookie();
  const router = useRouter();
  const { setUser } = useUserStore();
  const { invokeToast } = useCustomToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await login(email, password);
      setUser(response);
      cookies.set("token", response.token, { path: "/" });
      invokeToast("Login Successful", "Success");
      router.push("/");
    } catch (error) {
      invokeToast(
        error?.response?.data?.message || "Something Went Wrong",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className='text-white w-[345px] h-auto mt-10 flex flex-col justify-between items-start gap-6'
      suppressHydrationWarning
    >
      <div className='flex flex-col gap-4'>
        <h1 className='headline-3'>Sign in</h1>
        <span className='text-gray2 running-text-small'>
          No account yet?{" "}
          <Link className='text-white' href={"/auth/sign-up"}>
            Create an account
          </Link>
        </span>
      </div>
      <div className='flex w-full flex-col gap-6'>
        <CustomInput
          placeholder='E-MAIL OR USERNAME'
          value={email}
          onChange={(value) => {
            setEmail(value);
            validateEmail(value);
          }}
          icon={
            isEmailValid && (
              <img
                src='/Icons/Success.png'
                alt='Success'
                className=' h-4 w-4'
              />
            )
          }
          className='relative' // Ensure the input field is positioned relative
        ></CustomInput>

        <div className='gap-2.5 flex flex-col'>
          <CustomInput
            placeholder='PASSWORD'
            value={password}
            onChange={(value) => setPassword(value)}
            type={isPasswordVisible ? "text" : "password"}
            icon={
              <img
                onClick={togglePasswordVisibility}
                src={
                  isPasswordVisible ? "/Icons/Eye.svg" : "/Icons/EyeClosed.svg"
                }
                alt='Toggle Password Visibility'
                className='h-5 w-5 invert cursor-pointer '
              />
            }
          />
          <Link
            href={"/auth/forgot-pass"}
            className='text-white running-text-small cursor-pointer'
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <div className='flex flex-col w-full gap-6'>
        <div className='flex w-full justify-between items-center'>
          <div className='flex justify-center items-center gap-2'>
            <Checkbox className='border border-irisPurpleLight' />
            <span className='text-white running-text-small text-center'>
              Stay logged in
            </span>
          </div>
          <CustomButton
            onClick={handleLogin}
            disabled={
              isLoading || !validateEmail(email) || password.length === 0
            }
            variant={"primary"}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </CustomButton>
        </div>
        <div className='flex items-center justify-center w-full running-text-mono'>
          <div className='border-t border-gray3 w-full'></div>
          <div className='px-2 text-lg text-gray2'>OR</div>
          <div className='border-t border-gray3 w-full'></div>
        </div>
        <GoogleAuth setIsLoading={setIsLoading} isLoading={isLoading} />
      </div>
    </div>
  );
}
