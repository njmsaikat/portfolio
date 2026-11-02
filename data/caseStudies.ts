import { CaseStudy } from "./types";

// Case studies at /work/<slug>. Content approved by Saikat (2026-11): keep it to
// products, public numbers, role, high-level architecture and tech stack — never
// internal design, infrastructure, security or partner details.
export const caseStudies: CaseStudy[] = [
  {
    slug: "your-campus",
    title: "YOUR Campus: the backend behind a smart-campus platform for 135,000+ students",
    metaTitle: "YOUR Campus Case Study: IoT Campus Platform Backend | Saikat Roy",
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
];
