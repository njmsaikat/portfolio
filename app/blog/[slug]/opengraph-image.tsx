import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { getPost, getPostSlugs } from "@/lib/posts";

export const dynamic = "force-static";
export const alt ="Blog post by Saikat Roy";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return renderOgImage({ eyebrow: `Blog · ${post.tags.join(" · ")}`, title: post.title });
}
