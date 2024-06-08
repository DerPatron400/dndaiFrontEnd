"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Play from "@/components/ui/Icons/Play";
import Button from "@/components/ui/custom-button";
import IconButton from "@/components/ui/custom-iconbutton";
import { cn } from "@/lib/utils";
import CustomIcontext from "@/components/ui/custom-icontext";
import { useRouter } from "next/navigation";

//resolved conflicts
export default function card({ campaign, carousel, className }) {
  const router = useRouter();

  const handleRedirect = (event) => {
    //if not clicked on share icon or start icon, redirect to campaign page. Use classname to check if clicked on icon
    if (!event.target.className.includes("prevent-redirect")) {
      router.push(`/campaign/${campaign._id}`);
    }
  };
  return (
    <div
      onClick={handleRedirect}
      className={cn(
        "rounded-[16px] cursor-pointer h-auto group min-w-full my-0 max-w-full overflow-hidden md:min-w-[345px] md:w-[345px]  border-white/[8%] border hover:border-white/20 running-text-mono ease-animate ",
        className
      )}
    >
      <Card className="w-full h-full hover:!shadow-custom-1 overflow-hidden  border-none bg-russianViolet transition-all duration-200 ease-in-out ">
        <CardHeader className="relative ">
          <img
            src="/images/Header.png"
            alt=""
            className="h-[248px] w-full  object-cover"
          />
          <div
            className={cn(
              "absolute text-xs text-white p-4 flex w-full justify-between items-center",
              carousel && "hidden"
            )}
          >
            <div className="flex capitalize justify-center items-center !text-sm gap-2 font-roboto-mono">
              <IconButton className="bg-white  font-roboto-mono hover:bg-white h-6 w-6"></IconButton>
              {campaign?.playerName}
            </div>
            <div className="flex justify-center items-center gap-2  prevent-redirect">
              <IconButton className="bg-blur ease-animate group  border border-iconColor opacity-0 group-hover:opacity-100 ease-animate !duration-500 prevent-redirect">
                <img
                  src="/Icons/Share.svg"
                  alt=""
                  className="h-5 w-5 group-hover:opacity-100 invert  prevent-redirect"
                />
              </IconButton>
              <IconButton className="bg-blur group  border border-iconColor opacity-0 group-hover:opacity-100 ease-animate !duration-500 prevent-redirect">
                <img
                  src="/Icons/Star.svg"
                  alt=""
                  className="h-5 w-5 group-hover:opacity-100 invert  prevent-redirect"
                />
              </IconButton>
            </div>
          </div>
        </CardHeader>
        <CardContent className=" rounded-bl-2xl  rounded-br-2xl flex flex-col justify-around p-5 bg-white/[8%] group-hover:bg-white/10  ">
          <span className="mb-4 headline-4 text-white ">{campaign?.title}</span>
          <span className="text-gray2 running-text-small truncate  text-wrap  max-h-16">
            {campaign?.plot}
          </span>
          <div
            className={cn(
              "flex justify-between items-center gap-5 mt-4 text-white",
              carousel && "hidden"
            )}
          >
            <div className="flex items-center gap-x-3 running-text-mono ">
              <CustomIcontext>
                <img
                  src="/Icons/Like.svg"
                  alt=""
                  className="h-5 w-5 opacity-70"
                />
                <span>{campaign?.analytics.likes.length}</span>
              </CustomIcontext>
              <CustomIcontext>
                <Play className="h-5 w-5 fill-white opacity-70" />
                <span>{campaign?.analytics.plays.length}</span>
              </CustomIcontext>
            </div>
            <Button withIcon>
              <Play className="h-5 w-5 fill-white opacity-70" />
              <span>Play</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
