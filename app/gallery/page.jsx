"use client";
import React, { useEffect, useState } from "react";

import Images from "@/components/images/Images";
import { fetchImages } from "@/api/user";
import useUserStore from "@/utils/store/userStore";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Page() {
  const [images, setImages] = useState([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const getImages = async () => {
      try {
        // Make the API request to your backend with parameters correctly
        const data = await fetchImages(user.token);

        // Update state with the fetched images
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch images:", error);
        setImages([]);
      }
    };

    getImages();
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div>
      <Images data={images} />
    </div>
  );
}
