import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-rose-500/25",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/25",
        outline:
          "border border-zinc-600 bg-transparent hover:bg-zinc-800 hover:border-zinc-500 text-white shadow-sm",
        secondary:
          "bg-gradient-to-r from-zinc-700 to-zinc-800 text-white hover:from-zinc-600 hover:to-zinc-700 shadow-sm",
        ghost: "hover:bg-zinc-800 text-white hover:text-white",
        link: "text-rose-500 underline-offset-4 hover:underline hover:text-rose-400",
        success:
          "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-emerald-500/25",
        warning:
          "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-amber-500/25",
        info:
          "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-blue-500/25",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        xl: "h-16 px-10 py-5 text-lg",
        icon: "h-12 w-12",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  asChild = false, 
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, className }),
        loading && "cursor-wait",
        // Glow effect for non-ghost variants
        variant !== "ghost" && variant !== "link" && "hover:shadow-xl",
        // Special glow colors for each variant
        variant === "default" && "hover:shadow-rose-500/20",
        variant === "success" && "hover:shadow-emerald-500/20",
        variant === "destructive" && "hover:shadow-red-500/20",
        variant === "warning" && "hover:shadow-amber-500/20",
        variant === "info" && "hover:shadow-blue-500/20",
      )}
      ref={ref}
      disabled={isDisabled}
      {...props}
    >
      {/* Left Icon or Loading Spinner */}
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      
      {/* Content */}
      {!loading && children && (
        <span className={cn(
          "flex-1 truncate",
          (leftIcon || rightIcon) && "mx-1"
        )}>
          {children}
        </span>
      )}
      
      {loading && children && (
        <span className="flex-1 truncate opacity-70">
          {typeof children === "string" ? "Loading..." : children}
        </span>
      )}
      
      {/* Right Icon */}
      {!loading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };