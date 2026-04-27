import Link from "next/link";
import { Metadata } from "next";
import { buttonVariants } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-text-default mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-text-default mb-4 text-text-primary">
        Page Not Found
      </h2>
      <p className="text-lg text-text-muted mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className={buttonVariants({ variant: "primary", size: "md" })}
      >
        Return Home
      </Link>
    </div>
  );
}
