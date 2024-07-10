import React, { useState } from "react";
import CustomButton from "../../ui/custom-button";
import Tick from "../../ui/Icons/Tick";
import useUserStore from "@/utils/userStore";
import { createCheckoutSession } from "@/actions/payment";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function card({ _package, stripe }) {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleCreateCheckoutSession = async () => {
    if (!user?.token) {
      return;
    }
    console.log("here");
    try {
      setLoading(true);
      const successUrl = BASE_URL + "/payment/status/success";
      const cancelUrl = BASE_URL + "/payment/status/failure";

      const payload = {
        productid: _package.productId,
        priceid: _package.priceId,
        plan: _package,
        userid: user._id,
        success_url: successUrl,
        cancel_url: cancelUrl,
        reward: {
          yellowCredits:
            _package.creditsType === "yellow" ? _package.credits : 0,
          blueCredits: _package.creditsType === "blue" ? _package.credits : 0,
        },
        //mode should be subscription for subscription products
        mode: "payment",
      };

      const response = await createCheckoutSession(payload, user.token);

      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full border border-white/10 bg-white/[8%] rounded-[16px]'>
      <div className='p-5 pb-4 flex flex-col gap-2'>
        <h1 className='text-gray2 running-text text-[14px]'>
          {_package.title}
        </h1>
        <h2 className='text-white headline-4 flex justify-start items-end gap-2'>
          {_package.price}
        </h2>
      </div>
      <div className='p-4 px-5 border-y border-white/10'>
        <ul className='text-white flex flex-col gap-2'>
          <li className='flex gap-2 justify-start items-center'>
            <img
              src={
                _package.creditsType === "yellow"
                  ? "/gems/Legendary.png"
                  : "/gems/Mythic.png"
              }
              alt=''
              className='w-4 h-4'
            />
            <span className='text-white running-text-mono'>
              {_package.credits}
            </span>
          </li>
        </ul>
      </div>
      <div className='p-5 pt-4 flex flex-col gap-5'>
        <ul className='text-white   flex flex-col gap-2'>
          <li className='flex gap-2 justify-start items-center'>
            <Tick className='h-3.5 w-3.5 opacity-70' />
            <span className='text-white running-text-small '>
              {_package.benefit}
            </span>
          </li>
        </ul>
        <CustomButton
          loading={loading}
          onClick={handleCreateCheckoutSession}
          variant={"primary"}
          className={"w-full"}
        >
          Buy now
        </CustomButton>
      </div>
    </div>
  );
}
