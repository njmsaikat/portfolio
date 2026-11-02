import { FocusArea } from "./types";

// The "What I build" bento on the home page. Every claim here is grounded in
// data/experience.ts or data/projects.ts — keep it that way when editing.
export const focusAreas: FocusArea[] = [
  {
    eyebrow: "YOUR Campus · 2022 – present",
    title: "Smart-campus platform",
    description:
      "On the core backend team since day zero: smart laundry, smart vending, YOUR Mart and more, for 135,000+ students across 21 universities in Bangladesh.",
    tags: ["YOUR Laundry", "YOUR Shop", "YOUR Mart"],
    href: "/work/your-campus",
    size: "large",
  },
  {
    eyebrow: "SnacKeeper · 2021 – 2022",
    title: "Smart vending network",
    description:
      "Helped build SnacKeeper's 24/7 vending backend with bKash payments at Germania Holdings, then carried it into YOUR Campus.",
    tags: ["Vending", "bKash payments", "24/7"],
    href: "/work/snackeeper",
  },
  {
    eyebrow: "Freelance · 2021 – present",
    title: "Online stores",
    description:
      "Shopify storefronts and WordPress sites for clients worldwide: theme customization, plugins, migrations and full rebuilds.",
    tags: ["Shopify", "WordPress", "WooCommerce"],
    href: "/work/freelance",
  },
  {
    eyebrow: "Open source",
    title: "Backend tooling",
    description:
      "Reusable Docker setups for Django and PostgreSQL, local Kafka and RabbitMQ environments, and CI that publishes container images to GHCR.",
    tags: ["Docker", "Kafka", "RabbitMQ", "GitHub Actions"],
    href: "https://github.com/njmsaikat",
    size: "wide",
  },
];
