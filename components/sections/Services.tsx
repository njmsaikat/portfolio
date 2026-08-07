import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="How I can help"
      description="From backend architecture to deployed infrastructure."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="h-full">
            <div
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white"
              style={{ backgroundImage: "var(--gradient-accent)" }}
            >
              <ServiceIcon icon={service.icon} />
            </div>
            <h3 className="mt-4 text-base font-semibold">{service.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{service.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
