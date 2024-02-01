"use client";
import Scene from "@/components/Game/StartGame/Scene";
import { Toaster } from "react-hot-toast";

export default function Input() {
  return (
    <div className='max-w-screen !overflow-hidden '>
      <Toaster />
      <Scene />
    </div>
  );
}
