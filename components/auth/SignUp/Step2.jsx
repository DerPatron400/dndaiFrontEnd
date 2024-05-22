import React, { useEffect, useState } from "react";
import CustomInput from "../../ui/custom-input";
import CustomButton from "../../ui/custom-button";
import { Checkbox } from "../../ui/checkbox";
import {
  register,
  verifyEmailExists,
  verifyUserNameExists,
} from "@/actions/auth";
import useCustomToast from "@/hooks/useCustomToast";
import { isPasswordValid } from "@/lib/Helpers/auth";
import CustomValidationtext from "@/components/ui/custom-validationtext";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
export default function Step2({ setStep, user, setUser, reset }) {
  const router = useRouter();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const { invokeToast } = useCustomToast();
  const [agreeTOC, setAgreeTOC] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const debounceUsername = useDebounce(user.username, 150);
  const [usernameExists, setUsernameExists] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);

  useEffect(() => {
    const checkUsername = async () => {
      console.log("request");
      try {
        const exists = await verifyUserNameExists(debounceUsername);
        console.log(exists);
        setUsernameExists(exists);
      } catch (error) {
        invokeToast(
          error?.response?.data?.message || "Something Went Wrong",
          "error"
        );
      }
    };
    if (debounceUsername?.length > 2) checkUsername();
  }, [debounceUsername]);

  const onChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };
  const invalidData = () => {
    return (
      user.username.length < 3 ||
      user.name.length < 2 ||
      user.surname.length < 2 ||
      user.password.length < 8 ||
      !agreeTOC
    );
  };

  const handleCreateAccount = async () => {
    try {
      setIsLoading(true);
      const response = await register({
        name: user.name + " " + user.surname,
        username: user.username,
        email: user.email,
        password: user.password,
      });

      invokeToast(
        "A verification email has been sent to your email",
        "Success"
      );
      router.push("/auth/sign-in");
      reset();
    } catch (error) {
      invokeToast(
        error?.response?.data?.message || "Something Went Wrong",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Get the validation result for the current password
  const passwordValidation = isPasswordValid(user.password);

  return (
    <div className='w-full h-auto flex flex-col gap-6'>
      <div>
        <CustomInput
          placeholder='USERNAME'
          value={user.username}
          onChange={(value) => onChange("username", value)}
          error={usernameExists}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
          icon={
            !usernameExists &&
            user.username.length > 2 && (
              <img
                src='/Icons/Success.png'
                alt='Success'
                className=' h-4 w-4'
              />
            )
          }
        />
        {usernameFocused && usernameExists && user.username.length > 2 && (
          <CustomValidationtext
            validator={!usernameExists}
            text={"Username is already taken"}
          />
        )}
      </div>
      <CustomInput
        placeholder='E-MAIL'
        value={user.email}
        disabled
        onChange={(value) => {}}
        icon={
          user.email && (
            <img src='/Icons/Success.png' alt='Success' className=' h-4 w-4' />
          )
        }
      />
      <CustomInput
        placeholder='NAME'
        value={user.name}
        onChange={(value) => onChange("name", value)}
        icon={
          user.name.length > 2 && (
            <img src='/Icons/Success.png' alt='Success' className=' h-4 w-4' />
          )
        }
      />
      <CustomInput
        placeholder='SURNAME'
        value={user.surname}
        onChange={(value) => onChange("surname", value)}
        icon={
          user.surname.length > 2 && (
            <img src='/Icons/Success.png' alt='Success' className=' h-4 w-4' />
          )
        }
      />
      <div className='flex flex-col gap-3'>
        <CustomInput
          placeholder='PASSWORD'
          value={user.password}
          type={showPassword ? "text" : "password"}
          onChange={(value) => onChange("password", value)}
          className={`
            ${isPasswordFocused ? "border-irisPurpleLight" : "border-gray2"}
          `}
          icon={
            showPassword ? (
              <img
                src='/Icons/Eye.svg'
                onClick={() => setShowPassword(false)}
                alt='Success'
                className=' h-5 w-5 cursor-pointer invert'
              />
            ) : (
              <img
                src='/Icons/EyeClosed.svg'
                onClick={() => setShowPassword(true)}
                alt='Success'
                className=' h-5 w-5 cursor-pointer invert'
              />
            )
          }
          error={
            !passwordValidation.hasMinLength ||
            !passwordValidation.hasNumber ||
            !passwordValidation.hasSpecialChar
          }
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        {isPasswordFocused && (
          <div>
            <CustomValidationtext
              validator={passwordValidation.hasMinLength}
              text={"At least 8 characters"}
            />
            <CustomValidationtext
              validator={passwordValidation.hasNumber}
              text={"Contains a number"}
            />
            <CustomValidationtext
              validator={passwordValidation.hasSpecialChar}
              text={"Contains a special character"}
            />
          </div>
        )}
      </div>
      <div className='flex w-full justify-center items-center gap-3'>
        <Checkbox
          checked={agreeTOC}
          onCheckedChange={(value) => setAgreeTOC(value)}
          className='border border-irisPurpleLight h-[20px] w-[20px]'
        />
        <span className='text-white running-text-small  text-left'>
          By selecting I agree to the dndai{" "}
          <span className='text-irisPurpleLight'>terms and conditions. </span>
          You can read how we use and protect your data in our{" "}
          <span className='text-irisPurpleLight'>privacy policy.</span>
        </span>
      </div>
      <div className='w-full'>
        <CustomButton
          variant={"primary"}
          disabled={invalidData() || isLoading}
          onClick={handleCreateAccount}
          className={"w-full font-bold"}
        >
          {isLoading ? (
            "LOADING..."
          ) : (
            <>
              CREATE ACCOUNT{" "}
              <img src='/Icons/ArrowRight.svg' alt='' className='h-5 w-5' />
            </>
          )}
        </CustomButton>
      </div>
    </div>
  );
}
