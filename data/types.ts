export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "stackoverflow" | "fiverr" | "upwork" | "email" | "phone";
}

export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  start: string;
  end: string;
  description: string;
  caseStudy?: string; // internal link, e.g. /work/your-campus
}

export interface EducationEntry {
  degree: string;
  institution: string;
  institutionUrl: string;
  start: string;
  end: string;
  note: string;
  achievements: string[];
  publications: string[];
}

export interface Certification {
  title: string;
  issuer?: string;
  year?: string;
  credentialId?: string;
  verifyUrl?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface GithubProject {
  type: "github";
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  featured?: boolean;
}

export interface ClientProject {
  type: "client";
  name: string;
  description: string;
  category: "frontend" | "wordpress" | "shopify";
  image: string;
  liveUrl?: string;
  featured?: boolean;
}

// Saikat's own live products (side projects), linked by live URL only.
export interface ProductProject {
  type: "product";
  name: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl: string;
  featured?: boolean;
}

export type Project = GithubProject | ClientProject | ProductProject;

export interface ServicePage {
  slug: string; // URL: /services/<slug> — never rename once published
  metaTitle: string; // full <title>, ~60 chars (no " | Saikat Roy" suffix added)
  metaDescription: string; // ~155 chars
  headline: string; // H1
  intro: string[];
  deliverables: { title: string; description: string }[];
  stack: string[];
  relatedProjects: string[]; // names from data/projects.ts
  relatedPosts?: string[]; // slugs from content/blog
  faqs: { question: string; answer: string }[];
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  page?: ServicePage;
}

export interface FocusArea {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  size?: "large" | "wide";
}

export interface CaseStudy {
  slug: string; // URL: /work/<slug> — never rename once published
  title: string;
  metaTitle: string; // ~60 chars, used as-is
  metaDescription: string;
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  summary: string; // one line for cards
  intro: string[];
  metrics: { value: string; label: string }[];
  builtTitle: string;
  built: { name: string; description: string; status?: string }[];
  // High level only — never internal design, infrastructure or security detail.
  architecture: string;
  architectureTitle?: string; // defaults to "How it's built"
  roleDetail: string;
  stack: string[];
  press: { outlet: string; title: string; url: string; date: string }[];
  closing?: { title: string; text: string };
  // Verbatim client reviews (from the screenshots in public/images/testimonials).
  quotes?: { text: string; source: string; rating: number }[];
  projects?: string[]; // names from data/projects.ts to showcase
  cta: { href: string; label: string }; // secondary button in the closing CTA
}

export interface Testimonial {
  platform: "Fiverr" | "Upwork";
  image: string;
  alt: string;
}
