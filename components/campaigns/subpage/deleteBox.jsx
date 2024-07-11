import React from "react";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import Button from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import Cancel from "@/components/ui/Icons/Cancel";
import Delete from "@/components/ui/Icons/Delete";

export default function DeleteBox({ handleDelete, isLoading, setIsOpen }) {
  return (
    <DialogContent className="bg-white/[8%] !rounded-[16px] !px-0 text-white border border-white/10 !w-2/4">
      <div className="flex flex-col gap-4 px-4">
        <span className="running-text-large">Delete this campaign?</span>
        <span className="running-text text-gray2">
          Your campaign will be deleted permanently.
        </span>
      </div>
      <hr className="border-white/10 !px-0" />
      <DialogFooter className="!flex gap-4 px-4">
        <Button onClick={() => setIsOpen(false)} withIcon={true}>
          <Cancel className="w-3 h-3" fill="white" />
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant={"primary"}
          withIcon={true}
          disabled={isLoading}
          className={cn(isLoading && "opacity-50")}
        >
          <Delete className="w-5 h-5" fill="black" />
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
