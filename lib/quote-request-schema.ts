import { z } from "zod";

export const quoteFormFieldsSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(200),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(320),
  message: z
    .string()
    .trim()
    .min(1, "Please describe your project.")
    .max(5000),
  quantity: z.coerce.number().int().positive("Quantity is required."),
  colors: z.string().trim().max(200).nullish(),
  garment: z.string().trim().max(200).nullish(),
  timeline: z.string().trim().max(200).nullish(),
});
