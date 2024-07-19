import React, { useEffect, useState, useRef } from "react";
import CharacterInfo from "@/components/character/myCharacter/character-sheet/characterInfo";
import AbilitiesInfo from "@/components/character/myCharacter/character-sheet/abilitiesInfo";
import GeneralInfo from "@/components/character/myCharacter/character-sheet/general";
import CustomButton from "@/components/ui/custom-button";
import Play from "@/components/ui/Icons/Play";
import Edit from "@/components/ui/Icons/Edit";
import Download from "@/components/ui/Icons/Download";
import Avatar from "./create-avatar/avatar";
import { usePathname, useRouter } from "next/navigation";
import { extractSection, isSelectionValid } from "@/lib/Helpers/shared";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import SoundButton from "@/components/ui/Shared/SoundButton";
import Generate from "@/components/ui/Icons/Generate";
import Delete from "@/components/ui/Icons/Delete";
import useUserStore from "@/utils/userStore";
import { cn } from "@/lib/utils";
import DeleteCharacter from "@/components/ui/Shared/Dialogue/DeleteCharacter";
import useCustomToast from "@/hooks/useCustomToast";
import { deleteCharacter, getCharacter } from "@/actions/character";
import Loader from "@/components/ui/Loader";
import useGameStore from "@/utils/gameStore";
export default function characterSheet({ character, setCharacter }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();
  const {
    currentCharacter,
    setCurrentCharacter,
    currentCampaign,
    campaignSelectTime,
  } = useGameStore();
  const { invokeToast } = useCustomToast();
  const containerRef = useRef();
  const [open, setOpen] = useState(false);
  const [appearance, setAppearance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [deleteCharacterLoading, setDeleteCharacterLoading] = useState(false);
  const [currentPortrait, setCurrentPortrait] = useState(
    character.personal.portraitUrl
  );
  const isCreator = user?._id === character?.userId;
  console.log(isCreator);

  // useEffect(() => {
  //   let _appearance = extractSection(character.value, "appearance:character.personal.appearance")?.trim();
  //   setAppearance:character.personal.appearance(_appearance:character.personal.appearance);
  // }, [character]);

  useEffect(() => {
    const container = containerRef.current;
    if (open) {
      //remove scorll
      container.style.height = "100vh !important";
      container.style.overflow = "hidden !important";
    } else {
      //add scroll
      container.style.height = "auto";
      container.style.overflow = "auto";
    }
  }, [open]);

  const handleDeleteCharacter = async () => {
    setDeleteCharacterLoading(true);
    try {
      await deleteCharacter(character._id, user?.token);
      if (currentCharacter?._id === character._id) setCurrentCharacter(null);
      router.push("/character/my-characters");
      invokeToast("Character Deleted Successfully", "Success");
    } catch (error) {
      console.log(error);
      invokeToast(
        error?.response?.data?.error || "Something Went Wrong",
        "Error"
      );
    } finally {
      setDeleteCharacterLoading(false);
    }
  };

  const handlePlayWithCharacter = async () => {
    try {
      setIsLoading(true);
      const characterId = character._id;

      const { character: _character } = await getCharacter(
        characterId,
        user?.token
      );

      setCurrentCharacter(_character);
      if (!isSelectionValid(currentCampaign, campaignSelectTime)) {
        router.push("/game/campaign-selection");
      } else {
        router.push("/game/play");
      }
    } catch (error) {
      invokeToast(
        error?.response?.data?.error || "Error playing character",
        "Error"
      );
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (deleteCharacterLoading) return <Loader text={"Deleting Character ..."} />;

  return (
    <div
      ref={containerRef}
      className='h-full min-h-screen w-screen pt-[94px] px-5 pb-64 md:pt-[120px] md:pb-[104px] md:px-12 flex flex-col gap-[24px]'
    >
      <div className='hidden md:flex justify-start gap-[32px]'>
        <CustomButton
          onClick={() => {
            setOpen(true);
            if (character?.personal?.portraits?.length > 0) {
              router.push(pathname);
            } else {
              router.push(pathname + "?generateAvatar=true");
            }
          }}
        >
          {character?.personal?.portraits?.length > 0 ? (
            <Edit fill='white' className='h-5 w-5 opacity-70' />
          ) : (
            <Generate className='h-5 w-5 opacity-70 fill-white' />
          )}
          {character?.personal?.portraits?.length > 0 ? "Change " : "Create "}
          character portrait
        </CustomButton>
        <CustomButton variant='subtle'>
          <Download fill='white' className='h-5 w-5 opacity-70 text-white' />
          Download character sheet
        </CustomButton>
        <DeleteCharacter action={handleDeleteCharacter}>
          <CustomButton
            withIcon={true}
            variant='subtle'
            className={cn(!isCreator && "hidden")}
          >
            <Delete className='h-5 w-5 opacity-70 fill-errorRed' />
            Delete
          </CustomButton>
        </DeleteCharacter>
      </div>
      <div className=' h-full grid grid-cols-8 gap-5 '>
        <div className='col-span-8 md:col-span-2 relative'>
          <CharacterInfo
            loadingAvatar={loadingAvatar}
            currentPortrait={currentPortrait}
            character={character}
          />
        </div>
        <div className=' col-span-8 md:col-span-4 w-auto gap-[24px] flex flex-col'>
          <GeneralInfo character={character} />
        </div>

        <div className=' col-span-8 md:col-span-2  flex flex-col gap-[24px]'>
          <AbilitiesInfo character={character} />
        </div>
      </div>
      <Avatar
        open={open}
        setOpen={setOpen}
        payload={{
          appearance: character.value.appearance,
          id: character?._id,
        }}
        setCurrentPortrait={setCurrentPortrait}
        setLoadingAvatar={setLoadingAvatar}
        character={character}
        setCharacter={setCharacter}
        avatars={character?.personal?.portraits || []}
      />
      <div className='md:hidden z-[10] flex items-center justify-between bg-blur-bottom-menu fixed bottom-0 w-screen left-0 p-5 '>
        <div className='flex items-center gap-4'>
          <SoundButton />
          <CustomIconbutton
            onClick={() => {
              setOpen(true);
              router.push(pathname);
            }}
          >
            <Edit fill='white' className='h-5 w-5  ' />
          </CustomIconbutton>
        </div>
        <CustomButton
          disabled={isLoading}
          onClick={handlePlayWithCharacter}
          variant={"primary"}
        >
          <Play className='h-5 w-5 opacity-70' />
          Play Now
        </CustomButton>
      </div>
    </div>
  );
}
