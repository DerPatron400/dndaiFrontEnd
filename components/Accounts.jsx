import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUserStore from "@/utils/store/userStore";
import Cookie from "universal-cookie";

const Accounts = () => {
  const cookies = new Cookie();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { user, setUser } = useUserStore((state) => state);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    setIsDropdownOpen(false);
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  useEffect(() => {
    // Close dropdown on route change
    setIsDropdownOpen(false);
  }, [router.pathname]); // Re-run effect when pathname changes

  const handleLogout = () => {
    setUser(null);
    cookies.set("uid", "", { path: "/" });
    cookies.set("token", "", { path: "/" });
    router.push("/auth/login");
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif ",
      }}
      className='relative inline-block z-50  '
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        type='button'
        id='options-menu'
        aria-haspopup='true'
        aria-expanded='true'
        className='bg-gradient-to-t capitalize z-[50] flex from-green-950 items-end gap-x-1 to-green-500 text-white px-6 py-2 rounded-md hover:to-green-700 hover:from-green-400 transition-all'
      >
        {user?.username?.length > 7
          ? user?.username?.slice(0, 7) + "..."
          : user?.username}
      </button>

      {isDropdownOpen && (
        <div
          className='absolute right-0 mt-2 py-2 space-y-2 bg-white w-40 !z-[50]  text-center rounded-md shadow-md'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
        >
          <Link
            href='/game/new'
            className='cursor-pointer   rounded-md block px-4 py-2 text-sm duration-300 transition-colors hover:text-green-500 focus:text-green'
            role='menuitem'
          >
            New Game
          </Link>

          <div className='py-2   px-4 rounded-md text-sm flex items-center justify-center gap-x-2'>
            <div> {user?.credits || 0}</div>
            <img
              src='/images/CreditsDndAi.png'
              alt=''
              className='w-4 h-6 bg-transparent'
            />
          </div>
          <Link
            href='/game/saved'
            className='cursor-pointer rounded-md block px-4 py-2 text-sm duration-300 transition-colors hover:text-green-500 focus:text-green'
            role='menuitem'
          >
            Saved Games
          </Link>
          <Link
            href='/gallery'
            className='cursor-pointer rounded-md block px-4 py-2 text-sm duration-300 transition-colors hover:text-green-500 focus:text-green'
            role='menuitem'
          >
            Images
          </Link>
          <Link
            href='/shop'
            className='cursor-pointer rounded-md block px-4 py-2 text-sm duration-300 transition-colors hover:text-green-500 focus:text-green'
            role='menuitem'
          >
            Shop
          </Link>
          <span
            onClick={handleLogout}
            className='cursor-pointer block px-4 py-2 text-sm duration-300 transition-colors hover:text-green-500 focus:text-green'
            role='menuitem'
          >
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

export default Accounts;
