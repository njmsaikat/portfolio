import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { servicePages } from "@/data/services";

export const dynamic = "force-static";
export const alt = "Service offered by Saikat Roy";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicePages.find((s) => s.page.slug === slug);
  return renderOgImage({
    eyebrow: "Services · Saikat Roy",
    title: service ? service.page.headline : "Services",
  });
}
