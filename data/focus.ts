import { FocusArea } from "./types";

// The "What I build" bento on the home page. Every claim here is grounded in
// data/experience.ts or data/projects.ts — keep it that way when editing.
export const focusAreas: FocusArea[] = [
  {
    eyebrow: "YOUR Campus · 2022 – present",
    title: "Campus commerce platform",
    description:
      "Core team member on the in-house software behind a campus platform for university students in Bangladesh: a smart laundry service, a vending machine service and an e-commerce service. Architecture, execution and deployment.",
    tags: ["Smart laundry", "Vending", "E-commerce"],
    href: "https://your-campus.com/",
    size: "large",
  },
  {
    eyebrow: "SnacKeeper · 2021 – 2022",
    title: "Smart vending operations",
    description:
      "Backend operations, server management and DevOps for SnacKeeper, a pioneering smart vending machine service in Bangladesh, keeping the whole system running 24/7.",
    tags: ["Backend ops", "DevOps", "24/7 uptime"],
    href: "https://ghl-bd.com/",
  },
  {
    eyebrow: "Freelance · 2021 – present",
    title: "Online stores",
    description:
      "Shopify storefronts and WordPress sites for clients worldwide: theme customization, plugins, migrations and full rebuilds.",
    tags: ["Shopify", "WordPress", "WooCommerce"],
    href: "/#portfolio",
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
