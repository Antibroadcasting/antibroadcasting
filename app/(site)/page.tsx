import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <section className="flex flex-col flex-1 items-center justify-center">
      <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-display font-black text-text-primary uppercase text-balance text-center">
        {siteConfig.company.name}
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-text-primary uppercase text-balance text-center">
        {siteConfig.company.tagline}
      </p>
      <div className="flex flex-row flex-wrap gap-3 mt-8">
        <Button>Get a Quote</Button>
        <Button variant="outline">See Our Work</Button>
      </div>
    </section>
  );
}
