import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "whatsapp" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isExternal = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs font-medium tracking-wider",
      md: "px-5 py-2.5 text-sm font-semibold tracking-wide",
      lg: "px-7 py-3.5 text-base font-semibold tracking-wide",
    };

    const variantClasses = {
      primary:
        "bg-[#0F4735] text-[#FFFFFF] border border-[#0F4735] hover:bg-[#083526] hover:border-[#B88A2A] shadow-xs hover:shadow-md",
      secondary:
        "bg-transparent text-[#0F4735] border border-[#0F4735] hover:bg-[#0F4735] hover:text-[#FFFFFF] shadow-2xs",
      gold:
        "bg-[#B88A2A] text-[#FFFFFF] border border-[#B88A2A] hover:bg-[#9C731F] hover:border-[#9C731F] shadow-xs hover:shadow-md font-bold",
      whatsapp:
        "bg-[#25D366] text-white border border-[#25D366] hover:bg-[#20BA59] shadow-xs hover:shadow-md font-semibold",
      outline:
        "bg-transparent text-[#0F4735] border border-[#0F4735] hover:bg-[#0F4735] hover:text-[#FFFFFF]",
      ghost:
        "bg-transparent text-[#0F4735] hover:bg-[#E7EDE2] border border-transparent",
    };

    const combinedClasses = cn(
      "inline-flex items-center justify-center gap-2 rounded-none uppercase font-sans transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-[#B88A2A]",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
          >
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses}>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
