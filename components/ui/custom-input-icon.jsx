"use client";
import React, { useState, useRef, useEffect } from "react";
import IconButton from "@/components/ui/custom-iconbutton";
import { cn } from "@/lib/utils";
import CustomButton from "./custom-button";

const isSafariMobile = () => {
  const ua = navigator.userAgent;
  return (
    /Safari/.test(ua) &&
    /Apple Computer/.test(navigator.vendor) &&
    (/iPhone/.test(ua) || /iPad/.test(ua) || /iPod/.test(ua))
  );
};

export default function CustomInputIcon({
  placeholder,
  icon,
  value,
  onChange,
  isSubtle,
  isComment,
  text = "",
  className,
  onClick,
  disabled,
  textAreaClassName,
  blurOnOutsideClick,
}) {
  const [inFocus, setInFocus] = useState(false);

  const textAreaRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (
      blurOnOutsideClick &&
      textAreaRef.current &&
      !textAreaRef.current.contains(e.target)
    ) {
      setInFocus(false);
      textAreaRef.current.blur();
    }
  };

  const hideKeyboard = () => {
    if (blurOnOutsideClick && inFocus) {
      setInFocus(false);
      textAreaRef.current.blur();
    }
  };

  useEffect(() => {
    if (!isSafariMobile) return;
    if (blurOnOutsideClick) {
      window.addEventListener("click", handleOutsideClick);
      window.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      if (blurOnOutsideClick) {
        window.removeEventListener("click", handleOutsideClick);
        window.removeEventListener("touchstart", handleOutsideClick);
      }
    };
  }, [blurOnOutsideClick, textAreaRef.current]);
  return (
    <div
      className={cn(
        "relative h-[80px] w-96 running-text  group",
        isComment && "h-16",
        className
      )}
    >
      <div className='absolute inset-y-0 end-0 flex  items-center pe-5 ps-[14px] '>
        {isSubtle ? (
          <CustomButton
            onClick={onClick}
            disabled={!value || disabled}
            variant={"subtle"}
            withIcon={true}
          >
            {icon}
            {text}
          </CustomButton>
        ) : (
          <IconButton
            variant={"primary"}
            onClick={onClick}
            disabled={!value || disabled}
          >
            {icon}
          </IconButton>
        )}
      </div>
      <textarea
        type='text'
        id={placeholder}
        onClick={hideKeyboard}
        onTouchStart={hideKeyboard}
        // on enter
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClick();
          }
        }}
        disabled={disabled}
        value={value}
        className={cn(
          "block w-full h-[80px] input-field overflow-y-hidden py-[28px]  resize-none  peer/input ps-5 pe-[70px] box-border    running-text  placeholder:opacity-100 text-white border border-gray2 rounded-[10px] bg-transparent hover:border-white cursor-pointer duration-300 transition-all focus:outline-0 focus:ring-offset-0 focus:ring-inset-irisPurpleLight focus:!ring-irisPurpleLight focus:!border-irisPurpleLight bod  placeholder:text-gray2  focus:shadow-text-area focus:outline-none  ",
          isComment && "h-16 !py-5",
          textAreaClassName
        )}
        ref={textAreaRef}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setTimeout(() => {
            setInFocus(true);
          }, 300);
        }}
        onBlur={() => setInFocus(false)}
      />
    </div>
  );
}
