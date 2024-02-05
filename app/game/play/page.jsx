"use client";
import React from "react";
import GameScene from "@/components/Game/GamePlay/GameScene";

export default function page() {
  return (
    <div className='border border-white !overflow-hidden'>
      <GameScene />
    </div>
  );
}
