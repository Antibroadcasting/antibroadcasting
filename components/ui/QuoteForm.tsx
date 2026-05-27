"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";

type FormState = "idle" | "loading" | "success" | "error";

type QuoteFormProps = {
  garmentOptions: string[];
  timelineOptions: string[];
  minimumOrder: number;
  maxColors: number;
  responseTime: string;
  email: string;
  emailHref: string;
};

export function QuoteForm({
  garmentOptions,
  timelineOptions,
  minimumOrder,
  maxColors,
  responseTime,
  email,
  emailHref,
}: QuoteFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const statusRef = useRef<HTMLSpanElement>(null);

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    if (!data.get("name")) errs.name = "Name is required.";
    if (!data.get("email")) {
      errs.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get("email") as string)
    ) {
      errs.email = "Please enter a valid email address.";
    }
    if (!data.get("quantity")) errs.quantity = "Quantity is required.";
    if (!data.get("message")) errs.message = "Please describe your project.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Move focus to the first invalid field so keyboard/AT users land there
      const firstKey = Object.keys(errs)[0];
      const firstInput = form.querySelector<HTMLElement>(
        `[name="${firstKey}"]`,
      );
      setTimeout(() => firstInput?.focus(), 0);
      return;
    }

    setErrors({});
    setState("loading");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          quantity: data.get("quantity"),
          colors: data.get("colors"),
          garment: data.get("garment"),
          timeline: data.get("timeline"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Send failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Polite live region — announces "Sending…" and result states to screen readers */}
      <span
        ref={statusRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {state === "loading" ? "Sending your request…" : ""}
      </span>

      <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
        Fields marked{" "}
        <span aria-hidden="true" className="text-text-accent">
          *
        </span>{" "}
        are required
      </p>
      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          name="name"
          label="Name"
          placeholder="Your name"
          autoComplete="name"
          required
          error={errors.name}
        />
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="your@email.com"
          autoComplete="email"
          required
          error={errors.email}
        />
      </div>

      {/* Quantity + Colors */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Input
            name="quantity"
            type="number"
            label="Estimated Quantity"
            placeholder="e.g. 100"
            min={1}
            required
            error={errors.quantity}
          />
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
            {minimumOrder} piece minimum
          </p>
        </div>
        <div>
          <Input
            name="colors"
            type="number"
            label="Number of Colors"
            placeholder="e.g. 2"
            min={1}
            max={maxColors}
          />
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
            Up to {maxColors} colors
          </p>
        </div>
      </div>

      {/* Garment + Timeline */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Select
          name="garment"
          label="Garment Type"
          placeholder="Select a garment…"
          options={garmentOptions.map((opt) => ({ value: opt, label: opt }))}
        />
        <Select
          name="timeline"
          label="Timeline"
          placeholder="Select a timeline…"
          options={timelineOptions.map((opt) => ({ value: opt, label: opt }))}
        />
      </div>

      {/* Project description */}
      <Textarea
        name="message"
        label="Tell us about your project"
        placeholder="What are you printing? Any art ready? Anything else we should know?"
        rows={5}
        required
        error={errors.message}
      />

      {/* File Upload */}
      <FileUpload
        label="Artwork Files (Optional)"
        accept=".ai,.psd,.pdf,.png,.jpg,.jpeg,.svg"
        maxSize={20 * 1024 * 1024}
        multiple
        maxFiles={5}
      />

      {/* Submit */}
      <div>
        <Button
          type="submit"
          variant="primary"
          disabled={state === "loading"}
          aria-busy={state === "loading"}
        >
          {state === "loading" ? "Sending…" : "Send Quote Request"}
        </Button>
      </div>

      {/* Feedback */}
      {state === "success" && (
        <div
          role="alert"
          className="border-l-4 border-gold px-5 py-4 bg-gold/5"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-text-accent mb-1">
            Request Received
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            We&apos;ll review your request and get back to you within{" "}
            {responseTime}.
          </p>
        </div>
      )}
      {state === "error" && (
        <div role="alert" className="border-l-4 border-text-error px-5 py-4">
          <p className="font-mono text-xs uppercase tracking-widest text-text-error mb-1">
            Something Went Wrong
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Try emailing us directly at{" "}
            <a
              href={emailHref}
              className="text-text-accent hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {email}
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}
