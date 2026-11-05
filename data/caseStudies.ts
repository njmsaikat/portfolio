import { CaseStudy } from "./types";

// Case studies at /work/<slug>. Content approved by Saikat (2026-11): keep it to
// products, public numbers, role, high-level architecture and tech stack — never
// internal design, infrastructure, security or partner details.
export const caseStudies: CaseStudy[] = [
  {
    slug: "your-campus",
    title: "YOUR Campus: the backend behind a smart-campus platform for 135,000+ students",
    metaTitle: "YOUR Campus Case Study: IoT Platform Backend | Saikat Roy",
    metaDescription:
      "How Saikat Roy built the backend of YOUR Campus from day zero: smart laundry, smart vending and campus commerce for 135,000+ students across 21 universities.",
    company: "YOUR Campus",
    companyUrl: "https://your-campus.com/",
    role: "Senior Backend Engineer",
    period: "Mar 2022 – present · core team since day zero",
    summary:
      "Building the backend of an IoT campus platform from day zero: smart laundry, smart vending and campus commerce for 135,000+ students.",
    intro: [
      "YOUR Campus brings app-controlled services to university halls across Bangladesh. Students reserve and start washing machines from their phones, buy snacks from smart vending machines, and order everyday essentials, all in one app.",
      "I joined the core team at the very beginning and have built the platform's backend from the first line of code.",
    ],
    metrics: [
      { value: "135,000+", label: "App users" },
      { value: "21", label: "Universities" },
      { value: "285+", label: "Washing machines in 135+ locations" },
      { value: "160+", label: "Vending machines on 25+ campuses" },
    ],
    builtTitle: "What I built",
    built: [
      { name: "YOUR Laundry", description: "App-controlled washing machines that students book from their phones." },
      { name: "YOUR Shop", description: "Smart vending machines, including SnacKeeper." },
      { name: "YOUR Mart", description: "Warehouse, inventory and point-of-sale." },
      { name: "YOUR Locker", description: "Smart parcel lockers." },
      { name: "YOUR Planet", description: "Recycling machines with rewards." },
      { name: "YOUR Printer", description: "Self-service campus printing.", status: "In development" },
      { name: "Payments", description: "bKash, Nagad, SSLCommerz and aamarPay integration." },
    ],
    architecture:
      "A cloud-native microservices platform: each product is an independently deployable service with unified authentication, IoT device integration and asynchronous task processing, running on horizontally scalable, containerised infrastructure with centralised monitoring. New products launch without disturbing existing ones.",
    roleDetail:
      "I design and build backend services from scratch, integrate payment gateways and machines, keep production stable as usage grows, and review the team's backend work.",
    stack: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Redis", "Celery", "Docker", "Nginx", "AWS S3", "Firebase", "Sentry"],
    cta: { href: "/services/django-rest-api-development", label: "Backend services" },
    press: [
      {
        outlet: "The Daily Star",
        title: "Dorm-life upgrade: App-based washing machines in public university halls",
        url: "https://www.thedailystar.net/campus/news/dorm-life-upgrade-app-based-washing-machines-public-university-halls-3432191",
        date: "2024",
      },
      {
        outlet: "The Business Standard",
        title: "YOUR Campus: Transforming dormitory life with vending machines, laundromats",
        url: "https://www.tbsnews.net/features/panorama/your-campus-transforming-dormitory-life-vending-machines-laundromats-700246",
        date: "2023",
      },
      {
        outlet: "Somoy TV",
        title: "YOUR Shop and app-based laundry at Dhaka University (video, Bangla)",
        url: "https://www.youtube.com/watch?v=N8YZUn7spoY",
        date: "2023",
      },
      {
        outlet: "Channel 24",
        title: "Smart Bangladesh feature (video, Bangla)",
        url: "https://www.youtube.com/watch?v=frfKUxhfDGk",
        date: "2023",
      },
    ],
  },
  {
    slug: "snackeeper",
    title: "SnacKeeper: building a smart vending network in Dhaka",
    metaTitle: "SnacKeeper Case Study: Smart Vending Backend | Saikat Roy",
    metaDescription:
      "How Saikat Roy helped build SnacKeeper, a 24/7 smart vending network in Dhaka with bKash payments, at Germania Holdings, then carried it into YOUR Campus.",
    company: "Germania Holdings",
    companyUrl: "https://ghl-bd.com/",
    role: "Junior Software Developer",
    period: "Jul 2021 – Nov 2022 · continued at YOUR Campus",
    summary:
      "Helping build a 24/7 smart vending network in Dhaka with bKash payments, then carrying it into YOUR Campus.",
    intro: [
      "SnacKeeper is a smart vending service: unattended machines selling snacks and drinks around the clock, paid with bKash.",
      "I was part of Germania Holdings' in-house team that built its software, from the machines' backend to payments and refunds.",
    ],
    metrics: [
      { value: "64", label: "Dhaka locations by Dec 2021" },
      { value: "110", label: "Machines by 2023" },
      { value: "24/7", label: "Open, with no staff" },
    ],
    builtTitle: "What I worked on",
    built: [
      { name: "Vending backend", description: "Backend for the vending machines, sales and payments." },
      { name: "Refunds", description: "Refunds through bKash and Nagad." },
      { name: "Operations", description: "Server management and DevOps to keep the network running 24/7." },
    ],
    architecture:
      "Connected vending machines backed by a central server for sales, mobile payments and refunds, built for unattended, round-the-clock operation.",
    roleDetail:
      "I worked across the backend, payment and refund flows, and day-to-day operations, using Python, PHP and MySQL.",
    cta: { href: "/services/docker-devops-deployment", label: "DevOps services" },
    stack: ["Python", "Django", "PHP", "MySQL", "PostgreSQL", "bKash & Nagad payment APIs", "Linux servers"],
    press: [
      {
        outlet: "The Business Standard",
        title: "Snacks, soft drinks through bKash payment from digital vending machine 'SnacKeeper' at 64 points in Dhaka",
        url: "https://www.tbsnews.net/economy/corporates/snacks-soft-drinks-through-bkash-payment-digital-vending-machine-snackeeper-64",
        date: "Dec 2021",
      },
      {
        outlet: "Prothom Alo",
        title: "Snacks, soft drinks through bKash payment at 64 points in Dhaka",
        url: "https://en.prothomalo.com/corporate/snacks-soft-drinks-through-bkash-payment-at-64-points-in-dhaka",
        date: "Dec 2021",
      },
      {
        outlet: "The Business Standard",
        title: "The rising popularity of vending machines in Dhaka",
        url: "https://www.tbsnews.net/node/594022",
        date: "Mar 2023",
      },
    ],
    closing: {
      title: "What happened next",
      text: "When SnacKeeper moved to YOUR Campus, I brought it into the YOUR Shop vending backend, where it now runs alongside the rest of the fleet.",
    },
  },
  {
    slug: "freelance",
    title: "Freelance web development: Shopify, WordPress and frontend work for clients worldwide",
    metaTitle: "Freelance Shopify & WordPress Case Study | Saikat Roy",
    metaDescription:
      "Freelance work since 2021: WordPress redesigns, Shopify theme customization, data migrations and responsive frontend fixes for clients worldwide.",
    company: "Upwork & Fiverr",
    role: "Freelance Web Developer",
    period: "May 2021 – present · alongside full-time engineering",
    summary:
      "Redesigns, migrations, responsive fixes and Shopify theme work for clients worldwide, with five-star client reviews.",
    intro: [
      "Since 2021 I've worked with businesses around the world through Upwork and Fiverr, alongside my full-time engineering role. Clients come to me with a store that doesn't look like their brand, a site that breaks on mobile, or content stuck on an old platform. I get it fixed, polished and live.",
      "I bring the same discipline as my backend work: understand the problem first, change only what's needed, and hand over something the client can run without me.",
    ],
    metrics: [
      { value: "2021", label: "Freelancing since" },
      { value: "Worldwide", label: "Clients" },
      { value: "Shopify & WordPress", label: "Core platforms" },
    ],
    builtTitle: "What clients hire me for",
    built: [
      {
        name: "WordPress redesigns",
        description:
          "Bringing dated WordPress sites up to date with new layouts and theme customization that fit the brand, without rebuilding what already works.",
      },
      {
        name: "Shopify theme customization",
        description: "Custom sections, layouts and styling for Shopify storefronts, including designs made to order.",
      },
      {
        name: "Data & site migrations",
        description: "Moving content, products and pages between platforms and hosts, planned so everything arrives intact.",
      },
      {
        name: "Responsive frontend fixes",
        description: "Fixing layouts that break on phones and tablets, so the site works on every screen.",
      },
      {
        name: "WooCommerce & plugins",
        description: "Setting up and configuring plugins, and WooCommerce for clients who sell online.",
      },
      {
        name: "Speed & SEO fixes",
        description: "Faster page loads and on-page SEO fixes, so the site is quicker to use and easier to find.",
      },
      {
        name: "Landing pages & page builders",
        description: "Campaign and product landing pages, hand-coded or built with page builders like Elementor.",
      },
      { name: "Custom frontend builds", description: "Hand-built, responsive front ends from a design." },
    ],
    architectureTitle: "How I work",
    architecture:
      "Mobile-first, pixel-perfect implementation, clear communication at every step, and a clean handover the client can maintain on their own.",
    roleDetail:
      "End to end: scoping the request with the client, building or fixing it, testing across devices, and delivering what was agreed.",
    stack: [
      "Shopify",
      "Liquid",
      "WordPress",
      "WooCommerce",
      "Elementor",
      "PHP",
      "JavaScript",
      "jQuery",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "MySQL",
    ],
    cta: { href: "/services/shopify-development", label: "Shopify & WordPress services" },
    press: [],
    quotes: [
      {
        text: "Saikat did a great job with fixing the responsiveness issues on our website. He communicated very well…",
        source: "Upwork client",
        rating: 5,
      },
      {
        text: "…he made me a custom order for my request, he made a very outstanding design for my store and delivered early. Would use again A+",
        source: "Fiverr client, United States",
        rating: 5,
      },
      {
        text: "Respectful freelancer, made the changes and was courteous.",
        source: "Upwork client",
        rating: 5,
      },
    ],
    projects: [
      "Women's fashion store",
      "Skincare store",
      "Health supplements store",
      "Farm & garden supply website",
      "Mattress & sleep products store",
      "Personal care brand website",
      "Mattress brand storefront",
      "Custom apparel printing site",
      "Book launch website",
    ],
  },
  {
    // Grounded in the HisabBD repo (github.com/saikatnjm/hisabbd, main) and the
    // approved entry in data/projects.ts. Counts are from src/calculators/registry.ts.
    slug: "hisabbd",
    title: "HisabBD: 40+ English and Bangla calculators for Bangladesh, with no backend",
    metaTitle: "HisabBD Case Study: Client-Side Calculators | Saikat Roy",
    metaDescription:
      "How Saikat Roy built HisabBD: 40+ English and Bangla calculators for Bangladesh that run in the browser, with no backend, tested with Vitest and Playwright.",
    company: "HisabBD",
    companyUrl: "https://bd-hisab.vercel.app",
    role: "Solo developer",
    period: "Oct 2026 – present · my own product",
    summary:
      "Building 40+ free calculators for Bangladesh in English and Bangla, where every calculation runs in the browser.",
    intro: [
      "HisabBD is a free set of calculators for everyday life in Bangladesh: loan EMI, VAT, Sanchayapatra, DPS and FDR, salary, land units, SSC/HSC GPA, CGPA, age, BMI and more. Every page is in English and Bangla.",
      "I built it on my own, from the first commit to deployment. The goal was a site that works well on low-end phones, needs no backend, database or paid APIs, and never sends what people type to a server.",
    ],
    metrics: [
      { value: "40+", label: "Calculators" },
      { value: "2", label: "Languages on every page" },
      { value: "6", label: "Categories" },
      { value: "0", label: "Backend servers or databases" },
    ],
    builtTitle: "What I built",
    built: [
      {
        name: "Calculator registry",
        description:
          "One registry lists every calculator's metadata. The home page, search, category pages, related links, footer, sitemap and structured data are all built from it.",
      },
      {
        name: "One folder per calculator",
        description:
          "Each calculator keeps its metadata, pure calculation logic, tests, browser widget and English and Bangla explanations together, so adding one follows the same steps every time.",
      },
      {
        name: "Bangla pages from one route",
        description:
          "All Bangla calculator pages come from a single route over a page registry, so a new calculator gets its /bn page automatically.",
      },
      {
        name: "Tests that guard the structure",
        description:
          "Vitest covers every calculator's logic and checks the registry itself: slugs, categories, related links, Bangla fields and that each route exists. Playwright opens every calculator in both languages in a real browser.",
      },
      {
        name: "Privacy by design",
        description:
          "Inputs never leave the browser: not in URLs, analytics or network requests. The only typed values kept are an optional calculation history on the device, which can be turned off or cleared.",
      },
      {
        name: "Made for Bangladesh",
        description:
          "Taka amounts with lakh and crore grouping, Bangla digits accepted in inputs, a Sunday to Thursday work week, and a configurable grading scale that includes the UGC 4.00 scale.",
      },
    ],
    architecture:
      "A Next.js site where every page is generated at build time, with no API routes, server actions or database. Pages and explanations are server components; only the calculator widgets, search and share actions run in the browser. Calculation logic is plain TypeScript, kept apart from the UI so it can be tested on its own. Analytics is optional, off by default, and limited to typed events that carry calculator names and counts, never values.",
    roleDetail:
      "It's my own product. I designed it, built the calculators with their English and Bangla content, and set up the tests and deployment. Development runs in Docker. Every pull request and push to main runs lint, type checks, unit tests, a production build and the browser tests on GitHub Actions, and the site deploys on Vercel.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vitest", "Playwright", "GitHub Actions", "Docker", "Vercel"],
    cta: { href: "/projects/hisabbd", label: "HisabBD product page" },
    press: [],
  },
];
