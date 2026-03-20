import { buildSitemapXml } from "$lib/discoverability";

export function GET() {
  return new Response(buildSitemapXml(), {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
