import { banglaFont } from "@/lib/fonts";

// Bangla wrapper: sets lang="bn" and the Bengali-capable font for this subtree only.
export default function BanglaBlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="bn" className={`${banglaFont.variable} font-[family-name:var(--font-bangla),var(--font-body)]`}>
      {children}
    </div>
  );
}
