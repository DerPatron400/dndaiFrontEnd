import React, { useState } from "react";
import CustomButton from "@/components/ui/custom-button";
import Tick from "@/components/ui/Icons/Tick";
import { cn } from "@/lib/utils";
import useUserStore from "@/utils/userStore";
import { createCheckoutSession } from "@/actions/payment";
import useCustomToast from "@/hooks/useCustomToast";
import Generate from "@/components/ui/Icons/Generate";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function cards({ plan, selectedPlan, stripe }) {
  const selectedPlay_formatted = selectedPlan.toLowerCase().replace("-", "");
  const chosenPrice = plan.price[selectedPlay_formatted];
  const discountedPrice = plan.discountedPrice[selectedPlay_formatted];
  const benefits = plan.benefits[selectedPlay_formatted];
  const blueCredits = plan.blueCredits[selectedPlay_formatted];
  const yellowCredits = plan.yellowCredits[selectedPlay_formatted];
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const { invokeToast } = useCustomToast();

  const handleCreateCheckoutSession = async () => {
    if (!user?.token) {
      invokeToast("Please login to continue", "Error");
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
      invokeToast(
        error?.response?.data?.error || "Something Went Wrong",
        "Error"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "border border-white/10 w-full relative bg-white/[8%] rounded-[16px]",
        plan.isPopular && "border-irisPurpleLight"
      )}
    >
      <div className='p-5 pb-4 flex flex-col gap-2'>
        {plan.isPopular && (
          <div className='flex uppercase absolute top-2.5 right-2.5 items-center gap-1.5 py-1.5 px-3.5 ps-3 rounded-[8px] bg-irisPurpleLight'>
            <Generate className='h-4 w-4 fill-russianViolet' />
            <span className='running-text-mono text-[10px] text-russianViolet font-[500]'>
              most popular
            </span>
          </div>
        )}
        <div className='flex items-center justify-between'>
          <h1 className='text-gray2 running-text-mono'>{plan.title}</h1>
        </div>
        <div className='text-white text-[22px]  headline-4 flex justify-start items-end gap-2'>
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
                {i === 0}
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
