import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F5EFEB] border border-[#E2DBD0] text-[#C5A059] font-serif font-bold text-3xl">
          404
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#14342B]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#181C20]/70 leading-relaxed font-sans">
          The campus page or resource you are looking for has moved or does not exist. Please return to our main portal or explore our academics and admissions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" href="/" leftIcon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
          <Button variant="secondary" href="/admissions" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Admissions Desk
          </Button>
        </div>
      </div>
    </div>
  );
}
