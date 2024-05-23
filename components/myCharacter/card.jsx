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
        "rounded-[16px] h-auto group  my-0 min-w-[292px] overflow-hidden md:min-w-[345px] md:w-[345px]  border-white/[8%] border hover:border-white/20 running-text-mono ease-animate ",
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
          ></div>
        </CardHeader>
        <CardContent className=" rounded-bl-2xl  rounded-br-2xl flex flex-col p-5 bg-white/[8%] group-hover:bg-white/10 gap-[20px]">
          <div className=" flex justify-between items-center">
            <span className=" headline-4 text-white ">NAME</span>
            <IconButton className="bg-white  font-roboto-mono hover:bg-white h-6 w-6"></IconButton>
          </div>
          <div className="flex flex-col running-text-mono">
            <span className="text-white ">LEVEL 72</span>
            <span className=" text-irisPurpleLight">
              HALF-ELF <span className=" text-sandyOrange">SORCERER</span>
            </span>
          </div>
          <div
            className={cn(
              "flex justify-between items-center gap-5 text-white",
              carousel && "hidden"
            )}
          >
            <Button withIcon>
              <Play size={14} /> <span>SHOW DETAILS</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
