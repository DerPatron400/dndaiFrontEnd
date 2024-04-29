import React from "react";
import { IconButton } from "@/components/ui/iconButton";
import { cn } from "@/lib/utils";
export default function CustomIconbutton({
  children,
  className,
  onClick,
  variant,
}) {
  return (
    <IconButton
      className={cn(
        "bg-white/10 h-9 w-9 border ease-animate  border-white/10 hover:border-white/20 hover:bg-white/10 active:bg-white/20  active:border-white/40 disabled:opacity-30% disabled:pointer-events-none",
        variant === "primary" &&
          "bg-white hover:bg-gray1 active:bg-gray2  border-0 ",
        className
      )}
      onClick={onClick}
    >
      {children}
    </IconButton>
  );
}
