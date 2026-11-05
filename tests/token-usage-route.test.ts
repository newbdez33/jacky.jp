/** @jest-environment node */

import { onRequest } from "@/functions/api/token-usage";

const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="294" height="62"><text>123 tokens</text></svg>';
const upstream = "https://token-beats-api.jacky-1a4.workers.dev/v1/badge/jacky@gcu.co.jp.svg";
const cacheMatch = jest.fn();
const cachePut = jest.fn();
const originalCaches = Object.getOwnPropertyDescriptor(globalThis, "caches");

async function requestBadge(method = "GET", query = "") {
  const pending: Promise<unknown>[] = [];
  const response = await onRequest({
    request: new Request(`https://jacky.jp/api/token-usage${query}`, {
      method,
      headers: { Cookie: "session=private" },
    }),
    waitUntil: (promise) => { pending.push(promise); },
  });
  await Promise.all(pending);
  return response;
}

describe("token usage image route", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    cacheMatch.mockReset().mockResolvedValue(undefined);
    cachePut.mockReset().mockResolvedValue(undefined);
    Object.defineProperty(globalThis, "caches", {
      configurable: true,
      value: { open: jest.fn().mockResolvedValue({ match: cacheMatch, put: cachePut }) },
    });
    jest.spyOn(globalThis, "fetch").mockResolvedValue(new Response(svg, {
      headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Set-Cookie": "upstream=private" },
    }));
  });

  afterEach(() => { jest.restoreAllMocks(); });

  afterAll(() => {
    if (originalCaches) Object.defineProperty(globalThis, "caches", originalCaches);
    else Reflect.deleteProperty(globalThis, "caches");
  });

  it("serves and caches a valid SVG without forwarding cookies or a caller-supplied URL", async () => {
    const response = await requestBadge("GET", "?url=https://example.com/private");

    expect(response.status).toBe(200);
    expect(await response.text()).toBe(svg);
    expect(response.headers.get("Content-Type")).toBe("image/svg+xml; charset=utf-8");
    expect(response.headers.get("Cache-Control")).toBe("public, max-age=300");
    expect(response.headers.get("Set-Cookie")).toBeNull();
    expect(fetch).toHaveBeenCalledWith(upstream, expect.objectContaining({
      headers: { Accept: "image/svg+xml" },
      signal: expect.any(AbortSignal),
    }));
    const [key, cached] = cachePut.mock.calls[0];
    expect(key.url).toBe("https://jacky.jp/api/token-usage");
    expect(await cached.text()).toBe(svg);
  });

  it("serves a cached badge when the upstream cannot be reached", async () => {
    cacheMatch.mockResolvedValue(new Response(svg, { headers: { "Content-Type": "image/svg+xml" } }));
    jest.mocked(fetch).mockRejectedValue(new Error("Upstream unavailable"));

    const response = await requestBadge();

    expect(response.status).toBe(200);
    expect(await response.text()).toBe(svg);
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([
    [503, "image/svg+xml", svg],
    [200, "text/html", "<html>Service unavailable</html>"],
    [200, "image/svg+xml", "<html>Service unavailable</html>"],
    [200, "image/svg+xml", "<svg>incomplete"],
  ])("does not cache an invalid upstream response (%i, %s)", async (status, contentType, body) => {
    jest.mocked(fetch).mockResolvedValue(new Response(body, { status, headers: { "Content-Type": contentType } }));

    const response = await requestBadge();

    expect(response.status).toBe(503);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(cachePut).not.toHaveBeenCalled();
  });

  it.each([new Error("Network unavailable"), new DOMException("Request timed out", "TimeoutError")])(
    "returns an uncached failure when the upstream request fails: %s",
    async (error) => {
      jest.mocked(fetch).mockRejectedValue(error);
      const response = await requestBadge();
      expect(response.status).toBe(503);
      expect(response.headers.get("Cache-Control")).toBe("no-store");
      expect(cachePut).not.toHaveBeenCalled();
    }
  );

  it("still serves the image if the cache write fails", async () => {
    cachePut.mockRejectedValue(new Error("Cache unavailable"));
    const response = await requestBadge();
    expect(response.status).toBe(200);
    expect(await response.text()).toBe(svg);
  });

  it.each([false, true])("supports HEAD without returning a body (cached: %s)", async (cached) => {
    if (cached) cacheMatch.mockResolvedValue(new Response(svg));
    const response = await requestBadge("HEAD");
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("");
  });

  it("rejects writes without contacting the upstream", async () => {
    const response = await requestBadge("POST");
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("GET, HEAD");
    expect(fetch).not.toHaveBeenCalled();
  });
});
