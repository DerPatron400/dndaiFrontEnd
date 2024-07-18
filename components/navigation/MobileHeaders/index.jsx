import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useUserStore from "@/utils/userStore";
import { STEP_NAMES } from "@/components/character/createCharacter/constants";
import useStepperStore from "@/utils/characterStore";
import { cn } from "@/lib/utils";
import useControlsStore from "@/utils/controlsStore";
const campaignSubpageRegex = /^\/campaign\/[a-fA-F0-9]{24}$/;
export default function index() {
  const pathname = usePathname();
  const { showMenu } = useControlsStore();
  const {
    totalCharacters,
    totalCampaigns,
    totalFavCampaigns,
    totalImages,
    totalPublicImages,
  } = useUserStore();
  const { activeStep } = useStepperStore();

  const noHeading =
    pathname === "/" ||
    pathname.includes("pricing") ||
    campaignSubpageRegex.test(pathname) ||
    pathname.includes("character/sheet") ||
    pathname.includes("game");
  const signIn = pathname.includes("sign-in");
  const signUp = pathname.includes("sign-up");
  const discover = pathname === "/discover";
  const myCharacters = pathname.includes("/my-characters");
  const myCampaigns =
    pathname.includes("/my-campaigns") && !pathname.includes("favorites");
  const myFavCampaigns = pathname.includes("/my-campaigns/favorites");
  const createCharacter = pathname.includes("/character/create");
  const createCampaign = pathname.includes("/campaign/create");
  const myImages = pathname.includes("/my-account/gallery");
  const publicGallery = pathname.includes("/discover/gallery");

  if (noHeading) return null;

  const renderHeader = () => {
    if (signUp) {
      return (
        <div className=' flex-col gap-2 flex'>
          <h1 className='headline-3 '>Create account</h1>
          <span className='text-gray2 running-text-small '>
            Already have an account?{" "}
            <Link className='text-white' href={"/auth/sign-in"}>
              Sign in
            </Link>
          </span>
        </div>
      );
    } else if (signIn) {
      return (
        <div className='flex-col gap-2 flex '>
          <h1 className='headline-3'>Sign in</h1>
          <span className='text-gray2 running-text-small'>
            No account yet?{" "}
            <Link className='text-white' href={"/auth/sign-up"}>
              Create an account
            </Link>
          </span>
        </div>
      );
    } else if (discover) {
      return <span className='headline-3  '>Discover</span>;
    } else if (myCharacters) {
      return (
        <div
          className={cn(
            "flex w-full items-center justify-between",
            totalCharacters === 0 && "hidden"
          )}
        >
          <span className='headline-3   '>
            My characters
            {totalCharacters && !showMenu && (
              <span className='text-gray2 ms-3   font-roboto-mono transform translate-up text-[17px]  translate-y-[-15px] '>
                ({totalCharacters})
              </span>
            )}
          </span>
        </div>
      );
    } else if (myCampaigns) {
      return (
        <div
          className={cn(
            "flex w-full items-center justify-between",
            totalCampaigns === 0 && "hidden"
          )}
        >
          <span className='headline-3 z  '>
            My campaigns
            {totalCampaigns && !showMenu && (
              <span className='text-gray2 ms-3  font-roboto-mono transform translate-up text-[17px]  translate-y-[-15px] '>
                ({totalCampaigns})
              </span>
            )}
          </span>
        </div>
      );
    } else if (createCharacter) {
      return (
        <div
          className={"flex flex-col gap-2 w-full    md:hidden   justify-end"}
        >
          <h1 className='text-center flex justify-start text-white headline-3 -z-1 '>
            Create your character
          </h1>
          <div className=' headline-4   w-full '>
            <span className='text-gray2'>Step {activeStep + 1}/9</span>
            <span className='text-white'> {STEP_NAMES[activeStep]}</span>
          </div>
        </div>
      );
    } else if (createCampaign) {
      return (
        <div className={"flex flex-col gap-2  justify-end "}>
          <h1 className='text-center flex justify-start text-white headline-3 -z-1 '>
            Create your own campaign
          </h1>
        </div>
      );
    } else if (myFavCampaigns) {
      return (
        <div
          className={cn(
            "flex w-full items-center justify-between",
            totalFavCampaigns === 0 && "hidden"
          )}
        >
          <span className='headline-3  '>
            Favorites
            {totalFavCampaigns && !showMenu && (
              <span className='text-gray2 ms-3  font-roboto-mono transform translate-up text-[17px]  translate-y-[-15px] '>
                ({totalFavCampaigns})
              </span>
            )}
          </span>
        </div>
      );
    } else if (myImages) {
      return (
        <span className='headline-3  '>
          My Images
          {totalImages && !showMenu && (
            <span className='text-gray2 ms-3  font-roboto-mono transform translate-up text-[17px]  translate-y-[-15px]'>
              ({totalImages})
            </span>
          )}
        </span>
      );
    } else if (publicGallery) {
      return (
        <span className='headline-3  '>
          Gallery
          {totalPublicImages && !showMenu && (
            <span className='text-gray2 ms-3  font-roboto-mono transform translate-up text-[17px]  translate-y-[-15px]'>
              ({totalPublicImages})
            </span>
          )}
        </span>
      );
    }
  };

  return <div className='  text-white md:hidden'>{renderHeader()}</div>;
}
