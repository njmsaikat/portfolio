import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="How I can help"
      description="From backend architecture to deployed infrastructure."
      className="bg-[var(--color-bg-elevated)]"
    >
      <div className="reveal-items grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="flex h-full flex-col">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
              <ServiceIcon icon={service.icon} />
            </div>
            <h3 className="mt-4 text-base font-semibold">{service.title}</h3>
            <p className="mt-2 flex-1 text-sm text-[var(--color-text-muted)]">{service.description}</p>
            {service.page && (
              <Link
                href={`/services/${service.page.slug}`}
                className="mt-4 text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Learn more<span className="sr-only">: {service.page.headline}</span> &rarr;
              </Link>
            )}
          </Card>
        ))}
      </div>
      <div className="surface-panel mt-10 flex flex-col items-start justify-between gap-4 rounded-xl p-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold">Have a project in mind?</p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Tell me what you&apos;re building and I&apos;ll get back to you.
          </p>
        </div>
        <ButtonLink href="/#contact">Start a conversation</ButtonLink>
      </div>
    </Section>
  );
}
