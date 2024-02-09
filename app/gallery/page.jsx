import Images from "@/components/images/Images";
import React from "react";

import { cookies } from "next/headers";
import { fetchImages } from "@/api/user";

const getImages = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get("token").value;

  try {
    const response = await fetchImages(token);
    return response;
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
