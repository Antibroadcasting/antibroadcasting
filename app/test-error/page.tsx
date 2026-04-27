"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";

export default function TestErrorPage() {
  const [shouldError, setShouldError] = useState(false);

  // Test 1: Synchronous render error
  if (shouldError) {
    throw new Error("This is a test error for error.tsx");
  }

  // Test 2: Event handler error (this won't trigger error boundary)
  const handleClickError = () => {
    throw new Error("Button click error (check console)");
  };

  // Test 3: Async error (this won't trigger error boundary either)
  const handleAsyncError = async () => {
    try {
      await fetch("/api/trigger-error");
    } catch (e) {
      console.error("Async error caught:", e);
    }
    // But throwing after async will:
    setTimeout(() => {
      throw new Error("Async delayed error");
    }, 100);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-text-default mb-8">Error Handler Test Page</h1>
      
      <div className="space-y-8">
        <section className="p-6 border border-border-default rounded-lg bg-bg-subtle">
          <h2 className="text-xl font-semibold text-text-default mb-4">Test 1: Render Error</h2>
          <p className="text-text-secondary mb-4">
            This will trigger the <code className="font-mono text-sm bg-bg-inset px-1 py-0.5 rounded">error.tsx</code> boundary by throwing during component render.
          </p>
          <button
            onClick={() => setShouldError(true)}
            className={buttonVariants({ variant: "destructive", size: "md" })}
          >
            Trigger Render Error
          </button>
        </section>

        <section className="p-6 border border-border-default rounded-lg bg-bg-subtle">
          <h2 className="text-xl font-semibold text-text-default mb-4">Test 2: Event Handler Error</h2>
          <p className="text-text-secondary mb-4">
            Errors in event handlers don't trigger error boundaries. Check the browser console.
          </p>
          <button
            onClick={handleClickError}
            className={buttonVariants({ variant: "outline", size: "md" })}
          >
            Log Error to Console
          </button>
        </section>

        <section className="p-6 border border-border-default rounded-lg bg-bg-subtle">
          <h2 className="text-xl font-semibold text-text-default mb-4">Test 3: Async Error</h2>
          <p className="text-text-secondary mb-4">
            Sets a timeout that throws an error after 100ms. This WILL trigger the error boundary.
          </p>
          <button
            onClick={handleAsyncError}
            className={buttonVariants({ variant: "outline", size: "md" })}
          >
            Trigger Async Error
          </button>
        </section>

        <section className="p-6 border border-border-default rounded-lg bg-bg-subtle">
          <h2 className="text-xl font-semibold text-text-default mb-4">Test 4: Global Error (Manual)</h2>
          <p className="text-text-secondary mb-4">
            To test <code className="font-mono text-sm bg-bg-inset px-1 py-0.5 rounded">global-error.tsx</code>, temporarily add this to <code className="font-mono text-sm bg-bg-inset px-1 py-0.5 rounded">app/layout.tsx</code>:
          </p>
          <pre className="bg-bg-inset p-4 rounded-lg text-sm font-mono text-text-secondary overflow-x-auto">
{`// Add inside RootLayout component, before return:
if (process.env.NODE_ENV === "development") {
  throw new Error("Test global layout error");
}`}
          </pre>
        </section>
      </div>

      <div className="mt-12 p-4 border-l-4 border-border-warning bg-bg-warning-subtle rounded-r-lg">
        <p className="text-sm text-text-default">
          <strong>Note:</strong> Delete this page before deploying to production.
        </p>
      </div>
    </div>
  );
}
