import { Service } from "./types";

// Services with a `page` get their own URL at /services/<slug>. Like the rest of
// data/, every claim here must be backed by experience.ts, projects.ts or skills.ts.
const worldwide =
  "Yes. I've worked with clients worldwide through Upwork since 2021. I'm based in Dhaka, Bangladesh (GMT+6).";
const getStarted =
  "Send a short description of the project through the contact form or by email. I'll reply with any questions and a suggested next step.";

export const services: Service[] = [
  {
    title: "Backend & API Development",
    description:
      "Django and Django REST Framework backends with clean, well-documented REST APIs designed to be easy to extend and maintain.",
    icon: "server",
    page: {
      slug: "django-rest-api-development",
      metaTitle: "Django & REST API Developer for Hire | Saikat Roy",
      metaDescription:
        "Django and Django REST Framework backends built for production: clean REST APIs, PostgreSQL data models and Docker deployments. Dhaka-based, working worldwide.",
      headline: "Django & REST API development",
      intro: [
        "I build Django and Django REST Framework backends for products that have to keep working: the APIs that apps, dashboards and machines talk to, backed by PostgreSQL and deployed in containers.",
        "Since 2022 I've been on the core team at YOUR Campus, whose in-house platform runs smart laundry, vending and e-commerce services for university students in Bangladesh. Before that I worked on backend operations for SnacKeeper's smart vending network. That's the context I bring: systems where the backend being down means a real customer doesn't get served.",
      ],
      deliverables: [
        {
          title: "REST API design & build",
          description:
            "Endpoints, serializers, authentication and permissions with Django REST Framework, designed as a stable contract for web, mobile and device clients.",
        },
        {
          title: "PostgreSQL data modelling",
          description:
            "Schemas and migrations that match how the business actually works, with PostgreSQL as the source of truth.",
        },
        {
          title: "Containerised from day one",
          description:
            "Docker and Docker Compose setups so every environment, from a laptop to production, runs the same stack.",
        },
        {
          title: "Extending existing projects",
          description:
            "Taking over or growing an existing Django codebase: reading it first, fixing what's fragile, and adding features without a rewrite.",
        },
      ],
      stack: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Redis", "Docker", "Nginx"],
      relatedProjects: ["django-postgres-setup-docker-compose", "kafka-local", "rabbitmq-local"],
      relatedPosts: ["django-postgres-docker-compose"],
      faqs: [
        {
          question: "Can you work on an existing Django project?",
          answer:
            "Yes. I start by reading the code and the deployment setup, then agree on priorities with you before changing anything.",
        },
        {
          question: "Do you also build the frontend?",
          answer:
            "When the project needs it, yes. I pair Django backends with React or Next.js frontends. This site is built with Next.js and TypeScript.",
        },
        { question: "Do you work with clients outside Bangladesh?", answer: worldwide },
        { question: "How do we get started?", answer: getStarted },
      ],
    },
  },
  {
    title: "Full-Stack Web Development",
    description:
      "End-to-end applications pairing a Django/DRF backend with a React or Next.js frontend, from data model to deployed UI.",
    icon: "layers",
  },
  {
    title: "Docker, DevOps & Cloud",
    description:
      "Containerized applications on AWS and DigitalOcean: Docker, Nginx, Linux servers and automated build and release pipelines.",
    icon: "box",
    page: {
      slug: "docker-devops-deployment",
      metaTitle: "Docker, DevOps & Cloud Deployment Services | Saikat Roy",
      metaDescription:
        "Dockerised deployments, Nginx, Linux servers and CI/CD on AWS and DigitalOcean, from an engineer who worked on keeping a smart vending network running 24/7.",
      headline: "Docker, DevOps & cloud deployment",
      intro: [
        "A backend is only as good as the way it's deployed. I containerise applications with Docker, run them behind Nginx on Linux servers, and automate builds and releases so shipping a change is routine rather than risky.",
        "At Germania Holdings I was part of the technical team behind SnacKeeper, a smart vending service in Bangladesh, responsible for backend operations, server management and DevOps, with the goal of keeping the whole system up and running 24/7. At YOUR Campus, deployment is part of my core-team remit alongside architecture and execution.",
      ],
      deliverables: [
        {
          title: "Containerisation",
          description:
            "Dockerfiles and Docker Compose setups for apps, databases and message brokers, so local, staging and production environments match.",
        },
        {
          title: "Servers on AWS or DigitalOcean",
          description: "Linux servers set up with Nginx as a reverse proxy, sensible defaults and room to grow.",
        },
        {
          title: "CI/CD pipelines",
          description:
            "Automated pipelines that build and publish container images, for example GitHub Actions pushing to GitHub Container Registry.",
        },
        {
          title: "Day-to-day operations",
          description:
            "Server maintenance, updates and production troubleshooting: the operations work behind services that need to stay up.",
        },
      ],
      stack: ["Docker", "Docker Compose", "Nginx", "Linux", "AWS", "DigitalOcean", "GitHub Actions", "PostgreSQL"],
      relatedProjects: ["test-ghcr", "django-postgres-setup-docker-compose", "kafka-local", "rabbitmq-local"],
      relatedPosts: ["django-postgres-docker-compose"],
      faqs: [
        {
          question: "AWS or DigitalOcean: which should I use?",
          answer:
            "It depends on the workload. I've worked with both. DigitalOcean is often the simpler choice for a single application; AWS makes sense when you need its wider range of managed services. I'll recommend one once I understand what you're running.",
        },
        {
          question: "Can you containerise an existing application?",
          answer:
            "Yes. It usually starts with a Dockerfile and a Docker Compose file for local development, then the same images are used in production.",
        },
        {
          question: "Do you offer ongoing support?",
          answer:
            "Yes. I'm available for maintenance and support seven days a week, outside 12 PM–8 PM Bangladesh time (GMT+6).",
        },
        { question: "How do we get started?", answer: getStarted },
      ],
    },
  },
  {
    title: "Shopify Development",
    description:
      "Shopify storefronts for brands worldwide: theme customization, store builds and migrations, so the store looks like the brand and is easy to run.",
    icon: "shopping-bag",
    page: {
      slug: "shopify-development",
      metaTitle: "Shopify Developer for Hire | Saikat Roy",
      metaDescription:
        "Shopify storefront development and theme customization: store builds, redesigns and migrations, from a developer building on Shopify since 2020.",
      headline: "Shopify development",
      intro: [
        "I build and customise Shopify storefronts: theme changes, new store builds and migrations, so the store looks like the brand and is easy for your team to run day to day.",
        "I've worked on Shopify since 2020, first at Dokmi BD and then for clients worldwide through Upwork. Client stores I've worked on include Vivalvic, Silver Mirror and Fusion Organics.",
      ],
      deliverables: [
        {
          title: "Theme customisation",
          description:
            "Changes to your existing theme's layout, sections and styling, built to match your brand rather than the theme's defaults.",
        },
        {
          title: "New store builds",
          description: "Storefront development from the ground up, ready for your products, content and checkout.",
        },
        {
          title: "Migrations & redesigns",
          description: "Moving a store onto Shopify or onto a new design without losing products or content.",
        },
        {
          title: "Ongoing changes",
          description: "A developer on call for the steady stream of small updates every live store needs.",
        },
      ],
      stack: ["Shopify", "HTML5", "CSS3", "JavaScript"],
      relatedProjects: ["Vivalvic", "Silver Mirror", "Fusion Organics"],
      faqs: [
        {
          question: "Can you customise my existing theme?",
          answer:
            "Yes. Theme customization has been the core of my Shopify work since 2020, from small layout changes to substantial redesigns.",
        },
        {
          question: "Can you move my store to Shopify?",
          answer: "Yes. Site migrations have been part of my Shopify and WordPress work from the start.",
        },
        { question: "Do you work with clients outside Bangladesh?", answer: worldwide },
        { question: "How do we get started?", answer: getStarted },
      ],
    },
  },
  {
    title: "WordPress Development",
    description:
      "WordPress and WooCommerce sites: theme customization, plugins, migrations and full rebuilds when a site has outgrown its theme.",
    icon: "layout",
    page: {
      slug: "wordpress-development",
      metaTitle: "WordPress Developer for Hire | Saikat Roy",
      metaDescription:
        "WordPress development: theme customization, plugins, WooCommerce, migrations and full site rebuilds, from a developer working with WordPress since 2020.",
      headline: "WordPress development",
      intro: [
        "I build, fix and rebuild WordPress sites: theme customisation, plugin setup, WooCommerce stores, migrations, and full rebuilds when a site has outgrown its theme.",
        "WordPress is where my professional development work started, at Dokmi BD in 2020, and I've built WordPress sites for clients worldwide through Upwork since 2021. Client sites I've worked on include Mize Garden, Chiro Slumber and Duradry.",
      ],
      deliverables: [
        {
          title: "Theme customisation & redesign",
          description: "Making an existing theme fit your brand, or redesigning the site around a new one.",
        },
        {
          title: "Plugins & WooCommerce",
          description: "Choosing, configuring and implementing plugins, including WooCommerce for online stores.",
        },
        {
          title: "Migrations & rebuilds",
          description:
            "Moving sites between hosts or platforms, and complete rebuilds with Bootstrap and JavaScript when patching isn't worth it.",
        },
        {
          title: "Hosting & maintenance",
          description: "Setup and upkeep on cPanel-based hosting, plus the updates that keep a WordPress site healthy.",
        },
      ],
      stack: ["WordPress", "WooCommerce", "PHP", "MySQL", "JavaScript", "Bootstrap", "cPanel"],
      relatedProjects: ["Mize Garden", "Chiro Slumber", "Duradry"],
      faqs: [
        {
          question: "Can you fix or extend my existing WordPress site?",
          answer:
            "Yes. Theme customization, plugin work and fixing existing sites have been the core of my WordPress work since 2020.",
        },
        {
          question: "Do you build WooCommerce stores?",
          answer: "Yes. WooCommerce is part of my WordPress work for clients who want to sell online.",
        },
        { question: "Do you work with clients outside Bangladesh?", answer: worldwide },
        { question: "How do we get started?", answer: getStarted },
      ],
    },
  },
  {
    title: "Technical Consulting & Support",
    description:
      "Architecture review and ongoing support, available seven days a week outside 12 PM–8 PM (GMT+6, Bangladesh time).",
    icon: "life-buoy",
  },
];

export const servicePages = services.flatMap((s) => (s.page ? [{ ...s, page: s.page }] : []));
