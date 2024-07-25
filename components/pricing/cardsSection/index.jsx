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
      monthly: 30,
      semiannually: 170,
      annually: 340,
    },
    blueCredits: {
      monthly: 1500,
      semiannually: 9000,
      annually: 18000,
    },
    benefits: {
      monthly: [
        "Over 50 hours of playtime ",
        "30 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 300 hours of playtime ",
        "170 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 600 hours of playtime ",
        "340 images or custom campaigns",
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
      monthly: 45,
      semiannually: 270,
      annually: 540,
    },
    blueCredits: {
      monthly: 2400,
      semiannually: 14500,
      annually: 29000,
    },
    benefits: {
      monthly: [
        "Over 80 hours of playtime ",
        "45 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 483 hours of playtime ",
        "270 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 967 hours of playtime ",
        "540 images or custom campaigns",
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
      monthly: 100,
      semiannually: 600,
      annually: 1200,
    },
    blueCredits: {
      monthly: 5300,
      semiannually: 32000,
      annually: 64000,
    },
    benefits: {
      monthly: [
        "Over 176 hours of playtime ",
        "100 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 1060 hours of playtime ",
        "600 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 2120 hours of playtime ",
        "1200 images or custom campaigns",
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
      monthly: 200,
      semiannually: 1200,
      annually: 2400,
    },
    blueCredits: {
      monthly: 10500,
      semiannually: 64000,
      annually: 120000,
    },
    benefits: {
      monthly: [
        "Over 350 hours of playtime ",
        "200 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 2133 hours of playtime ",
        "1200 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 4000 hours of playtime ",
        "2400 images or custom campaigns",
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
      <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 '>
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
