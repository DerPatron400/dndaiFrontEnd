import { cn } from "@/lib/utils";
import React from "react";

export default function CustomMenuItem({
  children,
  className,
  withIcon,
  variant,
  onClick,
}) {
  return (
    <div
      className={cn(
        "py-[14px] w-full flex items-center gap-2 px-3 cursor-pointer border border-transparent hover:bg-white/[8%] active:bg-white/10 rounded-[10px] active:border-white/20 hover:border-white/10 ease-animate hover:!duration-200 active:!duration-100 ",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
