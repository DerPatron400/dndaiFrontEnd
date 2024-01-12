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
    router.push("/login");
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif ",
      }}
      className='relative inline-block text-left '
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        type='button'
        className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md focus:outline-none hover:outline-none focus:bg-white focus:text-black hover:bg-white hover:text-black transition-colors duration-300'
        id='options-menu'
        aria-haspopup='true'
        aria-expanded='true'
      >
        Account
      </button>

      {isDropdownOpen && (
        <div
          className='absolute right-0 mt-2 py-2 space-y-2 bg-white w-40  text-center rounded-md shadow-md'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
        >
          <Link
            href='/input'
            className='cursor-pointer rounded-md block px-4 py-2 text-sm duration-300 transition-colors hover:text-green-500 focus:text-green'
            role='menuitem'
          >
            New Game
          </Link>

          <div className='px-4 py-2 rounded-md text-sm'>
            Credits: {user?.credits || 0}
          </div>
          <Link
            href='/savegame'
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
