"use client";
import React, { useEffect, useState } from "react";
import Gallery from "@/components/gallery/index";
import { getImages } from "@/actions/user";
import Loader from "@/components/ui/Loader";
import useUserStore from "@/utils/userStore";

export default function page() {
  const [images, setImages] = useState();
  const { user } = useUserStore();

  const handleGetImages = async () => {
    try {
      const response = await getImages(user.token);
      console.log("response", response);  
      setImages(response.images);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (user?.token) handleGetImages();
  }, [user]);

  if (!images) return <Loader text='Loading Images...' />;
  return <Gallery images={images} />;
}
