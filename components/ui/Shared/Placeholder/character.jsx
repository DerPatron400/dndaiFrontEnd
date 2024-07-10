import React from "react";
import CustomButton from "@/components/ui/custom-button";
import AddUser from "../../Icons/AddUser";
import { useRouter } from "next/navigation";
export default function Character() {
  const router = useRouter();
  return (
    <div className="fixed z-10 h-screen w-screen flex-col text-center flex items-center justify-center gap-8 text-white">
      <span className="headline-3">
        Begin your journey by <br />
        creating
        <span className="text-irisPurpleLight"> your first hero!</span>
      </span>
      <CustomButton
        onClick={() => router.push("/character/create")}
        withIcon={true}
      >
        <AddUser className="h-5 w-5 fill-white opacity-70" />
        Create Character
      </CustomButton>
    </div>
  );
}
