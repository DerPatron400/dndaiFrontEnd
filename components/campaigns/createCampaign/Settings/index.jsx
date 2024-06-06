"use client";
import React, { useState } from "react";

import Choose from "./Choose";

export default function Index() {
  return (
    <div className=" text-white  flex justify-start  items-start gap-5 h-full md:h-[652px]  w-full pb-28 md:pb-0">
      <Choose />
    </div>
  );
}
