import React, { useState } from "react";
import CustomDropdown from "@/components/ui/custom-dropdown";
import { cn } from "@/lib/utils";
import CustomIconbutton from "@/components/ui/custom-iconbutton";
import Download from "@/components/ui/Icons/Download";

const SORT_BY_OPTIONS = ["Newest to Oldest", "Oldest to Newest"];

const GalleryImage = ({ src, className }) => {
  const downloadImage = () => {
    // download image
    const a = document.createElement("a");
    a.href = src;
    a.download = "image.jpg";
    a.click();
  };
  return (
    <div className={cn("relative group", className)}>
      <CustomIconbutton
        onClick={downloadImage}
        className={
          "absolute top-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto right-4  bg-blur"
        }
      >
        <Download className='h-5 w-5 fill-white' />
      </CustomIconbutton>
      <img
        src={src}
        alt=''
        className={cn(
          "rounded-[16px] border border-transparent  hover:border-white/10 hover:shadow-custom-1 ease-animate cursor-pointer"
        )}
      />
    </div>
  );
};
export default function Gallery({ images }) {
  const [selectedOption, setSelectedOption] = useState(SORT_BY_OPTIONS[0]);

  const renderImages = () => {
    if (!images) return null;

    const rows = [];
    let index = 0;

    while (index < images.length) {
      // Row 1: 4 images with col-span-2 and row-span-2
      if (rows.length % 5 === 0) {
        const rowImages = images.slice(index, index + 4);
        rows.push(
          <div className='grid grid-cols-4 md:grid-cols-8 gap-4' key={index}>
            {rowImages.map((src, i) => (
              <GalleryImage
                src={src}
                alt=''
                className='col-span-2 row-span-2'
                key={i}
              />
            ))}
          </div>
        );
        index += 4;
      }
      // Row 2: 2 images with col-span-4 and row-span-4
      else if (rows.length % 5 === 1) {
        const rowImages = images.slice(index, index + 2);
        rows.push(
          <div className='grid grid-cols-4 md:grid-cols-8 gap-4' key={index}>
            {rowImages.map((src, i) => (
              <GalleryImage
                src={src}
                alt=''
                className='col-span-4 row-span-4'
                key={i}
              />
            ))}
          </div>
        );
        index += 2;
      }
      // Row 3: First image with col-span-4 and row-span-4, then 4 images with col-span-2 and row-span-2
      else if (rows.length % 5 === 2) {
        const rowImages = images.slice(index, index + 4);
        rows.push(
          <div className='grid grid-cols-4 md:grid-cols-8 gap-4' key={index}>
            {rowImages.map((src, i) => (
              <GalleryImage
                src={src}
                alt=''
                className='col-span-2 row-span-2'
                key={i}
              />
            ))}
          </div>
        );
        index += 4;
      }
      // Row 4: 4 images with col-span-2 and row-span-2
      else if (rows.length % 5 === 3) {
        const firstImage = images[index];
        const nextFourImages = images.slice(index + 1, index + 5);
        rows.push(
          <div className='grid grid-cols-4 md:grid-cols-8 gap-4' key={index}>
            <GalleryImage
              src={firstImage}
              alt=''
              className='col-span-4 row-span-4'
              key={index}
            />
            {nextFourImages.map((src, i) => (
              <GalleryImage
                src={src}
                alt=''
                className='col-span-2 row-span-2'
                key={i + 1}
              />
            ))}
          </div>
        );
        index += 5;
      }
      // Row 5: 4 images with col-span-2 and row-span-2
      else if (rows.length % 5 === 4) {
        const rowImages = images.slice(index, index + 4);
        rows.push(
          <div className='grid grid-cols-4 md:grid-cols-8 gap-4' key={index}>
            {rowImages.map((src, i) => (
              <GalleryImage
                src={src}
                alt=''
                className='col-span-2 row-span-2'
                key={i}
              />
            ))}
          </div>
        );
        index += 4;
      }
    }

    return rows;
  };

  return (
    <div className='h-full  text-white w-full flex flex-col pt-[180px] md:pt-[120px] px-5 lg:px-12 pb-32 '>
      {/* mobile */}
      <div
        className={
          "flex flex-col items-start gap-2.5 bg-blur-bottom-menu headline z-20 w-screen left-0 h-[164px] px-5 pb-4 md:hidden fixed top-0 justify-end"
        }
      >
        <span>Gallery</span>
      </div>
      <div className='flex flex-col w-full gap-2.5'>
        <div className=' flex justify-between text-white  z-[10]'>
          {/* desktop */}
          <span className='headline-3 z-[10] hidden md:block'>Gallery</span>

          <CustomDropdown
            placeholder={"sort by"}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={SORT_BY_OPTIONS}
            className={"min-w-full md:w-auto"}
          />
        </div>

        <div className='w-full my-4 z-[9] '>
          <div className='image-grid space-y-4'>{renderImages()}</div>
        </div>
      </div>
    </div>
  );
}
