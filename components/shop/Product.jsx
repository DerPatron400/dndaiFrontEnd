import React from "react";
import axios from "axios";
import useUserStore from "@/utils/store/userStore";

export default function Product({ data }) {
  const user = useUserStore((state) => state.user._id);
  console.log("User:", user);

  //to send data to backend for payment
  const handleClick = async () => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const successUrl = "http://localhost:3000/success";
      const cancelUrl = "https://dndai.app/cancel.html";

      const bodyData = {
        productid: data._id,
        userid: user,
        success_url: successUrl,
        cancel_url: cancelUrl,
      };

      console.log("Request Body:", bodyData);

      const response = await axios.post(
        BACKEND_URL + "/create-checkout-session",
        bodyData
      );

      console.log("Selected product:", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#201f1f] p-4 rounded-md md:w-[30vw] w-full">
      <img
        src="/Product1.png"
        alt="Product 1"
        className="w-full rounded-lg h-auto mb-4"
      />
      <div className="flex justify-between gap-y-4 flex-col items-center">
        <div className="text-left flex justify-between w-full">
          <p className="text-xl font-light mb-2">
            Credit Points: {data.productName}
          </p>
          <p className="text-xl font-light mb-2">Price: {data.value}$</p>
        </div>
        <button
          onClick={handleClick}
          className="bg-green-500 w-full text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue transition-all duration-300"
        >
          Buy
        </button>
      </div>
    </div>
  );
}
