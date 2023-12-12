"use client";
import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import EnableSound from "../util/SoundModal";
import Link from "next/link";
import Accounts from "../Accounts";
import useSoundStore from "@/utils/store";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { audio, setAudio } = useSoundStore((state) => state);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!audio) return;
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);
  useEffect(() => {
    if (!audio) setAudio(new Audio("/Audio/ambient.mp3"));
  }, []);

  return (
    <div className='flex py-8 p-4 z-10 absolute top-0 left-0 w-[100%] h-[8vh] bg-black items-center justify-between'>
      <EnableSound setPlaying={setPlaying} />

      <div className='flex items-center justify-between w-full'>
        <Link href='/' className='cursor-pointer hover:bg-transparent'>
          <img src='/Logo/white.png' alt='Logo' className='h-16 w-16' />
        </Link>

        <div className='flex items-center space-x-4 pr-2'>
          <div
            onClick={() => {
              setPlaying(!playing);
            }}
            className='rounded-full bg-white p-2 cursor-pointer'
          >
            {!playing ? (
              <VolumeX size={20} color='black' />
            ) : (
              <Volume2 size={20} />
            )}
          </div>
          {isLoggedIn ? (
            <Accounts />
          ) : (
            <>
              {" "}
              <Link
                href='/login'
                className='cursor-pointer text-md text-black bg-white hover:bg-white hover:text-black px-4 py-1 rounded-md focus:outline-none transition-all duration-300 ease-in-out'
              >
                Login
              </Link>
              <Link
                href='/register'
                className='cursor-pointer text-md text-white bg-green-500 hover:bg-green-600 hover:text-white px-4 py-1 rounded-md focus:outline-none transition-all duration-300 ease-in-out'
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
