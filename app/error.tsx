"use client";

import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-text-default mb-4">
        Something went wrong
      </h1>
      <p className="text-lg text-text-muted mb-2 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      {error.digest && (
        <p className="text-sm text-text-muted/60 mb-8 font-mono">
          Error ID: {error.digest}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className={buttonVariants({ variant: "primary", size: "md" })}
        >
          Try again
        </button>
        <a href="/" className={buttonVariants({ variant: "secondary", size: "md" })}>
          Return Home
        </a>
      </div>
    </div>
  );
}
