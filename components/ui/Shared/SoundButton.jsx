import React, { useState } from "react";

import CustomIconbutton from "@/components/ui/custom-iconbutton";
export default function SoundButton() {
  const [isSoundOn, setIsSoundOn] = useState(true);

  function toggleSound() {
    setIsSoundOn(!isSoundOn);
  }

  return (
    <CustomIconbutton onClick={toggleSound}>
      <img
        src={isSoundOn ? "/Icons/Sound.svg" : "/Icons/SoundOff.svg"}
        alt="Sound Toggle"
        className="h-5 w-5 invert"
      />
    </CustomIconbutton>
  );
}
