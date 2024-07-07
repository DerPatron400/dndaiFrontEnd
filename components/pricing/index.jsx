import React from "react";
import CardSection from "@/components/pricing/cardsSection/index";
import GemsSection from "@/components/pricing/gemsSection/index";
import CreditSection from "@/components/pricing/creditSection/index";

export default function index() {
  return (
    <div className="h-full z-[10] border-green-500 w-full flex flex-col px-6 lg:px-12 py-[160px] gap-16">
      {/* Desktop */}
      <div className="hidden md:flex flex-col justify-center items-center gap-2.5 ">
        <span className="text-center w-2/4 hidden md:block text-white headline-3 z-[10] ">
          Start you epic journey! Dive into{" "}
          <span className="text-irisPurple">AI-Powered adventures</span> where
          your imagination rules the realm!
        </span>
      </div>

      {/* Mobile */}
      <div
        className={
          "flex flex-col gap-2.5 bg-blur-bottom-menu  w-screen left-0 h-[164px] px-5 pb-4 md:hidden fixed top-0 justify-end z-10"
        }
      >
        <h1 className="text-center flex justify-start text-white headline-3 z-[10] ">
          Start you epic journey! Dive into{" "}
          <span className="text-irisPurple">AI-Powered adventures</span> where
          your imagination rules the realm!
        </h1>
      </div>

      <CardSection />
      <GemsSection />
      <CreditSection />
    </div>
  );
}
