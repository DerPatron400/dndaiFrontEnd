import Images from "@/components/images/Images";
import React from "react";
import axios from "axios";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getImages = async () => {
  const cookieStore = cookies();

  const uid = cookieStore.get("uid").value;

  try {
    const response = await axios.get(BACKEND_URL + "/api/images/", {
      params: {
        _id: uid,
      },
    });

    return response.data.images;
  } catch (error) {
    return [];
  }
};

export default async function Page() {
  const images = await getImages();

  return (
    <div>
      <Images data={images} />
    </div>
  );
}
