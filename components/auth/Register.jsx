"use client";
import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import toast from "react-hot-toast";
import Cookie from "universal-cookie";
import useUserStore from "@/utils/store/userStore";
import { register } from "@/api/auth";
import SocialAuths from "./SocialAuths";

const initialState = {
  email: "",
  username: "",
  password: "",
};

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState(initialState);
  const cookies = new Cookie();
  const setUserStore = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [valid, setValid] = useState({
    username: true / false,
    password: true / false,
    email: true / false,
  });

  const handleSigninRedirect = () => {
    router.push("/auth/login");
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  const isValidEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  };
  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  const isValid = () => {
    if (
      user.username.length === 0 ||
      user.username.length > 25 ||
      user.username.length < 3
    ) {
      setValid({ ...valid, username: false });
    } else {
      setValid({ ...valid, username: true });
    }
    if (!isValidEmailValid(user.email)) {
      setValid((prev) => {
        return { ...prev, email: false };
      });
    } else {
      setValid((prev) => {
        return { ...prev, email: true };
      });
    }
    if (!isValidPassword(user.password)) {
      setValid((prev) => {
        return { ...prev, password: false };
      });
    } else {
      setValid((prev) => {
        return { ...prev, password: true };
      });
    }

    return valid.username && valid.email && valid.password;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      toast.error("Please fill all the fields with valid data");
      return;
    }
    setIsLoading(true);

    try {
      const data = await register({
        email: user.email,
        username: user.username,
        password: user.password,
      });

      toast.success(
        "An Email has been sent to your email address for verification. Please verify your email to continue."
      );
      handleSigninRedirect();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-screen w-screen relative'>
      <div className='w-1/2 h-full hidden md:block'>
        <img
          src='/images/auth.png'
          alt='Register'
          className='w-full h-full object-cover'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-30'></div>
      </div>
      <div className='md:w-1/2 w-[100vw] flex items-center bg-black justify-center p-8 text-white relative z-10'>
        <div className='w-96'>
          <div className='flex flex-col justify-center items-center'>
            <h2 className='text-3xl font-bold mb-2'>Sign Up</h2>
            <p className='text-white text-sm mb-5 text-center'>
              Create a new account to get started
            </p>
          </div>
          <form id='registerForm' className='space-y-2' onSubmit={handleSignup}>
            <div>
              <label htmlFor='email' className='mb-1 block text-md text-white'>
                Enter your email
              </label>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='john.doe@example.com'
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className='w-full px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-blue-500'
              />
              {!valid.email && (
                <p className='text-red-500 text-xs mt-1'>
                  Please enter a valid email
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='username'
                className='mb-1 block text-md text-white'
              >
                Choose a username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='john_doe123'
                required
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className='w-full px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-blue-500'
              />
              {!valid.username && (
                <p className='text-red-500 text-xs mt-1'>
                  Please enter a valid username
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='password'
                className='mb-1 block text-md text-white'
              >
                Enter your password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='********'
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className='w-full px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-blue-500'
              />
              {!valid.password && (
                <p className='text-red-500 text-xs mt-1'>
                  Atleast 8 characters including uppercase, lowercase and digit
                </p>
              )}
            </div>
            <button
              disabled={isLoading}
              type='submit'
              // onClick={handleSignup}
              className='w-full  bg-gradient-to-t from-green-950 to-green-500 text-white px-4 py-2  rounded-md hover:to-green-700 hover:from-green-400  focus:outline-none transition-colors duration-300'
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
            <div className='justify-center flex w-full opacity-60 text-lg'>
              Or
            </div>

            <SocialAuths isSignup />
          </form>
          <button
            onClick={handleHomeClick}
            className='absolute top-4 right-4 text-white hover:text-green-500 transition-colors duration-300'
          >
            <Home />
          </button>
          <div className=' w-full absolute bottom-5 right-0 flex items-center justify-center'>
            <p className='text-sm '>
              If you already have an account, please{" "}
              <span
                className=' text-green-300 cursor-pointer transition-colors duration-300'
                onClick={handleSigninRedirect}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
