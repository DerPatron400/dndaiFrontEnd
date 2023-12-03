import React from "react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const handleSignupClick = () => {
    router.push("/register");
  };


  const BACKEND_LOGIN_URL = 'https://dndai.app/login'
  const submitForm = async(e) => {
    e.preventDefault();

    console.log(e)

    let formData = e.target;

    const username = formData.username.value;
    const password = formData.password.value;

    //console.log(username)
    //console.log(password)

    try {
      // Send the form data to your backend
      const response = await fetch(BACKEND_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });

      // Handle the response from the backend
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        router.push("/");
      } else {
        console.error('Login failed:', response.status);
        // Handle errors, such as displaying a message to the user
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle network errors, such as displaying a message to the user
    }
  }


  return (
    <div className="flex h-screen w-screen relative">
      <div className="w-1/2 h-full hidden md:block relative">
        <img
          src="/auth.jpg"
          alt="Login"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
      </div>
      <div className="md:w-1/2 w-[100vw] flex items-center justify-center p-8 text-white bg-black">
        <div className="w-96">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-2">Login</h2>
            <p className="text-white text-sm mb-6 flex justify-center items-center">
              Log in to your account to continue
            </p>
          </div>
          <form
            id="loginForm"
            className="space-y-6"
            onSubmit={submitForm}
          >
            <div className="mb-4">
              <label
                htmlFor="username"
                className="mb-2 block text-md text-white"
              >
                Enter your username
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
            <div className="mb-4">
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
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
            >
              Login
            </button>
            <p className="text-sm mt-4">
              No account yet?{" "}
              <span
                className="text-white hover:text-green-300 cursor-pointer"
                onClick={handleSignupClick}
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
