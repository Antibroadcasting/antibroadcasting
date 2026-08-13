import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { siteConfig } from "@/lib/site-config";
import { getPage, getPages } from "@/lib/get-pages";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { IndexLabel } from "@/components/ui/IndexLabel";
import { Stat } from "@/components/ui/Stat";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { StripeOverlay } from "@/components/ui/StripeOverlay";

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page || !page.published) return {};

  return {
    title: page.title,
    description: page.metaDescription || undefined,
    alternates: { canonical: `${siteConfig.site.url}/updates/${slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDescription || undefined,
      url: `${siteConfig.site.url}/updates/${slug}`,
      images: page.coverImage ? [{ url: page.coverImage }] : undefined,
    },
  };
}

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page || !page.published) notFound();

  const content = await page.content();

  return (
    <div className="w-full max-w-300 xl:max-w-360 2xl:max-w-400 mx-auto">
      <section className="pt-10 pb-20">
        <PageBreadcrumb page={page.title} parent="Updates" />

        <h1 className="font-display font-black uppercase leading-[0.85] text-[clamp(3rem,8vw,6rem)] mb-10">
          {page.title}
        </h1>

        {page.coverImage && (
          <div className="relative w-full aspect-video mb-10 overflow-hidden border border-foreground/10">
            <Image
              src={page.coverImage}
              alt={page.coverImageAlt || ""}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
              priority
            />
            <StripeOverlay opacity={0.08} />
            <CornerBrackets />
          </div>
        )}

        <div className="max-w-[70ch]">
          <DocumentRenderer
            document={content}
            renderers={{
              block: {
                paragraph: ({ children }) => (
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {children}
                  </p>
                ),
                heading: ({ level, children }) => {
                  const Tag = `h${level}` as "h2" | "h3";
                  return (
                    <Tag className="font-display font-black uppercase text-text-primary mt-10 mb-4">
                      {children}
                    </Tag>
                  );
                },
                list: ({ type, children }) => {
                  const Tag = type === "ordered" ? "ol" : "ul";
                  return (
                    <Tag className="list-disc list-inside text-text-secondary leading-relaxed mb-6 flex flex-col gap-2">
                      {children}
                    </Tag>
                  );
                },
              },
              inline: {
                link: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-text-accent underline hover:no-underline"
                  >
                    {children}
                  </a>
                ),
                bold: ({ children }) => (
                  <strong className="font-bold">{children}</strong>
                ),
                italic: ({ children }) => <em>{children}</em>,
              },
            }}
            componentBlocks={{
              sectionBreak: ({ label }) => (
                <IndexLabel className="my-10">{label}</IndexLabel>
              ),
              statRow: ({ stat1, stat2, stat3 }) => {
                const stats = [stat1, stat2, stat3].filter(
                  (s) => s.value || s.label,
                );
                if (stats.length === 0) return null;
                return (
                  <div className="flex flex-wrap gap-x-10 gap-y-6 my-10">
                    {stats.map((s, i) => (
                      <Stat key={i} value={s.value} label={s.label} />
                    ))}
                  </div>
                );
              },
              framedPhoto: ({ image, alt, catalogLabel }) => {
                if (!image) return null;
                return (
                  <div className="relative w-full aspect-4/3 overflow-hidden border border-foreground/10 my-10">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      sizes="(min-width: 1024px) 700px, 100vw"
                      className="object-cover"
                    />
                    <StripeOverlay opacity={0.08} />
                    <CornerBrackets />
                    {catalogLabel && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                        <span className="font-mono text-3xs uppercase tracking-widest text-paper/60">
                          {catalogLabel}
                        </span>
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        </div>
      </section>
    </div>
  );
}
