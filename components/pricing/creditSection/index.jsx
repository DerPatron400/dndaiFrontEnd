import React from "react";
import Card from "./card";

const creditPackages = [
  {
    title: "SMALL",
    credits: 25,
    creditsType: "yellow",
    benefit: "25 images or custom campaigns",
    price: "5,90€",
    productId: process.env.NEXT_PUBLIC_STRIPE_25_YELLOW_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_25_YELLOW_PRICE_ID,
  },
  {
    title: "MEDIUM",
    credits: 50,
    creditsType: "yellow",
    benefit: "50 images or custom campaigns",
    price: "10,80€",
    productId: process.env.NEXT_PUBLIC_STRIPE_30_YELLOW_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_30_YELLOW_PRICE_ID,
  },
  {
    title: "LARGE",
    credits: 100,
    creditsType: "yellow",
    benefit: "100 images or custom campaigns",
    price: "19,20€",
    productId: process.env.NEXT_PUBLIC_STRIPE_100_YELLOW_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_100_YELLOW_PRICE_ID,
  },
  {
    title: "SMALL",
    credits: 180,
    creditsType: "blue",
    benefit: "Over 3 hours of playtime",
    price: "18,00€",
    productId: process.env.NEXT_PUBLIC_STRIPE_100_BLUE_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_100_BLUE_PRICE_ID,
  },
  {
    title: "MEDIUM",
    credits: 300,
    creditsType: "blue",
    benefit: "Over 9 hours of playtime",
    price: "48,60€",
    productId: process.env.NEXT_PUBLIC_STRIPE_300_BLUE_PRODUCT_ID,
    priceId: process.env.NEXT_PUBLIC_STRIPE_300_BLUE_PRICE_ID,
  },
  {
    title: "LARGE",
    credits: 500,
    creditsType: "blue",
    benefit: "Over 15 hours of playtime",
    price: "72,00€",
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
