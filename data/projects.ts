import { Project } from "./types";

// Manual snapshot of Saikat's live products, public GitHub repositories and
// real client work (repos captured 2026-08-07, products added 2026-11).
// Update by hand when new work should be featured — this is not a live
// GitHub API feed. `featured: true` shows a project on the home page.
export const projects: Project[] = [
  {
    type: "product",
    name: "HisabBD",
    description:
      "Free English & Bangla calculators for everyday life in Bangladesh, covering loans, VAT, savings, exam GPA, land units and more. Everything runs in the browser, so nothing you type leaves your device.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vitest", "Playwright"],
    image: "/images/projects/hisabbd.jpg",
    liveUrl: "https://bd-hisab.vercel.app",
    featured: true,
  },
  {
    type: "product",
    name: "Hottogol",
    description:
      "Short, funny simulators and games about everyday life in Bangladesh, from a Dhaka CNG ride to marbles. Bilingual, no sign-up, and results you can share with friends.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Motion"],
    image: "/images/projects/hottogol.jpg",
    liveUrl: "https://hottogol.vercel.app",
    featured: true,
  },
  {
    type: "product",
    name: "Bangladesh Healthcare Search",
    description:
      "Search 36,328 DGDA-registered medicines and thousands of hospitals, clinics and pharmacies across Bangladesh, built from open-data pipelines.",
    stack: ["Next.js", "TypeScript", "Node.js data pipelines"],
    image: "/images/projects/bd-health-search.jpg",
    liveUrl: "https://bdhealthsearch.vercel.app",
    featured: true,
  },
  {
    type: "product",
    name: "Pujo Guide",
    description:
      "A free bilingual guide to Durga Puja and Bengali festivals, with a pandal map, festival dates in Kolkata and Dhaka time, and a live crowd board. Every date is sourced.",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Leaflet"],
    image: "/images/projects/pujo-guide.jpg",
    liveUrl: "https://pujoguide.vercel.app",
    featured: true,
  },
  {
    type: "github",
    name: "django-api-cookiecutter",
    description:
      "A production-ready Django REST API template with role-based JWT auth, Docker for dev/test/prod, and optional Redis, Celery, S3 and Sentry.",
    url: "https://github.com/njmsaikat/django-api-cookiecutter",
    language: "Python",
    stars: 0,
  },
  {
    type: "github",
    name: "portfolio",
    description:
      "This portfolio site — rebuilt with Next.js, TypeScript, and Tailwind CSS, statically exported and deployed on Netlify.",
    url: "https://github.com/njmsaikat/portfolio",
    language: "TypeScript",
    stars: 17,
  },
  {
    type: "github",
    name: "django-postgres-setup-docker-compose",
    description:
      "A reusable Django + PostgreSQL starter wired up with Docker Compose for fast local backend bootstrapping.",
    url: "https://github.com/njmsaikat/django-postgres-setup-docker-compose",
    language: "Python",
    stars: 0,
  },
  {
    type: "github",
    name: "weather-live",
    description: "A live city weather lookup app built with vanilla JavaScript.",
    url: "https://github.com/njmsaikat/weather-live",
    language: "JavaScript",
    stars: 0,
  },
  {
    type: "github",
    name: "clock",
    description: "An analog and digital clock implementation in HTML, CSS, and JavaScript.",
    url: "https://github.com/njmsaikat/clock",
    language: "HTML",
    stars: 8,
  },
  {
    type: "github",
    name: "kafka-local",
    description: "A local Apache Kafka environment running in Docker, for testing event-driven pipelines.",
    url: "https://github.com/njmsaikat/kafka-local",
    language: "Python",
    stars: 1,
  },
  {
    type: "github",
    name: "rabbitmq-local",
    description: "A local RabbitMQ setup in Docker for message-queue experimentation.",
    url: "https://github.com/njmsaikat/rabbitmq-local",
    language: "JavaScript",
    stars: 1,
  },
  {
    type: "github",
    name: "test-ghcr",
    description: "A GitHub Actions workflow that builds and publishes container images to the GitHub Container Registry.",
    url: "https://github.com/njmsaikat/test-ghcr",
    language: "Python",
    stars: 0,
  },
  {
    type: "github",
    name: "problem-solving",
    description: "Competitive programming solutions across multiple online judges.",
    url: "https://github.com/njmsaikat/problem-solving",
    language: "Python",
    stars: 0,
  },
  {
    type: "github",
    name: "freecodecamp-sql",
    description: "Solutions to freeCodeCamp's relational database (SQL) curriculum.",
    url: "https://github.com/njmsaikat/freecodecamp-sql",
    language: "Shell",
    stars: 1,
  },
  // Client work is anonymized (Saikat's call, 2026-11): generic titles, no
  // client names or live links anywhere on the site, including file names.
  {
    type: "client",
    name: "Women's fashion store",
    description: "Shopify storefront development and customization for a client.",
    category: "shopify",
    image: "/images/projects/shopify-fashion.png",
  },
  {
    type: "client",
    name: "Skincare store",
    description: "Shopify storefront development and customization for a client.",
    category: "shopify",
    image: "/images/projects/shopify-skincare.png",
  },
  {
    type: "client",
    name: "Health supplements store",
    description: "Shopify storefront development and customization for a client.",
    category: "shopify",
    image: "/images/projects/shopify-supplements.png",
  },
  {
    type: "client",
    name: "Farm & garden supply website",
    description: "WordPress theme customization and site build for a client.",
    category: "wordpress",
    image: "/images/projects/wordpress-farm-garden.png",
  },
  {
    type: "client",
    name: "Mattress & sleep products store",
    description: "WordPress theme customization and site build for a client.",
    category: "wordpress",
    image: "/images/projects/wordpress-sleep-store.png",
  },
  {
    type: "client",
    name: "Personal care brand website",
    description: "WordPress theme customization and site build for a client.",
    category: "wordpress",
    image: "/images/projects/wordpress-personal-care.png",
  },
  {
    type: "client",
    name: "Mattress brand storefront",
    description: "Custom front-end site design and build for a client.",
    category: "frontend",
    image: "/images/projects/frontend-mattress.png",
  },
  {
    type: "client",
    name: "Custom apparel printing site",
    description: "Custom front-end site design and build for a client.",
    category: "frontend",
    image: "/images/projects/frontend-apparel.png",
  },
  {
    type: "client",
    name: "Book launch website",
    description: "Custom front-end site design and build for a client.",
    category: "frontend",
    image: "/images/projects/frontend-book.png",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
