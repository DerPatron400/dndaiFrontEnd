import React from "react";
import Shop from "@/components/shop/Shop";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getProducts = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/api/products");
    console.log("Products:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export default async function Page() {
  const products = await getProducts();
  console.log(products);
  return (
    <div>
      <Shop data={products} />
    </div>
  );
}
