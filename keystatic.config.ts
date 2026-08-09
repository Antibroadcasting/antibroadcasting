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
        label: fields.text({
          label: "Eyebrow label (optional)",
          description:
            'Shown above the title, e.g. "Limited Time" (default) or "New" or "Ends Friday".',
        }),
        badgeImage: fields.image({
          label: "Eyebrow badge image (optional)",
          description:
            "Replaces the icon + label above the title. Leave blank to use the label instead.",
          directory: "public/promos",
          publicPath: "/promos",
        }),
        ctaLabel: fields.text({
          label: "CTA label (optional)",
          description: 'e.g. "Get a Quote" — leave blank to hide the button.',
        }),
        ctaHref: fields.text({
          label: "CTA link (optional)",
          description: 'e.g. "/contact" — must start with "/", or leave blank to hide the button.',
          validation: {
            pattern: {
              regex: /^$|^\//,
              message: 'Must start with "/" (e.g. "/contact"), or be left blank.',
            },
          },
        }),
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
        instagramUrl: fields.url({ label: "Instagram URL" }),
        instagramHandle: fields.text({ label: "Instagram handle" }),
        facebookUrl: fields.url({ label: "Facebook URL" }),
        facebookHandle: fields.text({ label: "Facebook handle" }),
        twitterUrl: fields.url({ label: "X / Twitter URL" }),
        twitterHandle: fields.text({ label: "X / Twitter handle" }),

        // ── Booking status ───────────────────────────────────────────
        nowBookingVisible: fields.checkbox({
          label: 'Show "Now Booking" badge on homepage',
          defaultValue: true,
        }),
        nowBookingLabel: fields.text({
          label: '"Now Booking" label text',
          description: 'e.g. "Summer \'26" or "Fall \'26 — Limited Spots"',
          defaultValue: "Summer '26",
        }),

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

        // ── SEO ──────────────────────────────────────────────────────
        metaTitle: fields.text({
          label: "Default page title",
          description: 'Used in <title> and Open Graph. e.g. "Antibroadcasting Inc. — Minneapolis Screen Printing"',
        }),
        metaDescription: fields.text({
          label: "Default meta description",
          description: 'Used in <meta name="description"> and Open Graph.',
          multiline: true,
        }),
        seoKeywords: fields.text({
          label: "SEO keywords",
          description: "One keyword or phrase per line.",
          multiline: true,
        }),

        // ── Email addresses ───────────────────────────────────────────
        emailFrom: fields.text({
          label: "Quote form — From address",
          description: 'The address emails are sent from. Must be verified in Resend. e.g. "quotes@antibroadcasting.com"',
          defaultValue: "Quote Request <quotes@antibroadcasting.com>",
        }),
        emailTo: fields.text({
          label: "Quote form — To address",
          description: "Where quote requests are delivered. Separate multiple addresses with commas.",
          defaultValue: "info@antibroadcasting.com",
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
