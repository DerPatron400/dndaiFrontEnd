"use client";
import React, { useEffect, useState, Suspense } from "react";
import Gallery from "@/components/gallery/index";
import { getImages, getPublicImages } from "@/actions/user";
import Loader from "@/components/ui/Loader";
import useUserStore from "@/utils/userStore";
import { useRouter } from "next/navigation";
import useCustomToast from "@/hooks/useCustomToast";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
const SORT_BY_OPTIONS = ["Newest to Oldest", "Oldest to Newest"];

function GalleryContainer() {
  const [images, setImages] = useState();
  const { user, setTotalPublicImages } = useUserStore();
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedOption, setSelectedOption] = useState(SORT_BY_OPTIONS[0]);
  const router = useRouter();
  const { invokeToast } = useCustomToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page")) || 1;

  const handleGetImages = async () => {
    try {
      console.log("here");
      const isReverse = selectedOption === SORT_BY_OPTIONS[1];
      const response = await getPublicImages(page, isReverse);
      setImages(response.images);
      setTotalPages(response.totalPages);
      setTotalRecords(response.totalRecords);
      setTotalPublicImages(response.totalRecords);
    } catch (error) {
      invokeToast(error?.response?.data || "Error fetching images", "Error");
      setImages([]);
      setTotalPages(1);
      setTotalPublicImages(0);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetImages();
  }, [page, selectedOption]);

  if (!searchParams.get("page")) {
    router.push(pathname + "?page=1");
  }
  if (!images) return <Loader text='Loading Images...' />;
  return (
    <Gallery
      images={images}
      totalPages={totalPages}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      SORT_BY_OPTIONS={SORT_BY_OPTIONS}
      totalRecords={totalRecords}
    />
  );
}

export default function page() {
  return (
    <Suspense>
      <GalleryContainer />
    </Suspense>
  );
}
