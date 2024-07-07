import React from "react";
import CustomDropdown from "@/components/ui/custom-dropdown";

export default function Gallery() {
  return (
    <div className="h-full z-[10] w-full flex flex-col pt-[130px] md:pt-[120px] px-5 lg:px-12 pb-32 md:pb-64">
      <div className="flex flex-col w-full gap-2.5">
        <div className="text-center flex justify-between text-white headline-3 z-[10]">
          {/* desktop */}
          <span className="headline-3 z-[10] hidden md:block">Gallery</span>

          {/* mobile */}
          <div
            className={
              "flex flex-col items-start gap-2.5 bg-blur-bottom-menu headline z-10 w-screen left-0 h-[164px] px-5 pb-4 md:hidden fixed top-0 justify-end"
            }
          >
            <span>Gallery</span>
          </div>
          <CustomDropdown
            placeholder={"sort by"}
            options={["option1", "option2", "option3"]}
          />
        </div>

        <div className="w-full my-4 z-10 ">
          <div className=" grid grid-cols-8 gap-4">
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            {/* 2nd row */}
            <div className="w-full h-[710px] col-span-4 row-span-5 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-3.jpg"
                alt="Gallery image 3"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[710px] col-span-4 row-span-5 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-3.jpg"
                alt="Gallery image 3"
                className="  object-cover"
              />
            </div>
            {/* 3rd row */}
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            {/* 4 row */}
            <div className="w-full h-[710px] col-span-4 row-span-5 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-3.jpg"
                alt="Gallery image 3"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            {/* 5th 6th row */}
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            {/* 7nd row */}
            <div className="w-full h-[710px] col-span-4 row-span-5 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-3.jpg"
                alt="Gallery image 3"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[710px] col-span-4 row-span-5 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-3.jpg"
                alt="Gallery image 3"
                className="  object-cover"
              />
            </div>
            {/* 8th row */}
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
            <div className="w-full h-[345px] col-span-2 row-span-2 border border-white/10 bg-white/[8%] rounded-xl">
              <img
                src="img/image-1.jpg"
                alt="Gallery image 1"
                className="  object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
