import React from "react";
import dynamic from "next/dynamic";

const GamePlay = dynamic(() => import("@/components/Game/Classic"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className='min-h-[90vh]' style={{ marginTop: '4%'}}>
      <GamePlay />
    </div>
  );
}
