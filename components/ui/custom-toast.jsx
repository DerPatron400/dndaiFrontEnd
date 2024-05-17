"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
export default function ToastWithAction({
  message,
  title,
  actionText,
  actionIcon,
}) {
  const { toast } = useToast();

  toast({
    title: title,
    description: "",
    className: cn(
      "border-0 text-white font-roboto-mono uppercase",
      message === "Error" ? "bg-[#C92631] " : "bg-[#4767DC] "
    ),
    action: (
      <ToastAction altText='Try again' className='gap-x-2'>
        {actionIcon}
        {actionText}
      </ToastAction>
    ),
  });

  return null;
}
