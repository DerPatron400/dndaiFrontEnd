"use client";
import React, { useEffect, useState } from "react";
import Gallery from "@/components/gallery/index";
import { getImages } from "@/actions/user";
import Loader from "@/components/ui/Loader";
import useUserStore from "@/utils/userStore";
import { useRouter } from "next/navigation";

export default function page() {
  const [images, setImages] = useState();
  const { user } = useUserStore();
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOption, setSelectedOption] = useState();
  const router = useRouter();

  const page = parseInt(router.query?.page) || 1;
  const handleGetImages = async () => {
    try {
      const response = await getImages(user.token, page);
      console.log("response", response);
      setImages(response.images);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (user?.token) handleGetImages();
  }, [user.token]);

  if (!router.query?.page) router.push("/my-account/gallery?page=1");
  if (!images) return <Loader text='Loading Images...' />;
  return (
    <Gallery
      images={images}
      totalPages={totalPages}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  );
}
