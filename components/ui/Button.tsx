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
        "bg-[#14342B] text-[#FDFBF7] border border-[#14342B] hover:bg-[#0E241B] hover:border-[#C5A059] shadow-sm hover:shadow-md",
      secondary:
        "bg-transparent text-[#14342B] border border-[#14342B]/30 hover:border-[#14342B] hover:bg-[#14342B]/5",
      gold:
        "bg-[#C5A059] text-[#0E241B] border border-[#C5A059] hover:bg-[#B38D45] hover:border-[#9C7A33] shadow-sm hover:shadow-md font-bold",
      whatsapp:
        "bg-[#25D366] text-white border border-[#25D366] hover:bg-[#20BA59] shadow-sm hover:shadow-md font-semibold",
      outline:
        "bg-transparent text-[#C5A059] border border-[#C5A059] hover:bg-[#C5A059] hover:text-[#0E241B]",
      ghost:
        "bg-transparent text-[#14342B] hover:bg-[#14342B]/5 border border-transparent",
    };

    const combinedClasses = cn(
      "inline-flex items-center justify-center gap-2 rounded-none uppercase font-sans transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#C5A059]",
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
