"use client";
import React, { useState } from "react";
import CustomInput from "../ui/custom-input";
import CustomButton from "../ui/custom-button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/auth";
import { isPasswordValid } from "@/lib/Helpers/auth";
import CustomValidationtext from "../ui/custom-validationtext";
import useCustomToast from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";
export default function newPass() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { invokeToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  // Get the validation result for the current password
  const passwordValidation = isPasswordValid(password);

  const handlePasswordReset = async () => {
    try {
      setIsLoading(true);
      const response = await resetPassword(password, token);
      console.log(response);
      invokeToast("Password Reset Successful", "Success");
      router.push("/auth/pass-changed");
    } catch (error) {
      console.log(error);
      invokeToast(
        error?.response?.data?.message || "Something Went Wrong",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=' text-white h-auto w-[345px]  flex flex-col justify-between items-start gap-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='running-text-large'>Enter your new password</h1>
      </div>
      <div className='flex flex-col gap-6 w-full'>
        <div className='flex flex-col gap-3'>
          <CustomInput
            placeholder='NEW PASSWORD'
            onChange={(value) => setPassword(value)}
            value={password}
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

          <ul>
            <CustomValidationtext
              text='At least 8 characters'
              validator={passwordValidation.hasMinLength}
            />
            <CustomValidationtext
              text='Contains a number'
              validator={passwordValidation.hasNumber}
            />
            <CustomValidationtext
              text='Contains a special character'
              validator={passwordValidation.hasSpecialChar}
            />
          </ul>
        </div>
        <div className='flex flex-col gap-2'>
          <CustomInput
            placeholder='CONFIRM PASSWORD'
            onChange={(value) => setConfirmPassword(value)}
            value={confirmPassword}
            type={isConfirmPasswordVisible ? "text" : "password"}
            icon={
              <img
                onClick={toggleConfirmPasswordVisibility}
                src={
                  isConfirmPasswordVisible
                    ? "/Icons/Eye.svg"
                    : "/Icons/EyeClosed.svg"
                }
                alt='Toggle Password Visibility'
                className='h-5 w-5 invert cursor-pointer '
              />
            }
          />
          {
            // Show the validation text only if the password is not empty
            password && confirmPassword && password !== confirmPassword && (
              <CustomValidationtext
                text='Passwords do not match'
                validator={password === confirmPassword}
              />
            )
          }
        </div>
        <CustomButton
          variant={"primary"}
          className={"font-bold"}
          onClick={handlePasswordReset}
          disabled={
            isLoading ||
            !passwordValidation.hasSpecialChar ||
            !passwordValidation.hasNumber ||
            !passwordValidation.hasMinLength ||
            password !== confirmPassword
          }
        >
          {isLoading ? "LOADING..." : "RESET PASSWORD"}
        </CustomButton>
        <div className='w-full flex flex-col gap-4 '>
          <Link href='/auth/sign-up' className='running-text-small'>
            Back to sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
