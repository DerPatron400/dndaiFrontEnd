import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/ui/custom-button";
import ArrowRight from "@/components/ui/Icons/ArrowRight";
import ArrowLeft from "@/components/ui/Icons/ArrowLeft";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Campaign from "@/components/ui/Shared/Card/campaign";

export default function PublicCampaigns({
  campaigns,
  totalPages,
  totalRecords,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const pathname = usePathname();

  const nextPage = () => {
    const newPage = page + 1;
    router.replace(pathname + `?page=${newPage}`);
  };

  const prevPage = () => {
    const newPage = page - 1;
    router.replace(pathname + `?page=${newPage}`);
  };

  return (
    <div className='h-full  text-white w-full flex flex-col pt-[98px] md:pt-[128px] px-5 lg:px-12 pb-32 '>
      <div className='flex flex-col w-full gap-2.5'>
        <div className=' flex justify-between text-white  z-[10]  w-full md:w-auto'>
          {/* desktop */}
          <span className='headline-3 z-[10] hidden md:block '>
            Public Games
            <span className='text-gray2 ms-3 md:ms-4 font-roboto-mono transform translate-up text-[17px] md:text-[24px] translate-y-[-15px] md:translate-y-[-20px]'>
              ({totalRecords})
            </span>
          </span>
        </div>

        <div className='w-full text-white  z-[9] grid grid-cols-12 lg:grid-cols-12 gap-4 pt-9 md:pt-8'>
          {campaigns.map((campaign, i) => (
            <div
              key={i}
              className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 w-full min-w-full max-w-full'
            >
              <Campaign campaign={campaign} className={"!w-full !min-w-full"} />
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className='flex justify-center relative  items-center  flex-col md:flex-row gap-6 z-10'>
            <span className='text-gray2 left md:absolute left-0 running-text-mono uppercase'>
              Page {page} of {totalPages}{" "}
            </span>
            <div className='flex items-center gap-6'>
              <CustomButton
                onClick={prevPage}
                disabled={page === 1}
                variant={"subtle"}
                withIcon={true}
              >
                <ArrowLeft className='h-5 w-5 fill-white opacity-70' />
                Back
              </CustomButton>
              <CustomButton
                onClick={nextPage}
                disabled={page === totalPages}
                withIcon={true}
                variant='primary'
              >
                Next Page
                <ArrowRight className='h-5 w-5 fill-russianViolet' />
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
