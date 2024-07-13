"use client";
import React, { useEffect, useState } from "react";
import Gallery from "@/components/gallery/index";
import { getImages } from "@/actions/user";
import Loader from "@/components/ui/Loader";
import useUserStore from "@/utils/userStore";
import { useRouter } from "next/navigation";
import useCustomToast from "@/hooks/useCustomToast";
import { useSearchParams } from "next/navigation";
const SORT_BY_OPTIONS = ["Newest to Oldest", "Oldest to Newest"];

export default function page() {
  const [images, setImages] = useState();
  const { user } = useUserStore();
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOption, setSelectedOption] = useState(SORT_BY_OPTIONS[0]);
  const router = useRouter();
  const { invokeToast } = useCustomToast();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;

  const handleGetImages = async () => {
    try {
      console.log("here");
      const isReverse = selectedOption === SORT_BY_OPTIONS[1];
      const response = await getImages(user.token, page, isReverse);
      setImages(response.images);
      setTotalPages(response.totalPages);
    } catch (error) {
      invokeToast(error?.response?.data || "Error fetching images", "Error");
      setImages([]);
      setTotalPages(1);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log(user?.token);
    if (user?.token) handleGetImages();
  }, [user.token, page, selectedOption]);

  if (!searchParams.get("page")) {
    router.push("/my-account/gallery?page=1");
  }
  if (!images) return <Loader text='Loading Images...' />;
  return (
    <Gallery
      images={images}
      totalPages={totalPages}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      SORT_BY_OPTIONS={SORT_BY_OPTIONS}
    />
  );
}
