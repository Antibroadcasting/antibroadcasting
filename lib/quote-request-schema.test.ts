import { describe, expect, it } from "vitest";
import { quoteFormFieldsSchema } from "./quote-request-schema";

const validFields = {
  name: "Test User",
  email: "test@example.com",
  message: "Hi, please quote this job.",
  quantity: "50",
  colors: "",
  garment: "",
  timeline: "",
};

describe("quoteFormFieldsSchema", () => {
  it("accepts a fully valid submission", () => {
    const result = quoteFormFieldsSchema.safeParse(validFields);
    expect(result.success).toBe(true);
  });

  it("rejects a missing name with the expected message", () => {
    const result = quoteFormFieldsSchema.safeParse({ ...validFields, name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name is required.");
    }
  });

  it("rejects an invalid email format", () => {
    const result = quoteFormFieldsSchema.safeParse({ ...validFields, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Please enter a valid email address.");
    }
  });

  it("rejects a zero/empty quantity", () => {
    const result = quoteFormFieldsSchema.safeParse({ ...validFields, quantity: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Quantity is required.");
    }
  });

  it("rejects a message over the 5000-character cap", () => {
    const result = quoteFormFieldsSchema.safeParse({
      ...validFields,
      message: "a".repeat(5001),
    });
    expect(result.success).toBe(false);
  });

  it("allows colors/garment/timeline to be omitted", () => {
    const { name, email, message, quantity } = validFields;
    const result = quoteFormFieldsSchema.safeParse({ name, email, message, quantity });
    expect(result.success).toBe(true);
  });
});
