import React from "react";
import Card from "./card";

const creditPackages = [
  {
    title: "SMALL",
    credits: 40,
    creditsType: "yellow",
    benefit: "40 images or custom campaigns",
    price: "5,99€",
    productId: process.env.NEXT_PUBLIC_STRIPE_25_YELLOW_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_25_YELLOW_PRICE_ID,
  },
  {
    title: "MEDIUM",
    credits: 80,
    creditsType: "yellow",
    benefit: "80 images or custom campaigns",
    price: "9,99€",
    productId: process.env.NEXT_PUBLIC_STRIPE_30_YELLOW_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_30_YELLOW_PRICE_ID,
  },
  {
    title: "LARGE",
    credits: 260,
    creditsType: "yellow",
    benefit: "260 images or custom campaigns",
    price: "29,99€",
    productId: process.env.NEXT_PUBLIC_STRIPE_100_YELLOW_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_100_YELLOW_PRICE_ID,
  },
  {
    title: "SMALL",
    credits: 1500,
    creditsType: "blue",
    benefit: "Over 50 hours of playtime",
    price: "9,99€",
    productId: process.env.NEXT_PUBLIC_STRIPE_100_BLUE_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_100_BLUE_PRICE_ID,
  },
  {
    title: "MEDIUM",
    credits: 3000,
    creditsType: "blue",
    benefit: "Over 100 hours of playtime",
    price: "18,99€",
    productId: process.env.NEXT_PUBLIC_STRIPE_300_BLUE_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_300_BLUE_PRICE_ID,
  },
  {
    title: "LARGE",
    credits: 7000,
    creditsType: "blue",
    benefit: "Over 233 hours of playtime",
    price: "39,99€",
    productId: process.env.NEXT_PUBLIC_STRIPE_500_BLUE_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_500_BLUE_PRICE_ID,
  },
];

export default function index({ stripe }) {
  return (
    <div className='z-10  w-full h-full flex flex-col md:gap-12 gap-10 md:flex-col text-white justify-center items-center md:mt-16'>
      <span className='text-center w-3/4 block text-white headline-3 z-[10] '>
        Our <span className='text-irisPurpleLight'>credit packages</span> at a
        glance.{" "}
      </span>
      <div className=' w-full   md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {creditPackages.map((_package, i) => (
          <Card key={i} _package={_package} stripe={stripe} />
        ))}
      </div>
    </div>
  );
}
