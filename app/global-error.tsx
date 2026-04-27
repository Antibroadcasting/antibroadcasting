"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-bg-base flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-default mb-4">
            Application Error
          </h1>
          <p className="text-lg text-text-muted mb-2 max-w-md mx-auto">
            A critical error has occurred. We apologize for the inconvenience.
          </p>
          {error.digest && (
            <p className="text-sm text-text-muted/60 mb-8 font-mono">
              Error ID: {error.digest}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-button bg-button-primary-surface text-button-primary-text hover:bg-button-primary-surface-hover transition-colors"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-button bg-button-secondary-surface text-button-secondary-text hover:bg-button-secondary-surface-hover transition-colors"
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
