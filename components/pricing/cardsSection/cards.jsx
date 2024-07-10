import React, { useState } from "react";
import CustomButton from "@/components/ui/custom-button";
import Tick from "@/components/ui/Icons/Tick";
import { cn } from "@/lib/utils";
import useUserStore from "@/utils/userStore";
import { createCheckoutSession } from "@/actions/payment";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function cards({ plan, selectedPlan, stripe }) {
  console.log(selectedPlan);
  const selectedPlay_formatted = selectedPlan.toLowerCase().replace("-", "");
  const chosenPrice = plan.price[selectedPlay_formatted];
  const discountedPrice = plan.discountedPrice[selectedPlay_formatted];
  const benefits = plan.benefits[selectedPlay_formatted];
  const blueCredits = plan.blueCredits[selectedPlay_formatted];
  const yellowCredits = plan.yellowCredits[selectedPlay_formatted];
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  const handleCreateCheckoutSession = async () => {
    if (!user?.token) {
      return;
    }
    try {
      setLoading(true);
      const successUrl = BASE_URL + "/payment/status/success";
      const cancelUrl = BASE_URL + "/payment/status/failure";

      const payload = {
        productid: plan.productIds[selectedPlay_formatted],
        priceid: plan.priceIds[selectedPlay_formatted],
        plan: { ...plan, duration: selectedPlan, price: chosenPrice },
        userid: user._id,
        reward: {
          yellowCredits: yellowCredits,
          blueCredits: blueCredits,
        },
        success_url: successUrl,

        cancel_url: cancelUrl,
        mode: "subscription",
      };

      const response = await createCheckoutSession(payload, user.token);

      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='border border-white/10 w-full bg-white/[8%] rounded-[16px]'>
      <div className='p-5 pb-4 flex flex-col gap-2'>
        <h1 className='text-gray2 running-text-mono'>{plan.title}</h1>
        <div className='text-white headline-4 flex justify-start items-end gap-2'>
          <span className={cn(discountedPrice && "text-errorRed line-through")}>
            {chosenPrice}
          </span>
          {discountedPrice && <span>{discountedPrice}</span>}
          <span className='text-gray2 running-text-mono'> /month</span>
        </div>
      </div>
      <div className='p-4  px-5 border-y border-white/10'>
        <ul className='text-white flex flex-col gap-3'>
          <li className='flex gap-2 justify-start items-center'>
            <img src='/gems/Legendary.png' alt='' className='w-4 h-4' />
            <span className='text-white running-text-mono'>
              {yellowCredits}
            </span>
          </li>
          <li className='flex gap-2 justify-start items-center'>
            <img src='/gems/Mythic.png' alt='' className='w-4 h-4' />
            <span className='text-white running-text-mono'> {blueCredits}</span>
          </li>
        </ul>
      </div>
      <div className='p-4 px-5 flex flex-col gap-4'>
        <ul className='text-white flex flex-col gap-3'>
          {benefits?.map((benefit, i) => (
            <li key={i} className='flex gap-2 justify-start items-center'>
              <Tick className='h-3.5 w-3.5 opacity-70' />
              <span className='text-white running-text-small '>
                {benefit}
                {i === 0 && <span className='text-gray2 '> / month</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className='pb-5 px-5'>
        <CustomButton
          onClick={handleCreateCheckoutSession}
          variant={"primary"}
          disabled={loading}
          className={"w-full"}
        >
          Subscribe now
        </CustomButton>
      </div>
    </div>
  );
}
