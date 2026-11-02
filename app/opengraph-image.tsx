import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";
export const alt =`${profile.name}: ${profile.headline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: `${profile.jobTitle} · ${profile.location}`, title: profile.headline });
}
