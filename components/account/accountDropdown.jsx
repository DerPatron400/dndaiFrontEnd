import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useUserStore from "@/utils/userStore";
import GeneralMenu from "./GeneralMenu";
import SignedInUserMenu from "./SignedInUserMenu";
import { cn } from "@/lib/utils";
import { IconButton } from "../ui/iconButton";
import CustomIconbutton from "../ui/custom-iconbutton";

export default function accountDropdown() {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();

  return (
    <DropdownMenu onOpenChange={(e) => setOpen(e)} open={open}>
      <DropdownMenuTrigger suppressHydrationWarning className='outline-0'>
        <CustomIconbutton
          //  onClick={() => setOpen((prev) => !prev)}
          className={open && "border-white/40 bg-white/20 cursor-pointer"}
        >
          <img src='/Icons/User.svg' className='h-5 w-5 invert' />
        </CustomIconbutton>
      </DropdownMenuTrigger>

      {user?.token ? (
        <SignedInUserMenu setOpen={setOpen} />
      ) : (
        <GeneralMenu setOpen={setOpen} />
      )}
    </DropdownMenu>
  );
}
