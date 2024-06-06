"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThumbsUp, Play, SquareArrowOutUpRight, Star } from "lucide-react";
import Button from "@/components/ui/custom-button";
import IconButton from "@/components/ui/custom-iconbutton";
import { cn } from "@/lib/utils";
import CustomIcontext from "../ui/custom-icontext";

//resolved conflicts
export default function card({ carousel, className }) {
  return (
    <div
      className={cn(
        "rounded-[16px]  h-auto group min-w-full my-0 max-w-full overflow-hidden md:min-w-[345px] md:w-[345px]  border-white/[8%] border hover:border-white/20 running-text-mono ease-animate ",
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
            <div className="flex justify-center items-center !text-sm gap-2 font-roboto-mono">
              <IconButton className="bg-white  font-roboto-mono hover:bg-white h-6 w-6"></IconButton>
              PLAYERS NAME
            </div>
            <div className="flex justify-center items-center gap-2 ">
              <IconButton className="bg-blur ease-animate group  border border-iconColor opacity-0 group-hover:opacity-100 ease-animate !duration-500">
                <img
                  src="/Icons/Share.svg"
                  alt=""
                  className="h-5 w-5 group-hover:opacity-100 invert"
                />
              </IconButton>
              <IconButton className="bg-blur group  border border-iconColor opacity-0 group-hover:opacity-100 ease-animate !duration-500">
                <img
                  src="/Icons/Star.svg"
                  alt=""
                  className="h-5 w-5 group-hover:opacity-100 invert"
                />
              </IconButton>
            </div>
          </div>
        </CardHeader>
        <CardContent className=" rounded-bl-2xl  rounded-br-2xl flex flex-col justify-around p-5 bg-white/[8%] group-hover:bg-white/10  ">
          <span className="mb-4 headline-4 text-white ">CAMPAIGNS NAME</span>
          <span className="text-gray2 running-text-small truncate  text-wrap  max-h-16">
            Lorem ipsum dolor sit amet consectetur. Libero morbi facilisi velit
            facilisis ipsum. Lacus suspendisse quam adipiscing risus pr
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
                <span>1.7K</span>
              </CustomIcontext>
              <CustomIcontext>
                <img
                  src="/Icons/Play.svg"
                  alt=""
                  className="h-5 w-5 opacity-70"
                />{" "}
                <span>4.7K</span>
              </CustomIcontext>
            </div>
            <Button withIcon>
              <Play size={14} /> <span>Play</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
