import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Assuming you have an icon component or library
import { User } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-none focus-visible:ring-none focus-visible:ring-offset-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blur-1 text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 w-10", // Adjusted for circular shape
        sm: "h-9 w-9", // Adjusted for circular shape
        lg: "h-11 w-11", // Adjusted for circular shape
        icon: "h-10 w-10", // Adjusted for circular shape
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const IconButton = React.forwardRef(
  ({ className, variant, size, icon, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon && <User name={icon} />} {/* Render the icon component */}
        {props.children}
      </Comp>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, buttonVariants };
