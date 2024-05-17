import React from "react";
import CustomIconbutton from "./custom-iconbutton";

export default function CustomIconButtonText({ icon, text = "text" }) {
  return (
    <div className={"flex justify-center items-center gap-2"}>
      {icon && (
        <CustomIconbutton className={"border-white"}>{icon}</CustomIconbutton>
      )}

      <span className='text-white running-text-mono uppercase'>{text}</span>
    </div>
  );
}
