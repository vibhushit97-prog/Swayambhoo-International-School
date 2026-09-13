"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#14342B] text-[#C5A059] border border-[#C5A059]/40">
          !
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#14342B]">
          Something went wrong
        </h1>
        <p className="text-sm text-[#181C20]/70 leading-relaxed">
          An unexpected error occurred while loading this page. Our technical team has been notified.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" onClick={() => reset()} leftIcon={<RefreshCw className="w-4 h-4" />}>
            Try Again
          </Button>
          <Button variant="secondary" href="/" leftIcon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
