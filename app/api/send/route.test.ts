import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

const { POST } = await import("./route");

function makeRequest(body: unknown, ip: string) {
  return new NextRequest("http://localhost/api/send", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Test User",
  email: "test@example.com",
  message: "Hi, please quote this job.",
  quantity: 50,
};

afterEach(() => {
  sendMock.mockReset();
});

describe("POST /api/send", () => {
  it("sends the email and returns 200 for a valid payload", async () => {
    sendMock.mockResolvedValueOnce({ data: { id: "abc" }, error: null });

    const res = await POST(makeRequest(validPayload, "1.1.1.1"));

    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("returns 500 with the provider error when Resend fails", async () => {
    sendMock.mockResolvedValueOnce({
      data: null,
      error: { message: "send failed" },
    });

    const res = await POST(makeRequest(validPayload, "2.2.2.2"));
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.error).toEqual({ message: "send failed" });
  });

  it("returns 400 for a missing required field", async () => {
    const res = await POST(
      makeRequest({ ...validPayload, name: "" }, "3.3.3.3"),
    );

    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate limits after 5 requests from the same IP", async () => {
    sendMock.mockResolvedValue({ data: { id: "abc" }, error: null });
    const ip = "4.4.4.4";

    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(validPayload, ip));
      expect(res.status).toBe(200);
    }

    const res = await POST(makeRequest(validPayload, ip));
    expect(res.status).toBe(429);
  });
});
