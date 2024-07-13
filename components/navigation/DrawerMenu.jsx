import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import Button from "@/components/ui/custom-button";
import CustomIcontext from "@/components/ui/custom-icontext";
import useUserStore from "@/utils/userStore";
import Link from "next/link";
import useControlsStore from "@/utils/controlsStore";
import Cancel from "../ui/Icons/Cancel";
import { useRouter } from "next/navigation";
import Play from "@/components/ui/Icons/Play";
import Discover from "../ui/Icons/Discover";
import CustomMenuItem from "../ui/custom-menu-item";
import Star from "../ui/Icons/Star";
import Settings from "../ui/Icons/Settings";
import Logout from "../ui/Icons/Logout";
import Cookie from "universal-cookie";

const UserLoggedIn = ({ handleRedirect }) => {
  const { showMenu, setShowMenu } = useControlsStore();
  const { user, setUser } = useUserStore();
  const cookies = new Cookie();

  const handleLogout = () => {
    setUser(null);
    cookies.set("token", null, { path: "/" });
    setShowMenu(false);
  };
  return (
    <div className='mx-[20px] mt-12 gap-[34px] flex flex-col running-text-mono uppercase pb-16'>
      <div className='gap-5 pb-4 flex flex-col'>
        <div className='flex flex-col gap-2'>
          <span className=' headline-4'>{user.username}</span>
          <span className='running-text-small lowercase text-gray2'>
            {user?.email}
          </span>
        </div>
        <div className='flex gap-5'>
          <CustomIcontext>
            <img
              src='/gems/Mythic.webp'
              alt=''
              className='h-[18px] object-contain '
            />
            {user.blueCredits}
          </CustomIcontext>
          <CustomIcontext>
            <img
              src='/gems/Legendary.webp'
              alt=''
              className='h-[18px] object-contain '
            />
            {user.yellowCredits}
          </CustomIcontext>
        </div>
        <Button variant='primary' withIcon={true} className={"w-fit"}>
          <Play className='h-5 w-5 fill-russianViolet' />
          Play Now
        </Button>
      </div>

      <hr className='border-white/10 ' />
      <div className='flex flex-col gap-6'>
        <CustomMenuItem
          //onClick={() => handleRedirect("/discover")}
          className={
            "p-0 hover:bg-transparent active:bg-transparent hover:border-transparent active:border-transparent"
          }
        >
          <Discover className='h-5 w-5 opacity-70 fill-white' />
          <span>Discover</span>
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => handleRedirect("/character/my-characters")}
          className={
            "p-0 hover:bg-transparent active:bg-transparent hover:border-transparent active:border-transparent"
          }
        >
          <img
            src='/Icons/UserCircle.svg'
            alt=''
            className='h-5 w-5 opacity-70'
          />
          <span>My characters</span>
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => handleRedirect("/my-account/gallery?page=1")}
          className={
            "p-0 hover:bg-transparent active:bg-transparent hover:border-transparent active:border-transparent"
          }
        >
          <img
            src='/Icons/ImageLibrary.svg'
            alt=''
            className='h-5 w-5  opacity-70'
          />
          <span>My images</span>
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => handleRedirect("/campaign/my-campaigns")}
          className={
            "p-0 hover:bg-transparent active:bg-transparent hover:border-transparent active:border-transparent"
          }
        >
          <img
            src='/Icons/Campaign.svg'
            alt=''
            className='h-5 w-5  opacity-70'
          />
          <span>My campaigns</span>
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => handleRedirect("/campaign/my-campaigns/favorites")}
          className={
            "p-0 hover:bg-transparent active:bg-transparent hover:border-transparent active:border-transparent"
          }
        >
          <Star isfilled={true} className='h-5 w-5 opacity-70 fill-white' />
          <span>Favorites</span>
        </CustomMenuItem>
      </div>

      <hr className='border-white/10 ' />
      <div className='flex flex-col gap-6'>
        <CustomMenuItem
          className={
            "p-0 hover:bg-transparent active:bg-transparent hover:border-transparent active:border-transparent"
          }
        >
          <Settings className='h-5 w-5 opacity-70 fill-white' />
          <span>Account Setting</span>
        </CustomMenuItem>

        <CustomMenuItem
          onClick={handleLogout}
          className={
            "p-0 hover:bg-transparent active:bg-transparent hover:border-transparent active:border-transparent"
          }
        >
          <Logout className='h-5 w-5 opacity-70 fill-white' />
          <span>Logout</span>
        </CustomMenuItem>
      </div>
      <hr className='border-white/10 ' />

      <div className='flex gap-3  hover:bg-transparent focus:bg-transparent   transition-all duration-300 ease-linear cursor-pointer'>
        <span>How to play</span>
      </div>
      <div className='flex gap-3 hover:bg-transparent focus:bg-transparent   transition-all duration-300 ease-linear cursor-pointer'>
        <span>Gallery</span>
      </div>
      <div className='flex gap-3 hover:bg-transparent focus:bg-transparent   transition-all duration-300 ease-linear cursor-pointer'>
        <span>Store</span>
      </div>
    </div>
  );
};
const UserLoggedOut = ({ handleRedirect }) => {
  return (
    <div className='mx-[20px] mt-10 gap-[34px] flex flex-col running-text-mono uppercase '>
      <div className={cn("flex items-center gap-6 ")}>
        <Button onClick={() => handleRedirect("/auth/sign-in")} withIcon>
          <img
            src='/Icons/Login.svg'
            alt='logo'
            className='h-5 w-5 opacity-70 '
          />
          SIGN IN
        </Button>
        <Button
          onClick={() => handleRedirect("/auth/sign-up")}
          variant='subtle'
        >
          Sign Up
        </Button>
      </div>

      <div className='flex gap-3  hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
        <img
          src='/Icons/UserCircle.svg'
          alt=''
          className='h-5 w-5 opacity-70'
        />
        <span>Discover</span>
      </div>
      <div
        onClick={() => handleRedirect("/my-account/gallery?page=1")}
        className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'
      >
        <img
          src='/Icons/ImageLibrary.svg'
          alt=''
          className='h-5 w-5  opacity-70'
        />
        <span>My images</span>
      </div>
      <div
        onClick={() => handleRedirect("/campaign/my-campaigns")}
        className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'
      >
        <img src='/Icons/Campaign.svg' alt='' className='h-5 w-5  opacity-70' />
        <span>My campaigns</span>
      </div>
      <hr className='border-white/10 ' />

      <div className='flex gap-3  hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
        <span>How to play</span>
      </div>
      <div className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
        <span>Gallery</span>
      </div>
      <div className='flex gap-3 hover:bg-transparent focus:bg-transparent focus:text-white  transition-all duration-300 ease-linear cursor-pointer'>
        <span>Store</span>
      </div>
      <Button className='mt-3 w-40' variant='primary'>
        PLAY FOR FREE
      </Button>
    </div>
  );
};
export default function DrawerMenu({ characterCreatePage }) {
  const { user } = useUserStore();
  const { showMenu, setShowMenu } = useControlsStore();

  const router = useRouter();

  useEffect(() => {
    if (showMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showMenu]);

  const handleRedirect = (path) => {
    router.push(path);
    setShowMenu(false);
  };

  return (
    <div
      className={cn(
        "absolute !z-[400]  -top-16 left-[50%] ease-animate opacity-0 pointer-events-none md:hidden translate-x-[-150%]    h-screen w-screen overflow-y-scroll pb-10 flex flex-col justify-start ",
        showMenu &&
          "translate-x-[-50%] bg-blur-drawer opacity-100 pointer-events-auto  ",
        characterCreatePage && "-top-5"
      )}
    >
      <div
        className={cn(
          "w-full  px-[20px] mt-16 mx-auto rounded-lg text-white  flex justify-between items-center !z-[200]",
          characterCreatePage && "mt-5"
        )}
      >
        <Link
          href='/'
          className='text-white hover:text-gray2 transition-all duration-300 ease-in-out'
        >
          <img
            src='/Icons/Logo.svg'
            alt='logo'
            className='h-[32px] object-contain'
          />
        </Link>
        <Cancel
          width={"20px"}
          fill={"#9A9AC1"}
          onClick={() => setShowMenu(false)}
        />
      </div>
      {user?.token ? (
        <UserLoggedIn handleRedirect={handleRedirect} />
      ) : (
        <UserLoggedOut handleRedirect={handleRedirect} />
      )}
    </div>
  );
}
