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

export type Project = GithubProject | ClientProject;

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

export interface Testimonial {
  platform: "Fiverr" | "Upwork";
  image: string;
  alt: string;
}
