import React from "react";
import { IconButton } from "@/components/ui/iconButton";
import { cn } from "@/lib/utils";
export default function CustomIconbutton({ children, className }) {
  return (
    <IconButton
      className={cn("bg-white/10 h-9 w-9 border border-white/10", className)}
    >
      {children}
    </IconButton>
  );
}
