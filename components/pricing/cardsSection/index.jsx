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
      semiannually: 75,
      annually: 150,
    },
    blueCredits: {
      monthly: 70,
      semiannually: 400,
      annually: 800,
    },
    benefits: {
      monthly: [
        "Over 4 hours of playtime ",
        "10 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 20 hours of playtime ",
        "70 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 40 hours of playtime ",
        "150 images or custom campaigns",
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
      monthly: 20,
      semiannually: 120,
      annually: 242,
    },
    blueCredits: {
      monthly: 110,
      semiannually: 640,
      annually: 1280,
    },
    benefits: {
      monthly: [
        "Over 5 hours of playtime ",
        "20 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 32 hours of playtime ",
        "120 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 64 hours of playtime ",
        "242 images or custom campaigns",
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
      monthly: 42,
      semiannually: 260,
      annually: 525,
    },
    blueCredits: {
      monthly: 235,
      semiannually: 1400,
      annually: 2800,
    },
    benefits: {
      monthly: [
        "Over 12 hours of playtime ",
        "42 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 70 hours of playtime ",
        "260 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 140 hours of playtime ",
        "525 images or custom campaigns",
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
      monthly: 90,
      semiannually: 530,
      annually: 1055,
    },
    blueCredits: {
      monthly: 500,
      semiannually: 2800,
      annually: 5650,
    },
    benefits: {
      monthly: [
        "Over 25 hours of playtime ",
        "90 images or custom campaigns",
        "Monthly cancelable",
      ],
      semiannually: [
        "Over 140 hours of playtime ",
        "530 images or custom campaigns",
        "Semi-Annually cancelable",
      ],
      annually: [
        "Over 283 hours of playtime ",
        "1055 images or custom campaigns",
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
