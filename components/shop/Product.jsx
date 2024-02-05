import React, { useState } from "react";
import axios from "axios";
import useUserStore from "@/utils/store/userStore";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function Product({ data }) {
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //to send data to backend for payment
  const handleClick = async () => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const successUrl = BASE_URL + "/payment-status/success";
      const cancelUrl = BASE_URL + "/payment-status/failure";

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
    <div className='bg-[#201f1f] shadow-lg p-4 rounded-lg md:w-[30vw] w-full'>
      <img
        src={data.imageUrl || "/Product1.png"}
        alt='Product 1'
        className='w-full rounded-lg h-auto mb-4'
      />
      <div className='flex justify-between gap-y-4 mt-2  flex-col items-center'>
        <div className='text-left flex justify-between w-full'>
          <div className='flex gap-x-2 items-center'>
            <span className='text-xl font-light '>{data.productName} </span>
            <img
              src='/CreditsDndAi.png'
              alt=''
              className='w-4 h-6 bg-transparent'
            />
          </div>
          <p className='text-xl font-light '>
            {data.value} <span className='text-sm'>$</span>
          </p>
        </div>
        <button
          disabled={isLoading}
          onClick={handleClick}
          className='disabled:bg-green-400 w-full bg-gradient-to-t from-green-950 to-green-500 text-white px-4 py-2 mb-2 sm:mb-2 rounded-md hover:to-green-700 hover:from-green-400 transition-all'
        >
          {isLoading ? "Processing" : "Buy"}
        </button>
      </div>
    </div>
  );
}
