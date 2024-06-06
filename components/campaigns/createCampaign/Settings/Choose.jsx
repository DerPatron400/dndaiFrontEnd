import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Choose() {
  return (
    <div
      className="md:rounded-[16px] flex flex-col gap-5 w-full md:w-full
     h-full md:p-5  md:pt-6 md:border md:border-white/10 overflow-auto hide-scrollbar"
    >
      {/* For PC */}
      <h1 className="headline-4 hidden md:block">Setting</h1>

      {/* Ends */}
      <div className="grid grid-cols-12 lg:grid-cols-12 gap-4 md:gap-2 w-full ">
        {Array.from({ length: 30 }).map((_, index) => (
          <div className="col-span-2 ">
            <img
              src="/images/setting/setting1.png"
              alt="setting"
              className={`h-[135px] md:h-[135px] md:w-full w-full ease-animate object-cover bg-white/10 rounded-[10px]`}
            />
            <span className="description running-text-mono">NAME</span>
          </div>
        ))}
      </div>
    </div>
  );
}
