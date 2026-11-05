import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";
import { socialLinks } from "@/data/site";

const fiverr = socialLinks.find((s) => s.icon === "fiverr");
const upwork = socialLinks.find((s) => s.icon === "upwork");

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Reviews"
      title="Client feedback"
      description={`Screenshots of real client reviews from ${fiverr?.label} and ${upwork?.label}.`}
    >
      {/* Focusable so keyboard users can scroll it with the arrow keys. */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Client reviews"
        className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto rounded-lg px-6 pb-4 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        {testimonials.map((testimonial, i) => (
          <figure
            key={`${testimonial.platform}-${i}`}
            className="surface-panel w-[85%] flex-shrink-0 snap-center rounded-lg p-4 sm:w-[45%] lg:w-[30%]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
              <Image src={testimonial.image} alt={testimonial.alt} fill className="object-cover" />
            </div>
            <figcaption className="mt-3 text-center text-sm text-[var(--color-text-muted)]">
              Review from {testimonial.platform}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
