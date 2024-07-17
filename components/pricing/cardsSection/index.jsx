"use client";
import React, { useState } from "react";
import CustomRadioButton from "@/components/ui/custom-radio-button";
import Cards from "@/components/pricing/cardsSection/cards";
const subscriptionPlans = [
  {
    title: "ADVENTURER",
    price: {
      monthly: "9,99€",
      semiannually: "9,99€",
      annually: "9,99€",
    },
    discountedPrice: {
      monthly: null,
      semiannually: "8,99€",
      annually: "7,67€",
    },
    productIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ADVENTURER_PRODUCT_ID,
      semiannually:
        process.env.NEXT_PUBLIC_STRIPE_SEMI_ANNUALLY_ADVENTURER_PRODUCT_ID,
      annually: process.env.NEXT_PUBLIC_STRIPE_ANNUALLY_ADVENTURER_PRODUCT_ID,
    },
    priceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ADVENTURER_PRICE_ID,
      semiannually:
        process.env.NEXT_PUBLIC_STRIPE_SEMI_ANNUALLY_ADVENTURER_PRICE_ID,
      annually: process.env.NEXT_PUBLIC_STRIPE_ANNUALLY_ADVENTURER_PRICE_ID,
    },
    yellowCredits: {
      monthly: 10,
      semiannually: 60,
      annually: 120,
    },
    blueCredits: {
      monthly: 120,
      semiannually: 700,
      annually: 1420,
    },
    benefits: {
      monthly: [
        "Over 10 hours of playtime ",
        "10 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 20 hours of playtime ",
        "60 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 40 hours of playtime ",
        "120 images or custom campaigns",
        "Annually cancelable",
      ],
    },
  },
  {
    title: "CHAMPION",
    price: {
      monthly: "14,99€",
      semiannually: "14,99€",
      annually: "14,99€",
    },
    discountedPrice: {
      monthly: null,
      semiannually: "12,99€",
      annually: "11,67€",
    },
    productIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_CHAMPION_PRODUCT_ID,
      semiannually:
        process.env.NEXT_PUBLIC_STRIPE_SEMI_ANNUALLY_CHAMPION_PRODUCT_ID,
      annually: process.env.NEXT_PUBLIC_STRIPE_ANNUALLY_CHAMPION_PRODUCT_ID,
    },
    priceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_CHAMPION_PRICE_ID,
      semiannually:
        process.env.NEXT_PUBLIC_STRIPE_SEMI_ANNUALLY_CHAMPION_PRICE_ID,
      annually: process.env.NEXT_PUBLIC_STRIPE_ANNUALLY_CHAMPION_PRICE_ID,
    },
    yellowCredits: {
      monthly: 15,
      semiannually: 100,
      annually: 200,
    },
    blueCredits: {
      monthly: 200,
      semiannually: 1200,
      annually: 2300,
    },
    benefits: {
      monthly: [
        "Over 16 hours of playtime ",
        "15 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 100 hours of playtime ",
        "100 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 190 hours of playtime ",
        "200 images or custom campaigns",
        "Annually cancelable",
      ],
    },
  },
  {
    title: "MYTHIC",
    price: {
      monthly: "29,99€",
      semiannually: "29,99€",
      annually: "29,99€",
    },
    discountedPrice: {
      monthly: null,
      semiannually: "25,99€",
      annually: "22,67€",
    },
    isPopular: true,
    productIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_MYTHIC_PRODUCT_ID,
      semiannually:
        process.env.NEXT_PUBLIC_STRIPE_SEMI_ANNUALLY_MYTHIC_PRODUCT_ID,
      annually: process.env.NEXT_PUBLIC_STRIPE_ANNUALLY_MYTHIC_PRODUCT_ID,
    },
    priceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_MYTHIC_PRICE_ID,
      semiannually:
        process.env.NEXT_PUBLIC_STRIPE_SEMI_ANNUALLY_MYTHIC_PRICE_ID,
      annually: process.env.NEXT_PUBLIC_STRIPE_ANNUALLY_MYTHIC_PRICE_ID,
    },
    yellowCredits: {
      monthly: 35,
      semiannually: 200,
      annually: 420,
    },
    blueCredits: {
      monthly: 420,
      semiannually: 2500,
      annually: 5000,
    },
    benefits: {
      monthly: [
        "Over 35 hours of playtime ",
        "35 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 210 hours of playtime ",
        "200 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 420 hours of playtime ",
        "420 images or custom campaigns",
        "Annually cancelable",
      ],
    },
  },
  {
    title: "LEGEND",
    price: {
      monthly: "49,99€",
      semiannually: "49,99€",
      annually: "49,99€",
    },
    discountedPrice: {
      monthly: null,
      semiannually: "44,99€",
      annually: "39,67€",
    },
    productIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LEGEND_PRODUCT_ID,
      semiannually:
        process.env.NEXT_PUBLIC_STRIPE_SEMI_ANNUALLY_LEGEND_PRODUCT_ID,
      annually: process.env.NEXT_PUBLIC_STRIPE_ANNUALLY_LEGEND_PRODUCT_ID,
    },
    priceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LEGEND_PRICE_ID,
      semiannually:
        process.env.NEXT_PUBLIC_STRIPE_SEMI_ANNUALLY_LEGEND_PRICE_ID,
      annually: process.env.NEXT_PUBLIC_STRIPE_ANNUALLY_LEGEND_PRICE_ID,
    },
    yellowCredits: {
      monthly: 70,
      semiannually: 420,
      annually: 850,
    },
    blueCredits: {
      monthly: 840,
      semiannually: 5050,
      annually: 10000,
    },
    benefits: {
      monthly: [
        "Over 70 hours of playtime ",
        "90 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 420 hours of playtime ",
        "420 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 840 hours of playtime ",
        "850 images or custom campaigns",
        "Annually cancelable",
      ],
    },
  },
];

export default function index({ stripe }) {
  const options = ["Monthly", "Semi-Annually", "Annually"];
  const [selectedPlan, setSelectedPlan] = useState(options[0]);

  return (
    <div className='z-10  w-full h-full flex flex-col md:gap-5 gap-10 md:flex-col text-white justify-center items-center'>
      <CustomRadioButton
        options={options}
        selectedOption={selectedPlan}
        className={
          "flex flex-col justify-center items-center  sm:flex-row flex-wrap "
        }
        onChange={setSelectedPlan}
      />
      <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
        {subscriptionPlans.map((plan, i) => (
          <Cards
            key={i}
            plan={plan}
            selectedPlan={selectedPlan}
            stripe={stripe}
          />
        ))}
      </div>
    </div>
  );
}
