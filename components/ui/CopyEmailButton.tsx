"use client";

import { useState } from "react";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — degrade silently
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
      <span className="font-medium text-text-primary select-all">{email}</span>
      <button
        onClick={handleCopy}
        aria-label={copied ? "Copied!" : "Copy email address"}
        className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-1 py-0.5"
      >
        {copied ? (
          <CheckOutlined className="text-success" />
        ) : (
          <CopyOutlined />
        )}
        <span className="sr-only sm:not-sr-only">
          {copied ? "Copied!" : "Copy"}
        </span>
      </button>
    </div>
  );
}
