import React from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

export default function Register() {
  const router = useRouter();

  const handleSigninClick = () => {
    router.push("/signup");
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div className="flex h-screen w-screen relative">
      <div className="w-1/2 h-full hidden md:block">
        <img
          src="/auth.jpg"
          alt="Register"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
      </div>
      <div className="md:w-1/2 w-[100vw] flex items-center bg-black justify-center p-8 text-white relative z-10">
        <div className="w-96">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
            <p className="text-white text-sm mb-6 text-center">
              Create a new account to get started
            </p>
          </div>
          <form
            id="registerForm"
            action="/signup"
            method="post"
            className="space-y-6"
          >
            <div>
              <label htmlFor="email" className="mb-2 block text-md text-white">
                Enter your email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="john.doe@example.com"
                required
                className="w-full px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-md text-white"
              >
                Choose a username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="john_doe123"
                required
                className="w-full px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-md text-white"
              >
                Enter your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="YourSecurePassword123"
                required
                className="w-full px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none transition-colors duration-300"
            >
              Signup
            </button>
            <p className="text-sm mt-4">
              If you already have an account, please{" "}
              <span
                className="text-white hover:text-green-300 cursor-pointer transition-colors duration-300"
                onClick={handleSigninClick}
              >
                Sign in
              </span>
            </p>
          </form>
          <button
            onClick={handleHomeClick}
            className="absolute top-4 right-4 text-white hover:text-green-500 transition-colors duration-300"
          >
            <FaHome size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
