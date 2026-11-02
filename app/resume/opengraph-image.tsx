import { renderOgImage, ogContentType, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Résumé of Saikat Roy, Software Engineer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Résumé · Saikat Roy", title: "Django backends, DevOps and commerce platforms since 2020" });
}
