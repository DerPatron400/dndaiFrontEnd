import CustomIconbutton from "@/components/ui/custom-iconbutton";
import Generate from "@/components/ui/Icons/Generate";
import Settings from "@/components/ui/Icons/Settings";
import SoundButton from "@/components/ui/Shared/SoundButton";
import useUserStore from "@/utils/userStore";
import React, { useState, useEffect } from "react";
import SettingsMenu from "./settings";
import NarrationControls from "../NarrateControls";

export default function index({
  textSize,
  audio,
  loading,
  narrate,
  gameCharacter,
  setTextSize,
  setImageDialog,
  setNarrateDialog,
  setNarrate,
  handleSaveCharacter,
}) {
  const { user } = useUserStore();
  const [showMenu, setShowMenu] = useState(false);

  const detectClickOutside = (e) => {
    if (showMenu) {
      if (!e.target.closest(".settings-menu")) {
        setShowMenu(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", detectClickOutside);

    return () => {
      document.removeEventListener("click", detectClickOutside);
    };
  }, [showMenu]);
  return (
    <div className='lg:hidden flex flex-col items-center gap-5  w-full'>
      {showMenu && (
        <SettingsMenu
          textSize={textSize}
          gameCharacter={gameCharacter}
          showMenu={showMenu}
          setTextSize={setTextSize}
          setImageDialog={setImageDialog}
          setNarrateDialog={setNarrateDialog}
          handleSaveCharacter={handleSaveCharacter}
          setShowMenu={setShowMenu}
        />
      )}

      <NarrationControls
        audio={audio}
        setNarrate={setNarrate}
        narrate={narrate}
        loading={loading}
      />
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-5'>
          <CustomIconbutton onClick={() => setImageDialog(true)}>
            <Generate className='h-5 w-5 fill-white' />
          </CustomIconbutton>
          <SoundButton />

          <CustomIconbutton onClick={() => setShowMenu(!showMenu)}>
            <Settings className='h-5 w-5 fill-white' />
          </CustomIconbutton>
        </div>
        <div className='flex !running-text-mono items-center gap-5'>
          <div className='flex items-center gap-1'>
            {" "}
            <img
              src='/gems/Mythic.webp'
              alt=''
              className='h-[18px] object-contain '
            />
            {user.blueCredits}
          </div>
          <div className='flex  items-center gap-1'>
            <img
              src='/gems/Legendary.webp'
              alt=''
              className='h-[18px] object-contain '
            />
            {user.yellowCredits}
          </div>
        </div>
      </div>
    </div>
  );
}
