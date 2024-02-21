import ImageComponent from "./ImageComponent";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useUserStore from "@/utils/store/userStore";
import useIntroTextStore from "@/utils/store/introTextStore";
import { useRouter } from "next/navigation";


const startGame = () => {
  if (!user) {
    toast.error("Please login to play the game");
    return;
  }

  router.push("/game/new");
};

const Images = ({ data }) => {

    //states
    const [userName, setUserName] = useState("");
    const { user } = useUserStore((state) => state);
    const { setIntroText } = useIntroTextStore((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      AOS.init();
    }, []);
  
    useEffect(() => {
      setUserName(user?.username);
    }, [user]);
  
    const startGame = () => {
      if (!user) {
        toast.error("Please login to play the game");
        return;
      }
  
      router.push("/");
    };

  return (
    <div className='relative w-full    mx-auto  h-auto text-white rounded-md shadow-lg font-sans'>
      <div className='relative'>
        <img
          src='/dice2.png'
          alt='Header Image Alt Text'
          className='w-full h-[70vh] object-cover mb-4 rounded-md'
        />

        <div className='absolute inset-0 bg-black opacity-40 rounded-md'></div>

        <h1 className='text-[2rem] text-center sm:text-[3rem] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
        Your  <span className='text-green-500'>DnDAI </span>Images
        </h1>
      </div>
      <div className='flex flex-wrap justify-center mb-10'>
        {data.length === 0 ? (
          <div className="flex flex-col w-full items-center pt-[0%] gap-y-2">
            <span className="opacity-60">  
            No images have been saved yet; however, all images generated within your games will be stored here, allowing you to effortlessly view, save, or utilize them in any manner without concerns about copyright restrictions.{" "}
            </span>
            <button
              onClick={startGame}
              className="bg-gradient-to-t from-green-950 to-green-500 text-white px-4 py-2  rounded-md hover:to-green-700 hover:from-green-400  mb-2 sm:mb-2 hover:bg-green-600 focus:outline-none transition-colors duration-300"
            >
              Play Game
            </button>
          </div>
        ) : (
          data.map((image, index) => (
            <ImageComponent key={index} index={index} image={image} />
          ))
        )}
      </div>
    </div>
  );
};

export default Images;
