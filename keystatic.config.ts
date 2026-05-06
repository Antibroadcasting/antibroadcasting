import { config, collection, singleton, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    gallery: collection({
      label: "Gallery",
      slugField: "title",
      path: "content/gallery/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        client: fields.text({ label: "Client / Band / Artist" }),
        category: fields.text({
          label: "Category",
          description:
            "Suggested: band-merch · local-artist · event · business — or add your own.",
          defaultValue: "band-merch",
        }),
        image: fields.image({
          label: "Image",
          directory: "public/gallery",
          publicPath: "/gallery",
        }),
        featured: fields.checkbox({
          label: "Feature on homepage",
          defaultValue: false,
        }),
        description: fields.text({
          label: "Description",
          description: "Optional — brief context about the project.",
          multiline: true,
        }),
        colors: fields.number({ label: "Number of colors" }),
        year: fields.number({ label: "Year" }),
      },
    }),

    faq: collection({
      label: "FAQ",
      slugField: "question",
      path: "content/faq/*",
      format: { data: "json" },
      schema: {
        question: fields.slug({ name: { label: "Question" } }),
        answer: fields.text({ label: "Answer", multiline: true }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Pricing", value: "pricing" },
            { label: "Ordering", value: "ordering" },
            { label: "Art & Files", value: "art" },
            { label: "Turnaround", value: "turnaround" },
            { label: "Products & Inks", value: "products" },
            { label: "Payment", value: "payment" },
          ],
          defaultValue: "ordering",
        }),
        order: fields.number({ label: "Display order" }),
      },
    }),

    artRequirements: collection({
      label: "Art Requirements",
      slugField: "heading",
      path: "content/art-requirements/*",
      format: { data: "json" },
      schema: {
        heading: fields.slug({ name: { label: "Section heading" } }),
        items: fields.text({
          label: "Items",
          description: "One item per line — each becomes a bullet point.",
          multiline: true,
        }),
        order: fields.number({ label: "Display order" }),
      },
    }),

    promos: collection({
      label: "Promos",
      slugField: "title",
      path: "content/promos/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        active: fields.checkbox({
          label: "Active / visible on site",
          defaultValue: true,
        }),
        expiresAt: fields.date({ label: "Expiry date (optional)" }),
      },
    }),
  },

  singletons: {
    siteInfo: singleton({
      label: "Site Info",
      path: "content/site-info",
      format: { data: "json" },
      schema: {
        // ── Company ──────────────────────────────────────────────────
        companyName: fields.text({ label: "Company name" }),
        companyLegalName: fields.text({ label: "Legal name" }),
        companyNickname: fields.text({ label: "Short name / nickname" }),
        companyTagline: fields.text({ label: "Tagline" }),

        // ── Contact ──────────────────────────────────────────────────
        phone: fields.text({ label: "Phone (display)" }),
        phoneHref: fields.text({ label: "Phone href (e.g. tel:6125551234)" }),
        email: fields.text({ label: "Email address" }),
        addressStreet: fields.text({ label: "Street address" }),
        addressCity: fields.text({ label: "City" }),
        addressState: fields.text({ label: "State" }),
        addressZip: fields.text({ label: "ZIP code" }),

        // ── Social ───────────────────────────────────────────────────
        instagramUrl: fields.text({ label: "Instagram URL" }),
        instagramHandle: fields.text({ label: "Instagram handle" }),
        facebookUrl: fields.text({ label: "Facebook URL" }),
        facebookHandle: fields.text({ label: "Facebook handle" }),
        twitterUrl: fields.text({ label: "X / Twitter URL" }),
        twitterHandle: fields.text({ label: "X / Twitter handle" }),

        // ── Business rules ───────────────────────────────────────────
        minimumOrder: fields.number({ label: "Minimum order (pieces)" }),
        turnaroundDays: fields.text({
          label: "Standard turnaround",
          description: 'e.g. "7–10"',
        }),
        maxColors: fields.number({ label: "Maximum ink colors" }),
        responseTime: fields.text({
          label: "Quote response time",
          description: 'e.g. "1–2 business days"',
        }),

        // ── Quote form options (one per line) ─────────────────────────
        garmentOptions: fields.text({
          label: "Garment options",
          description: "One option per line.",
          multiline: true,
        }),
        timelineOptions: fields.text({
          label: "Timeline options",
          description: "One option per line.",
          multiline: true,
        }),
      },
    }),
  },
});
