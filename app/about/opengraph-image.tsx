import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";
export const alt = "About Saikat Roy";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    eyebrow: "About",
    title: `${profile.name}: ${profile.jobTitle} in Dhaka`,
  });
}
