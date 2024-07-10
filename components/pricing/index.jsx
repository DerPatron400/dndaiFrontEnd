"use client";
import React, { useState, useEffect } from "react";
import CardSection from "@/components/pricing/cardsSection/index";
import GemsSection from "@/components/pricing/gemsSection/index";
import CreditSection from "@/components/pricing/creditSection/index";
import { loadStripe } from "@stripe/stripe-js";

//load stripe

export default function index() {
  const [stripe, setStripe] = useState(null);

  const handleLoadStripe = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    setStripe(stripe);
  };
  useEffect(() => {
    handleLoadStripe();
  }, []);
  return (
    <div className='h-full z-[10] border-green-500 w-full flex flex-col px-5 lg:px-12 pb-32 pt-[130px]  md:py-[160px] md:pb-64 gap-16'>
      <div className='flex flex-col justify-center items-center gap-2.5 '>
        <span className='text-center w-full md:w-2/4 block text-white headline-3 z-[10] '>
          Start you epic journey! Dive into{" "}
          <span className='text-irisPurple'>AI-Powered adventures</span> where
          your imagination rules the realm!
        </span>
      </div>

      <CardSection stripe={stripe} />
      <GemsSection />
      <CreditSection stripe={stripe} />
    </div>
  );
}
