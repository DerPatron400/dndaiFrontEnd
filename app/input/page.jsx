"use client";
import Scene from "@/components/threejs/Scene";
import { Toaster } from "react-hot-toast";

export default function Input() {
  return (
    <div className='max-w-screen !overflow-hidden '>
      <Toaster />
      <Scene />
    </div>
  );
}
