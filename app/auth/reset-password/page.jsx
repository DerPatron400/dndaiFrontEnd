import React, { Suspense } from "react";
import NewPass from "@/components/auth/newPass";

export default function page() {
  return (
    <div className='bg-russianViolet bg-gradient w-screen h-screen flex justify-center items-center'>
      <Suspense fallback={null}>
        <NewPass />
      </Suspense>
    </div>
  );
}
