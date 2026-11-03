import { profile } from "@/data/profile";
import { site, socialLinks } from "@/data/site";
import { skillGroups } from "@/data/skills";
import type { Post } from "@/lib/posts";

function JsonLdScript({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const personId = `${site.url}/#person`;

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  url: site.url,
  image: `${site.url}${profile.photoSquare}`,
  jobTitle: profile.jobTitle,
  description: profile.headline,
  email: `mailto:${profile.email}`,
  worksFor: {
    "@type": "Organization",
    name: profile.company,
    url: profile.companyUrl,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Institute of Science & Technology",
  },
  knowsAbout: skillGroups.flatMap((group) => group.skills),
  sameAs: socialLinks.map((link) => link.href),
};

export function SiteJsonLd() {
  return (
    <>
      <JsonLdScript data={{ "@context": "https://schema.org", ...personSchema }} />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          author: { "@id": personId },
        }}
      />
    </>
  );
}

export function ProfilePageJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: `${site.url}/resume`,
        mainEntity: personSchema,
      }}
    />
  );
}

export function AboutPageJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${site.url}/about#profilepage`,
        url: `${site.url}/about`,
        name: `About ${profile.name}`,
        mainEntity: personSchema,
      }}
    />
  );
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
  pageUrl,
  operatingSystem,
  applicationCategory = "WebApplication",
}: {
  name: string;
  description: string;
  url: string;
  pageUrl: string;
  operatingSystem: string;
  applicationCategory?: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name,
        description,
        url,
        mainEntityOfPage: pageUrl,
        applicationCategory,
        operatingSystem,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        author: { "@type": "Person", "@id": personId, name: profile.name, url: site.url },
      }}
    />
  );
}

export function BlogPostingJsonLd({ post }: { post: Post }) {
  const url = `${site.url}/blog/${post.slug}`;
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        url,
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
        keywords: post.tags.join(", "),
        author: { "@type": "Person", "@id": personId, name: profile.name, url: site.url },
      }}
    />
  );
}

export function ServiceJsonLd({ name, description, slug }: { name: string; description: string; slug: string }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        serviceType: name,
        description,
        url: `${site.url}/services/${slug}`,
        provider: { "@type": "Person", "@id": personId, name: profile.name, url: site.url },
        areaServed: "Worldwide",
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
