import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { productProjects } from "@/data/projects";

export const dynamic = "force-static";
export const alt = "Product by Saikat Roy";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return productProjects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productProjects.find((p) => p.slug === slug);
  return renderOgImage({
    eyebrow: "Product",
    title: product?.name ?? "Product",
  });
}
