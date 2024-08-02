import React, { useState, useRef } from "react";

import CustomIconbutton from "@/components/ui/custom-iconbutton";
import Sound from "../Icons/Sound";
import SoundOff from "../Icons/SoundOff";

export default function SoundButton() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef(null);

  function toggleSound() {
    setIsSoundOn((prev) => !prev);
    console.log("here");
    if (isSoundOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }

  return (
    <>
      <CustomIconbutton onClick={toggleSound}>
        {isSoundOn ? (
          <Sound className="h-5 w-5 fill-white" />
        ) : (
          <SoundOff className="h-5 w-5 fill-white" />
        )}
      </CustomIconbutton>
      <audio loop autoplay ref={audioRef} src="/audio/ambient.mp3" />
    </>
  );
}
