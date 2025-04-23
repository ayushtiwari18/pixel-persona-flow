
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonOutlineVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        light: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900"
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonOutlineProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonOutlineVariants> {
  asChild?: boolean;
}

const ButtonOutline = React.forwardRef<HTMLButtonElement, ButtonOutlineProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonOutlineVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonOutline.displayName = "ButtonOutline";

export { ButtonOutline, buttonOutlineVariants };
