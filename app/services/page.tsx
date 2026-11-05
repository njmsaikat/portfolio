import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/data/services";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Hire Saikat Roy for Django and REST API backends, Docker and cloud deployment, Shopify stores and WordPress sites. Based in Dhaka, working worldwide.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Saikat Roy",
    description: "Django and REST API backends, Docker and cloud deployment, Shopify stores and WordPress sites.",
    url: `${site.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Services", url: `${site.url}/services` },
        ]}
      />
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Services</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">How I can help</h1>
          <p className="mt-3 text-[var(--color-text-muted)]">
            From the backend that runs your business to the storefront your customers see. Pick the one closest to your
            project, or get in touch and we&apos;ll work out what you need.
          </p>
          <p className="mt-3 text-[var(--color-text-muted)]">
            I&apos;m a Senior Backend Engineer in Dhaka, Bangladesh, working with clients worldwide. The core of my work
            is Django and Django REST Framework backends on PostgreSQL, deployed with Docker and cloud hosting. I also
            build and customize Shopify and WordPress stores. Each service below has its own page with what you get,
            the stack I use, related work and answers to common questions, and the{" "}
            <Link href="/work/your-campus" className="text-[var(--color-accent)] underline underline-offset-2">
              case studies
            </Link>{" "}
            show the same skills applied to real commerce platforms.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const body = (
              <>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h2 className="mt-4 text-base font-semibold">{service.title}</h2>
                <p className="mt-2 flex-1 text-sm text-[var(--color-text-muted)]">{service.description}</p>
                {service.page && (
                  <span className="mt-4 text-sm font-medium text-[var(--color-accent)]">Learn more &rarr;</span>
                )}
              </>
            );
            return (
              <li key={service.title} className="flex">
                {service.page ? (
                  <Link
                    href={`/services/${service.page.slug}`}
                    className="surface-panel group flex w-full flex-col rounded-xl p-6 transition-colors hover:border-[var(--color-accent)]"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="surface-panel flex w-full flex-col rounded-xl p-6">{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="surface-panel mt-14 flex flex-col items-start justify-between gap-4 rounded-xl p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold">Not sure which fits?</p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Describe the problem and I&apos;ll tell you how I&apos;d approach it.
            </p>
          </div>
          <ButtonLink href="/#contact">Start a conversation</ButtonLink>
        </div>
      </section>
    </>
  );
}
