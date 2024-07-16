"use client";
import React, { useEffect, useRef, useState } from "react";
import AccountDropdown from "@/components/account/accountDropdown";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { cn } from "@/lib/utils";
import CustomButton from "../ui/custom-button";
import DrawerMenu from "./DrawerMenu";
import Link from "next/link";

import { usePathname } from "next/navigation";
import useControlsStore from "@/utils/controlsStore";
import useUserStore from "@/utils/userStore";
import Menu from "@/components/ui/Icons/Menu";
import Play from "@/components/ui/Icons/Play";
import { getCharacter, getCharacters } from "@/actions/character";
import useGameStore from "@/utils/gameStore";
import { useRouter } from "next/navigation";
import { getCampaignBySlug } from "@/actions/campaigns";
import { isSelectionValid } from "@/lib/Helpers/shared";
import SoundButton from "../ui/Shared/SoundButton";
import MobileHeader from "@/components/navigation/MobileHeaders/index";
import useCustomToast from "@/hooks/useCustomToast";
export default function Navbar({ variant, characterSheet }) {
  const { showMenu, setShowMenu } = useControlsStore();
  const { isMobile } = useDeviceDetect();
  const { invokeToast } = useCustomToast();

  const pathname = usePathname();
  const isSignUp = pathname.includes("/auth/sign-up");
  const { user } = useUserStore();
  const {
    setCurrentCharacter,
    setCurrentCampaign,
    currentCharacter,
    currentCampaign,
    characterSelectTime,
    campaignSelectTime,
  } = useGameStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const mobileBlurNotAllowed = pathname === "/";

  const characterCreatePage = pathname.includes("/character/create");
  const regex = /^\/campaign\/[a-fA-F0-9]{24}$/;

  const isCampaignSubpage = regex.test(pathname);

  const handlePlayWithCampaign = async () => {
    try {
      setIsLoading(true);
      const campaignId = pathname.split("/").pop();

      const { campaign, hasSingleCharacter, characterId } =
        await getCampaignBySlug(campaignId, user?.token);

      setCurrentCampaign(campaign);

      if (hasSingleCharacter) {
        const { character } = await getCharacter(characterId, user?.token);

        console.log("Has single character", character);
        setCurrentCharacter(character);
        router.push("/game/play");
        return;
      }
      if (!isSelectionValid(currentCharacter, characterSelectTime)) {
        router.push("/game/character-selection");
      } else {
        router.push("/game/play");
      }
    } catch (error) {
      invokeToast(error?.response?.data || "Error playing campaign", "Error");
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayWithCharacter = async () => {
    try {
      setIsLoading(true);
      const characterId = pathname.split("/").pop();

      const { character } = await getCharacter(characterId, user?.token);

      setCurrentCharacter(character);
      if (!isSelectionValid(currentCampaign, campaignSelectTime)) {
        router.push("/game/campaign-selection");
      } else {
        router.push("/game/play");
      }
    } catch (error) {
      invokeToast(error?.response?.data || "Error playing campaign", "Error");
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePlay = async () => {
    try {
      setIsLoading(true);
      const { characters } = await getCharacters(user?.token);
      if (characters.length === 0) {
        router.push("/character/create");
        return;
      } else if (characters.length === 1) {
        setCurrentCharacter(characters[0]);
        if (!isSelectionValid(currentCampaign, campaignSelectTime)) {
          router.push("/game/campaign-selection");
        } else {
          router.push("/game/play");
        }
        return;
      } else {
        router.push("/game/character-selection");
      }
    } catch (error) {
      invokeToast("Error fetching characters", "Error");
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleReditect = (path) => {
    router.push(path);
  };
  return (
    <div
      className={cn(
        "px-5 md:px-8 fixed top-0 pt-5 pb-4 gap-5  md:py-0 flex flex-col md:top-8 z-20 w-full",
        isMobile &&
          !mobileBlurNotAllowed &&
          !showMenu &&
          "bg-blur-bottom-menu md:bg-auto ",
        characterCreatePage && "pt-5"
      )}
    >
      <div
        className={cn(
          " running-text-mono w-full rounded-2xl md:border border-white/10 top-0 md:top-8 left-0 translate-x-[0] flex h-auto md:h-[64px]  justify-center md:p-[8px] md:ps-4 ",
          variant === "transparent" && "bg-transparent border-none",
          variant === "glass" && "md:bg-blur",
          isMobile && "bg-transparent border-0"
          //scrollFromTop.current > 100 && "bg-white/10 border-white/10 bg-blur"
        )}
      >
        {/* Mobile */}
        <div
          className={
            "w-full h-full rounded-lg text-white  md:hidden flex justify-between items-center"
          }
        >
          <Link
            href='/'
            className='text-white hover:text-gray1 transition-all duration-300 ease-in-out'
          >
            <img
              src='/Icons/Logo.svg'
              alt='logo'
              className='h-8 object-contain'
            />
          </Link>
          <Menu
            onClick={() => setShowMenu(true)}
            className='w-10 '
            fill='#9A9AC1'
          />

          <DrawerMenu characterCreatePage={characterCreatePage} />
        </div>
        {/* Desktop */}
        <div className=' w-full hidden h-full text-white  md:flex justify-between items-center'>
          <div className='flex justify-center items-center gap-6'>
            <Link
              href='/'
              className='text-white me-2 hover:text-gray1 transition-all duration-300 ease-in-out'
            >
              <img src='/Icons/Logo.svg' alt='logo' className='h-10' />
            </Link>

            <Link
              href='#'
              className='text-white hover:text-gray1 transition-all duration-300 ease-in-out '
            >
              HOW TO PLAY
            </Link>

            <Link
              href='/discover/gallery'
              className='text-white hover:text-gray1 transition-all duration-300 ease-in-out'
            >
              GALLERY
            </Link>
            <Link
              href='/pricing'
              className='text-white hover:text-gray1 transition-all duration-300 ease-in-out'
            >
              PRICING
            </Link>
          </div>
          <div className='flex justify-center items-center gap-5'>
            <span
              className={cn(
                "running-text-mono uppercase cursor-pointer",
                user && "hidden"
              )}
            >
              {isSignUp ? (
                <Link href={"/auth/sign-in"}>Sign In</Link>
              ) : (
                <Link href={"/auth/sign-up"}>Sign Up</Link>
              )}
            </span>
            <AccountDropdown />
            {variant === "transparent" ? (
              <SoundButton />
            ) : characterSheet || isCampaignSubpage ? (
              <CustomButton
                variant={"primary"}
                disabled={isLoading}
                withIcon={true}
                onClick={
                  isCampaignSubpage
                    ? handlePlayWithCampaign
                    : handlePlayWithCharacter
                }
              >
                <Play className='h-5 w-5 fill-russianViolet opacity-70' />
                {isCampaignSubpage ? "Play Campaign" : "PLAY Now"}
              </CustomButton>
            ) : (
              <CustomButton
                disabled={isLoading}
                onClick={handlePlay}
                variant={"primary"}
              >
                PLAY FOR FREE
              </CustomButton>
            )}
          </div>
        </div>
      </div>
      <MobileHeader />
    </div>
  );
}
