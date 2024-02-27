import React, { useEffect, useRef, useState } from "react";
import { Speech, XCircle } from "lucide-react";
import useIntroTextStore from "@/utils/store/introTextStore";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function TextToSpeech() {
  const [isTalking, setIsTalking] = useState(false);
  const { introText, playAudio } = useIntroTextStore((state) => state);

  const pathname = usePathname();
  const [audio, setAudio] = useState(null);
  const audioRef = useRef();

  const isNewGame = pathname.includes("/game/classic");
  useEffect(() => {
    if (!isNewGame) return;

    const getSpeech = async () => {
      const BASELINK = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log(BASELINK);
      audio?.pause();
      setAudio(null);
      setIsTalking(false);
      axios
        .post(
          BASELINK + "/tts",
          { responseText: introText.replaceAll("*", "") },
          { responseType: "arraybuffer" }
        )
        .then((response) => {
          const audioData = response.data;

          const audio = new Audio(
            URL.createObjectURL(new Blob([audioData], { type: "audio/mpeg" }))
          );
          console.log("audio", audio);
          console.log(audio);
          setAudio(audio);
          audioRef.current = audio;
        })
        .catch((error) => console.error("Error:", error));
    };
    console.log("here");
    if (playAudio) {
      getSpeech();
    } else {
      setAudio(null);
    }
  }, [playAudio]);
  useEffect(() => {
    if (!audio) return;
    isTalking ? audio.play() : audio.pause();
  }, [isTalking, isNewGame]);
  return (
    <div className={` flex justify-end items-end z-[50]`}>
      {isNewGame && audio && (
        <audio controls className='hidden md:block h-9 !w-60 ms-auto '>
          <source src={audio?.src} type='audio/ogg' />
          <source src={audio?.src} type='audio/mpeg' />
          Your browser does not support the audio element.
        </audio>
      )}

      {isNewGame && audio && (
        <div
          onClick={() => {
            setIsTalking(!isTalking);
          }}
          className='bg-white relative md:hidden  cursor-pointer p-2 rounded-full'
        >
          {isTalking ? <XCircle size={20} /> : <Speech size={20} />}
        </div>
      )}
    </div>
  );
}
