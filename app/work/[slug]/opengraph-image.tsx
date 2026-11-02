import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { caseStudies } from "@/data/caseStudies";

export const dynamic = "force-static";
export const alt = "Case study by Saikat Roy";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  return renderOgImage({
    eyebrow: `Case study · ${study?.company ?? ""}`,
    title: study?.title ?? "Case study",
  });
}
