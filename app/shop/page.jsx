import React from "react";
import Shop from "@/components/shop/Shop";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getProducts = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/api/products");

    return response.data || [];
  } catch (error) {
    return [];
  }
};

export default async function Page() {
  const products = await getProducts();

  return (
    <div>
      <Shop data={products} />
    </div>
  );
}
