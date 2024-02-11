"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import Images from "@/components/images/Images";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Page() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const uid = Cookies.get("uid"); // Use js-cookie to get the cookie

      try {
        // Make the API request to your backend with parameters correctly
        const response = await axios.get(`${BACKEND_URL}/api/images/`, {
          params: { _id: uid },
        });

        // Update state with the fetched images
        setImages(response.data.images);
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
