import { renderOgImage, ogContentType, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Services by Saikat Roy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Services", title: "Django backends, DevOps, Shopify and WordPress" });
}
