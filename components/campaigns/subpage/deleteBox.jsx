import React from "react";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import Button from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import Cancel from "@/components/ui/Icons/Cancel";
import Delete from "@/components/ui/Icons/Delete";

export default function deleteBox({ handleDelete, isLoading, setIsOpen }) {
  return (
    <DialogContent className="bg-white/[8%] text-white border border-white/10 !w-2/4">
      <div className="flex flex-col gap-4 ">
        <span className="headline-3">Delete this campaign?</span>
        <span className="text-gray2 ">
          Your campaign will be deleted permanently.
        </span>
      </div>
      <hr className="border-white/10 " />
      <DialogFooter className={""}>
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
