import { renderOgImage, ogContentType, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Bangla blog by Saikat Roy";
export const size = ogSize;
export const contentType = ogContentType;

// The shared OG renderer has no Bengali font, so the card text stays in English.
export default function Image() {
  return renderOgImage({ eyebrow: "Blog · Bangla", title: "Notes from the backend, in Bangla: Django, PostgreSQL and Docker" });
}
