import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export default function CustomButton({
  children,
  className,
  withIcon,
  variant,
}) {
  return (
    <Button
      className={cn(
        "running-text-mono gap-2 h-[48px] px-6 bg-white/10 hover:bg-white/10 uppercase border border-white/10 hover:border-white/20 active:bg-white/20 active:border-white/40 rounded-[10px]  cursor-pointer z-[10] ease-animate",
        withIcon && "flex items-center pe-5 ps-[14px]",
        variant === "subtle" &&
          "!border-none bg-transparent hover:bg-transparent",
        variant === "primary" &&
          "bg-white hover:bg-gray1 text-black active:bg-gray2",
        variant === "error" &&
          "bg-errorRed text-black hover:bg-[#D13942] active:hover:bg-[#C12D36]",
        className
      )}
    >
      {children}
    </Button>
  );
}
