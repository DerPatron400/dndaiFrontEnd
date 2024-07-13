import React from "react";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import Button from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import Cancel from "@/components/ui/Icons/Cancel";
import Delete from "@/components/ui/Icons/Delete";

export default function CustomDialogBox({
  title,
  description,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading,
  setIsOpen,
}) {
  return (
    <DialogContent className="bg-white/[8%] rounded-[16px] p-0 text-white border border-white/10 w-[472px]">
      <div className="flex flex-col gap-4 px-[24px] pt-[16px]">
        <span className="running-text-large">{title}</span>
        <span className="running-text text-gray2">{description}</span>
      </div>
      <hr className="border-white/10 px-0" />
      <DialogFooter className="flex gap-[8px] px-6 pb-4">
        <Button onClick={() => setIsOpen(false)} withIcon={true}>
          <Cancel className="w-3 h-3" fill="white" />
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant={"primary"}
          withIcon={true}
          disabled={isLoading}
          className={cn(isLoading && "opacity-50")}
        >
          <Delete className="w-5 h-5" fill="black" />
          {confirmText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
