import { renderOgImage, ogContentType, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Blog by Saikat Roy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Blog", title: "Notes from the backend: Django, PostgreSQL and Docker" });
}
