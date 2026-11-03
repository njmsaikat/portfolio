import { profile } from "./profile";

// Copy for /about: the canonical "who is Saikat Roy" page. Every answer is
// drawn from profile.ts, experience.ts and caseStudies.ts — keep it factual.
export const about = {
  metaTitle: "About Saikat Roy | Senior Backend Engineer in Dhaka",
  metaDescription:
    "Saikat Roy is a Senior Backend Engineer in Dhaka, Bangladesh, building Django and REST API backends for real-world commerce at YOUR Campus.",
  intro: [
    `${profile.name} is a ${profile.jobTitle} based in ${profile.location}. Since March 2022 ${profile.name} has been on the core team at ${profile.company}, building the backend of an IoT campus-services platform from day zero.`,
    "Alongside that, Saikat builds and customizes Shopify and WordPress stores for freelance clients worldwide, and builds small, free products on the side.",
  ],
  work: [
    "Django and Django REST Framework backends and REST APIs, with PostgreSQL and containerized deployments.",
    "Payment gateway integration (bKash, Nagad, SSLCommerz and aamarPay) and IoT device integration for smart vending and laundry.",
    "Shopify and WordPress storefronts for clients worldwide, through Upwork since 2021.",
    "Free web products: HisabBD, Hottogol, Bangladesh Healthcare Search, Pujo Guide and BD Rail Ticket Alarm.",
  ],
  faqs: [
    {
      question: "Who is Saikat Roy?",
      answer: `${profile.name} is a ${profile.jobTitle} at ${profile.company} in ${profile.location}. Saikat builds Django and REST API backends for real-world commerce and has worked in software since ${profile.softwareSinceYear}.`,
    },
    {
      question: "Where is Saikat Roy based?",
      answer: `Saikat Roy is based in ${profile.location} (${profile.timezone}) and works with clients worldwide.`,
    },
    {
      question: "What does Saikat Roy work on?",
      answer:
        "Saikat builds the backend of YOUR Campus, an IoT campus-services platform (smart laundry, smart vending, YOUR Mart, lockers, recycling and printing) used by 135,000+ students across 21 universities in Bangladesh, using Python, Django, Django REST Framework and PostgreSQL. Saikat also integrates payment gateways including bKash, Nagad, SSLCommerz and aamarPay, and builds Shopify and WordPress stores for freelance clients.",
    },
    {
      question: "Is Saikat Roy available for freelance work?",
      answer:
        "Yes. Saikat takes freelance projects through Upwork and Fiverr: Django and REST API backends, payment gateway integration, and Shopify and WordPress development. Saikat has worked with clients worldwide since 2021.",
    },
    {
      question: "How can I contact Saikat Roy?",
      answer: `Email ${profile.email}, or use the contact form on the home page. Saikat is also on LinkedIn, GitHub, Upwork and Fiverr; links are listed on this page.`,
    },
  ],
};
