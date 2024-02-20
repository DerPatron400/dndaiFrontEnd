"use client";
import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Info } from "lucide-react";
import EnableSound from "../../util/SoundModal";
import Link from "next/link";
import Accounts from "../../Accounts";
import useSoundStore from "@/utils/store";
import useUserStore from "@/utils/store/userStore";
import Cookies from "universal-cookie";
import TextToSpeech from "@/components/shared/TextToSpeech";
import { Tooltip } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { switchMode } from "@/api/switchMode";

const Navbar = () => {
  const cookie = new Cookies();
  const { audio, setAudio } = useSoundStore((state) => state);
  const { user } = useUserStore((state) => state);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const isNewGame = usePathname().includes("newgame");

  const [playing, setPlaying] = useState(false);

  const [isPurple, setIsPurple] = useState(true);

  const handleSwitchMode = async () => {
    console.log("Calling Switched mode .....");
    try {
      // Assuming 'user' object has a property 'token'
      const token = user?.token;

      if (!token) {
        console.error("Authentication token is missing.");
        // Handle the case where the token is missing
        return;
      }

      // Call the switchMode function from your API with the authentication token
      await switchMode(token);
      setIsPurple((prevState) => !prevState);

      // Optionally, you can perform additional actions after switching mode if needed
      console.log("Switched mode successfully");
    } catch (error) {
      console.error("Error switching mode:", error);
      // Handle errors as needed
    }
  };


  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      cookie.set("uid", "", { path: "/" });
    }
  }, [user]);

  useEffect(() => {
    if (!audio) return;
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);
  useEffect(() => {
    if (!audio) setAudio(new Audio("/Audio/ambient.mp3"));

    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className='flex py-8 md:p-4 z-[20] fixed  top-0 left-0 w-[100%] h-[8vh] bg-black items-center justify-between'>
      <EnableSound setPlaying={setPlaying} />
  
      <div className='flex flex-row items-center justify-between w-full z-[20]'>
        <Link href='/' className='cursor-pointer hover:bg-transparent z-[20]'>
          <img src='/Logo/white.png' alt='Logo' className='h-16 w-16 z-[20]' />
        </Link>
        <div
      onClick={handleSwitchMode}
      className='cursor-pointer rounded-full p-2'
      style={{
        background: isPurple ? 'purple' : 'green',
        border: '1px solid #fff', // Optional: Add a border for better visibility
        transition: 'background-color 0.3s ease', // Optional: Add a smooth transition effect
      }}
    >
    </div>
        <div className='flex  items-center space-x-2 pr-2 z-[20]'>
        <TextToSpeech />
  
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
  
          {/* Display Account-related content in the Navbar */}
          
            <>
              <Tooltip content='Your Purple Credits'>
                <Link href={"/shop"}>
                  {!isMobile && (
                    <div className='w-14 h-9 rounded-full text-white text-sm font-semibold flex gap-x-1 items-center justify-center '>
                      <span>{user?.credits}</span>
                      <img
                        src='/images/CreditsDndAi.png'
                        alt=''
                        className='w-4 h-6 bg-transparent'
                      />
                    </div>
                  )}
                </Link>
              </Tooltip>

              <Tooltip content='Your Green Credits'>
                <Link href={"/shop"}>
                  {!isMobile && (
                    <div className='w-14 h-9 rounded-full text-white text-sm font-semibold flex gap-x-1 items-center justify-center '>
                      <span>{user?.greenCredits}</span>
                      <img
                        src='/images/GreenCreditsDndAi.png'
                        alt=''
                        className='w-4 h-6 bg-transparent'
                      />
                    </div>
                  )}
                </Link>
              </Tooltip>

              {!isMobile && (
                <Tooltip content='Your Images'>
                  <Link href={"/gallery"}>
                    <div className='w-14 h-9 rounded-full text-white text-sm font-semibold flex gap-x-1 items-center space-x-1 '>
                      <span>Images</span>
                    </div>
                  </Link>
                </Tooltip>
              )}

              {!isMobile && (
                <Tooltip content='Your saved Characters'>
                  <Link href={"/game/saved"}>
                    <div className='w-14 h-9 rounded-full text-white text-sm font-semibold flex gap-x-1 items-center justify-center'>
                      <span>Saves</span>
                    </div>
                  </Link>
                </Tooltip>
              )}

              {!isMobile && (
                <Tooltip content='The dndai Shop'>
                  <Link href={"/shop"}>
                    <div className='w-14 h-9 rounded-full text-white text-sm font-semibold flex gap-x-1 items-center space-x-2 '>
                      <span>Shop</span>
                    </div>
                  </Link>
                </Tooltip>
              )}
            </>
        


          {isLoggedIn ? (
            <Accounts />
          ) : (
            
            <div className='flex gap-x-2'>
              <Link
                href='/auth/login'
                className='cursor-pointer text-md flex items-center justify-center text-black bg-white hover:bg-white hover:text-black px-4 py-1 rounded-md focus:outline-none transition-all duration-300 ease-in-outitems-center justify-center'
              >
                Login
              </Link>
              <Link
                href='/auth/register'
                className='cursor-pointer text-md bg-gradient-to-t from-green-950 to-green-500 text-white px-4 py-2  rounded-md hover:to-green-700 hover:from-green-400 transition-all items-center justify-center'
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
          }

export default Navbar;
