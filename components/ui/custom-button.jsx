import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export default function CustomButton({
  children,
  className,
  withIcon,
  variant,
  disabled,
  onClick,
  active,
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "running-text-mono gap-2 h-[48px] px-6 bg-white/10 hover:bg-white/10 uppercase border border-white/10 hover:border-white/20 active:bg-white/20 active:border-white/40 disabled:opacity-30 rounded-[10px]  cursor-pointer z-[10] ease-animate  hover:!duration-200 active:!duration-100",
        withIcon && "flex items-center pe-5 ps-[20px] ",
        variant === "subtle" &&
          "!border-none bg-transparent hover:bg-transparent active:bg-transparent hover:text-gray1 active:text-gray2 !px-0",
        variant === "primary" &&
          "bg-white hover:bg-gray1 text-russianViolet active:bg-gray2 border-none",
        variant === "error" &&
          "bg-errorRed text-russianViolet hover:bg-[#D13942] active:hover:bg-[#C12D36]  border-none",
        variant === "success" &&
          "bg-successGreen text-russianViolet hover:bg-[#0FBB76] active:hover:bg-[#0E9961] border-none ",
        (variant === "success" || variant === "error") &&
          withIcon &&
          "ps-6 pe-4",
        active && " !bg-white/20 !border-white/40",

        className
      )}
    >
      {children}
    </Button>
  );
}
