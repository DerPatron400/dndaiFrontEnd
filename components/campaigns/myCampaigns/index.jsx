import React from "react";
import Card from "@/components/campaigns/card";

export default function index() {
  return (
    <div className="h-screen w-full flex flex-col bg-gradient pt-[172px] md:pt-[120px] px-6 lg:px-12 md:pb-64 ">
      <div className="hidden md:flex flex-col gap-2.5 ">
        <div className="text-center flex justify-start text-white headline-3 z-[10] ">
          <span className="headline-3 z-[10]  ">
            My campaigns
            <span className="text-gray2 ms-3 md:ms-4 font-roboto-mono transform translate-up text-[17px] md:text-[24px] translate-y-[-15px] md:translate-y-[-20px]">
              (5)
            </span>
          </span>
        </div>
      </div>
      <div
        className={
          "flex flex-col gap-2.5 bg-blur-bottom-menu z-[12] w-screen left-0 h-[198px] px-5 pb-4 md:hidden fixed top-0 justify-end"
        }
      >
        <h1 className="text-center flex justify-start text-white headline-3 z-[10] ">
          Create your own campaign
        </h1>
      </div>
      <div className="w-full text-white border z-[10] grid grid-cols-12 lg:grid-cols-12 gap-4 pt-9 md:pt-8">
        {Array.from({ length: 5 }, (_, i) => (
          <div className="col-span-3 w-full min-w-full max-w-full">
            <Card key={i} className={"!w-full min-w-full max-w-full"} />
          </div>
        ))}
      </div>
    </div>
  );
}
