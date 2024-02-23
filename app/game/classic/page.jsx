import React from "react";

import dynamic from "next/dynamic";

const GamePlay = dynamic(() => import("@/components/Game/Classic"), {
  ssr: false,
});
export default function page() {
  return (
    <div className='min-h-[80vh] mt-24'>
      <GamePlay />
    </div>
  );
}
