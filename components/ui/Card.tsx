import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "flat" | "bordered";
  children: React.ReactNode;
}

export function Card({
  className,
  variant = "bordered",
  children,
  ...props
}: CardProps) {
  const variantClasses = {
    bordered: "bg-white border border-[#EAE3D7] hover:border-[#C5A059] transition-colors duration-200",
    default: "bg-white border border-[#E2DBD0] shadow-sm",
    elevated: "bg-white border border-[#EAE3D7] shadow-md hover:shadow-lg transition-all duration-200",
    flat: "bg-[#FAF6EE] border border-transparent",
  };

  return (
    <div
      className={cn("p-6 sm:p-8", variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
