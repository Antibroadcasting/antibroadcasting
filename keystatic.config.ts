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
});
