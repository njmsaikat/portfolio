import { renderOgImage, ogContentType, ogSize } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Projects by Saikat Roy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Portfolio", title: "Open-source repositories and client stores" });
}
