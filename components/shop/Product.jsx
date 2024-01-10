import React, { useState } from "react";
import axios from "axios";
import useUserStore from "@/utils/store/userStore";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

export default function Product({ data }) {
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //to send data to backend for payment
  const handleClick = async () => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const successUrl = "http://localhost:3000/success";
      const cancelUrl = "http://localhost:3000/failure";

      const bodyData = {
        productid: data._id,
        userid: user._id,
        success_url: successUrl,
        cancel_url: cancelUrl,
      };

      console.log("Request Body:", bodyData);
      setIsLoading(true);
      const response = await axios.post(
        BACKEND_URL + "/api/payment/create-checkout-session",
        bodyData
      );

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );

      await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      console.log("Selected product:", response.data.id);
      router.replace(response.data.redirect);
      //redirect user
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-[#201f1f] p-4 rounded-md md:w-[30vw] w-full'>
      <img
        src='/Product1.png'
        alt='Product 1'
        className='w-full rounded-lg h-auto mb-4'
      />
      <div className='flex justify-between gap-y-4 flex-col items-center'>
        <div className='text-left flex justify-between w-full'>
          <p className='text-xl font-light mb-2'>
            Credit Points: {data.productName}
          </p>
          <p className='text-xl font-light mb-2'>Price: {data.value}$</p>
        </div>
        <button
          disabled={isLoading}
          onClick={handleClick}
          className='disabled:bg-green-400 bg-green-500 w-full text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue transition-all duration-300'
        >
          {isLoading ? "Processing" : "Buy"}
        </button>
      </div>
    </div>
  );
}
