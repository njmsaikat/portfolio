import type { Metadata } from "next";
import { ThemedImage } from "@/components/ui/ThemedImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { productProjects } from "@/data/projects";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productProjects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

function metaFor(name: string, description: string) {
  const title = `${name}: a free product by Saikat Roy`;
  const trimmed = description.length > 157 ? `${description.slice(0, 156).trimEnd()}…` : description;
  return { title, description: trimmed };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productProjects.find((p) => p.slug === slug);
  if (!product) return {};
  const { title, description } = metaFor(product.name, product.description);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/projects/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = productProjects.find((p) => p.slug === slug);
  if (!product) notFound();
  const others = productProjects.filter((p) => p.slug !== slug);
  const isExtension = product.platform === "Chrome";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Projects", url: `${site.url}/portfolio-page` },
          { name: product.name, url: `${site.url}/projects/${slug}` },
        ]}
      />
      <SoftwareApplicationJsonLd
        name={product.name}
        description={product.description}
        url={product.liveUrl}
        pageUrl={`${site.url}/projects/${slug}`}
        operatingSystem={product.platform ?? "Web"}
        applicationCategory={
          isExtension ? "BrowserApplication" : product.platform === "Linux" ? "UtilitiesApplication" : "WebApplication"
        }
      />

      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div aria-hidden className="grid-bg mask-fade absolute inset-0" />
        <div aria-hidden className="hero-glow absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-28 sm:pb-24 sm:pt-32 lg:grid-cols-2 lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)]">
              <Link href="/portfolio-page" className="hover:text-[var(--color-accent)]">
                Projects
              </Link>{" "}
              / <span className="text-[var(--color-text)]">{product.name}</span>
            </nav>
            <h1 className="mt-8 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-6 max-w-xl text-lg text-[var(--color-text-muted)]">{product.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={product.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit site
              </ButtonLink>
              {product.repoUrl && (
                <ButtonLink href={product.repoUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
                  Source on GitHub
                </ButtonLink>
              )}
            </div>
          </div>
          <div className="surface-panel relative aspect-[8/5] overflow-hidden rounded-xl">
            <ThemedImage
              src={product.image}
              darkSrc={product.imageDark}
              alt={`${product.name} screenshot`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              eager
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Overview</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">What it is</h2>
          <div className="mt-6 space-y-4 text-[var(--color-text-muted)]">
            {product.overview.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Features</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">What it does</h2>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-[var(--color-text-muted)]">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <h3 className="mt-10 font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
            Built with
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {product.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 font-[family-name:var(--font-technical)] text-xs text-[var(--color-accent)]"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
            More products by Saikat Roy
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="text-sm font-medium text-[var(--color-accent)] hover:underline">
                  {p.name} &rarr;
                </Link>
              </li>
            ))}
          </ul>
          <div className="surface-panel mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Want something built?</h2>
              <p className="mt-1 text-[var(--color-text-muted)]">Tell me what you&apos;re building and I&apos;ll get back to you.</p>
            </div>
            <ButtonLink href="/#contact">Start a conversation</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
