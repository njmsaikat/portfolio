import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { getLocalizedPost, getPostSlugs, hasPost } from "@/lib/posts";

export const dynamic = "force-static";
const EMPTY_SLUG = "_none";

export const alt = "Bangla blog post by Saikat Roy";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  const slugs = getPostSlugs("bn");
  // output: export rejects an empty list, so emit one placeholder route while there are no Bangla posts.
  return (slugs.length ? slugs : [EMPTY_SLUG]).map((slug) => ({ slug }));
}

// The shared OG renderer has no Bengali font, so the card uses the English
// original's title when there is one, otherwise the post's tags.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!hasPost(slug, "bn")) return renderOgImage({ eyebrow: "Blog · Bangla", title: "Notes from the backend, in Bangla" });
  const bnPost = await getLocalizedPost(slug, "bn");
  const title = hasPost(slug, "en") ? (await getLocalizedPost(slug, "en")).title : bnPost.tags.join(" · ");
  return renderOgImage({ eyebrow: `Blog · Bangla · ${bnPost.tags.join(" · ")}`, title });
}
