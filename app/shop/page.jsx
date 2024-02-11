"use client";
import React, { useEffect, useState } from "react";
import Shop from "@/components/shop/Shop";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products`);
        setProducts(response.data); // Assuming the response data is the array of products
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set products to an empty array in case of error
      }
    };

    getProducts();
  }, []); // The empty dependency array ensures this effect runs once on component mount

  return (
    <div>
      <Shop data={products} />
    </div>
  );
}
