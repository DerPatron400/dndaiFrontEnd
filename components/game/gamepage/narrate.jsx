import React from "react";
import { DialogContent } from "@/components/ui/dialog";
import CustomButton from "@/components/ui/custom-button";
import CustomDropdown from "@/components/ui/custom-dropdown";

export default function narrate() {
  return (
    <DialogContent className="bg-white/[8%] text-white border border-white/10 w-1/3">
      <>
        <div className="flex flex-col gap-2">
          <span className="running-text-large">
            Enhance Your Story with Narration?
          </span>
        </div>
        <div className="flex flex-col gap-2 pb-4 p-4 bg-white/[8%] rounded-[8px] overflow-auto hide-scrollbar max-h-[50vh]">
          <span className="running-text w-full">Choose narraters voice</span>
          <CustomDropdown
            className={"!w-full !min-w-full"}
            placeholder={"dropdown"}
            options={["option1", "option2", "option3"]}
          />
        </div>
        <span className="text-gray2">
          Each line of narration costs (1) additional
        </span>
      </>

      <div className="flex justify-end gap-4 pt-2">
        <CustomButton withIcon>
          <img src="/Icons/Cancel.svg" alt="" className="w-6 h-6 opacity-70" />
          <span className="running-text-mono text-white">CANCEL</span>
        </CustomButton>
        <CustomButton withIcon variant={"primary"}>
          <img
            src="/Icons/Narrate.svg"
            alt=""
            className="h-4 w-4 opacity-70 invert"
          />
          <span className="running-text-mono text-black">Narrate</span>
        </CustomButton>
      </div>
    </DialogContent>
  );
}
