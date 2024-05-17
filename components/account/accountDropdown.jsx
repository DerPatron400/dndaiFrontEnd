import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useUserStore from "@/utils/userStore";
import GeneralMenu from "./GeneralMenu";
import SignedInUserMenu from "./SignedInUserMenu";
import { cn } from "@/lib/utils";

export default function accountDropdown() {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();

  return (
    <DropdownMenu onOpenChange={(e) => setOpen(e)} open={open}>
      <DropdownMenuTrigger
        className={cn(
          "outline-none bg-white/10 h-9 w-9 border border-white/10 hover:border-white/20 active:border-white/40  transition-all duration-300  flex items-center justify-center rounded-full",
          open && "border-white/40"
        )}
      >
        <img src="/Icons/User.svg" className="h-5 w-5 invert" />
      </DropdownMenuTrigger>
      {user ? (
        <SignedInUserMenu setOpen={setOpen} />
      ) : (
        <GeneralMenu setOpen={setOpen} />
      )}
    </DropdownMenu>
  );
}
