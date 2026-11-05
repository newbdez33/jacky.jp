const BADGE_URL = "https://token-beats-api.jacky-1a4.workers.dev/v1/badge/jacky@gcu.co.jp.svg";

type RequestContext = {
  request: Request;
  waitUntil: (promise: Promise<unknown>) => void;
};

function unavailable(reason: string): Response {
  return new Response(null, {
    status: 503,
    headers: { "Cache-Control": "no-store", "X-Badge-Error": reason },
  });
}

export async function onRequest(context: RequestContext): Promise<Response> {
  const { request } = context;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  }

  // Use one cache entry per site, without visitor headers or query parameters.
  const key = new Request(new URL("/api/token-usage", request.url));
  const cache = await caches.open("token-usage-badge-v1");
  let response = await cache.match(key);

  if (!response) {
    try {
      const upstream = await fetch(BADGE_URL, {
        headers: { Accept: "image/svg+xml" },
        signal: AbortSignal.timeout(5_000),
      });
      if (!upstream.ok) return unavailable(`upstream-${upstream.status}`);
      if (!upstream.headers.get("Content-Type")?.startsWith("image/svg+xml")) return unavailable("invalid-content-type");

      const svg = await upstream.text();
      if (svg.length > 65_536 || !/^\s*(?:<\?xml[^>]*>\s*)?<svg[\s>]/.test(svg) || !/<\/svg>\s*$/.test(svg)) {
        return unavailable("invalid-svg");
      }

      response = new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": "public, max-age=300",
          "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
          "X-Content-Type-Options": "nosniff",
        },
      });
      context.waitUntil(cache.put(key, response.clone()).catch((error) => {
        console.error("Failed to cache token usage image", error);
      }));
    } catch (error) {
      console.error("Failed to fetch token usage image", error);
      return unavailable("upstream-unavailable");
    }
  }

  return request.method === "HEAD"
    ? new Response(null, { status: response.status, headers: response.headers })
    : response;
}
