import { Inter, JetBrains_Mono, Noto_Sans_Bengali } from "next/font/google";

export const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const technicalFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-technical",
  display: "swap",
});

// Bangla pages only (/bn/*): applied on the content wrapper, not globally.
export const banglaFont = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
});
