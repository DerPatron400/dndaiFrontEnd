import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import Cookie from "universal-cookie";
import useUserStore from "@/utils/store/userStore";
import toast from "react-hot-toast";

import { login } from "@/api/auth";
import SocialAuths from "./SocialAuths";

export default function Login() {
  const cookies = new Cookie();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupRedirect = () => {
    router.push("/auth/register");
  };

  const submitForm = async (e) => {
    e.preventDefault();

    let formData = e.target;

    const username = formData.username.value;
    const password = formData.password.value;
    try {
      setIsLoading(true);
      const data = await login(username, password);
      console.log(data);

      setUser(data);
      cookies.set("uid", data._id, { path: "/" });
      cookies.set("token", data.token, { path: "/" });

      toast.success("Login Successful");
      router.push("/");

      // Handle errors, such as displaying a message to the user
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("An error occurred:", error.status);
      // Handle network errors, such as displaying a message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif !important",
      }}
      className='flex h-screen w-screen relative'
    >
      <div className='w-1/2 h-full hidden md:block relative'>
        <img
          src='/images/auth.png'
          alt='Login'
          className='w-full h-full object-cover'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-30'></div>
      </div>
      <div className='md:w-1/2 w-[100vw] flex items-center justify-center p-8 text-white bg-black'>
        <div className='w-96 '>
          <div className='flex flex-col justify-center items-center'>
            <h2 className='text-3xl font-bold mb-2'>Login</h2>
            <p className='text-white text-sm mb-6 flex justify-center items-center'>
              Log in to your account to continue
            </p>
          </div>
          <form id='loginForm' className='space-y-6 ' onSubmit={submitForm}>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='mb-2 block text-md text-white'
              >
                Enter your username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='john_doe123'
                required
                className='w-full px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='mb-2 block text-md text-white'
              >
                Enter your password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='YourSecurePassword123'
                required
                className='w-full px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-blue-500'
              />
            </div>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full  disabled:opacity-60 disabled:cursor-not-allowed  bg-gradient-to-t from-green-950 to-green-500 text-white px-4 py-2  rounded-md hover:to-green-700 hover:from-green-400  focus:outline-none transition-colors duration-300'
            >
              {isLoading ? "Logging In" : "Login"}
            </button>

            <div className='justify-center flex w-full opacity-60 text-lg'>
              Or
            </div>

            <SocialAuths />
          </form>
          <button
            onClick={handleHomeClick}
            className='absolute top-4 right-4 text-white hover:text-green-500 transition-colors duration-300'
          >
            <Home />
          </button>
          <div className=' w-full md:w-1/2 absolute bottom-5 right-0 flex items-center justify-center'>
            <p className='text-sm '>
              No account yet?{" "}
              <span
                className=' text-green-300 cursor-pointer transition-colors duration-300'
                onClick={handleSignupRedirect}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
