import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { site } from "@/data/site";

// Shared renderer for build-time Open Graph images (app/opengraph-image.tsx
// and per-post overrides). Keeps every social card on-brand.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const photo = await readFile(path.join(process.cwd(), "public", profile.photoSquare));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const titleSize = title.length > 70 ? 52 : title.length > 40 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#070a09",
          color: "#edf2ef",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(700px circle at 85% 15%, rgba(45,212,191,0.22), transparent 70%), radial-gradient(600px circle at 0% 100%, rgba(251,191,36,0.10), transparent 70%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", fontSize: 24, color: "#34d399", letterSpacing: 2, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#8f9a94" }}>
            <div style={{ display: "flex", width: 48, height: 6, borderRadius: 3, background: "linear-gradient(90deg,#34d399,#2dd4bf,#fbbf24)" }} />
            {profile.name} · {site.url.replace("https://", "")}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              padding: 4,
              borderRadius: 40,
              background: "linear-gradient(135deg,#34d399,#2dd4bf,#fbbf24)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori into a PNG, not the DOM */}
            <img src={photoSrc} width={340} height={340} alt="" style={{ borderRadius: 36, objectFit: "cover" }} />
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
