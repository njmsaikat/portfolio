import { Certification, EducationEntry, ExperienceEntry } from "./types";

// Sourced from resume + LinkedIn export (public/cv/Profile.pdf, 2026-08-07).
export const experience: ExperienceEntry[] = [
  {
    role: "Senior Backend Engineer",
    company: "YOUR Campus",
    companyUrl: "https://your-campus.com/",
    start: "Mar 2022",
    end: "Present",
    description:
      "Core team member from day zero of an IoT campus-services platform used by 135,000+ students across 21 universities. I build the backend for its products (smart laundry, smart vending, YOUR Mart, lockers, recycling and printing) and integrate payment gateways including bKash, Nagad, SSLCommerz and aamarPay.",
    caseStudy: "/work/your-campus",
  },
  {
    role: "Web Developer",
    company: "Upwork (Freelance)",
    companyUrl: "https://www.upwork.com/freelancers/~017a6b074dbd601705",
    start: "May 2021",
    end: "Present",
    description: "Freelance front-end, WordPress, and Shopify development for clients worldwide.",
    caseStudy: "/work/freelance",
  },
  {
    role: "Junior Software Developer",
    company: "Germania Holdings Ltd.",
    companyUrl: "https://ghl-bd.com/",
    start: "Jul 2021",
    end: "Nov 2022",
    description:
      "Part of the in-house team that built SnacKeeper, a smart vending network in Dhaka with bKash payments: backend, payments and refunds in Python, PHP and MySQL, plus server management and DevOps to keep it running 24/7. SnacKeeper later moved to YOUR Campus, where I continued developing it.",
    caseStudy: "/work/snackeeper",
  },
  {
    role: "Executive Developer",
    company: "Dokmi BD",
    companyUrl: "https://dokmi.com/",
    start: "Aug 2020",
    end: "Jun 2021",
    description:
      "WordPress, Shopify and frontend development at a Dhaka digital agency: theme customization, plugins, migrations and full site rebuilds.",
  },
];

// Non-software roles (Bangla transcription, content writing, physics tutoring,
// 2018-2020) are intentionally omitted from the public timeline — real history,
// just not software experience.

export const education: EducationEntry = {
  degree: "B.Sc. (Hons.) in Electronics & Communication Engineering",
  institution: "Institute of Science & Technology",
  institutionUrl: "https://ist.edu.bd/",
  start: "2015",
  end: "Feb 2021",
  note: "Major in Communication",
  achievements: [
    "Poster Presentation Champion — National Conference on Electronics and Informatics, 2019",
    "Slide Making Competition Champion",
  ],
  publications: [
    "Effectiveness of Using Rain Energy as a Power Source in Bangladesh",
    "Rain Energy Harnessing using Piezoelectric Transducers",
    "Gold Nano Particles, An Emerging Solution of Cancer",
  ],
};

export const certifications: Certification[] = [
  {
    title: "Building Web Applications in PHP",
    issuer: "University of Michigan (Coursera)",
    year: "2020",
    credentialId: "5U6TYJY8KP8Y",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/5U6TYJY8KP8Y",
  },
  {
    title: "Introduction to Structured Query Language (SQL)",
    issuer: "University of Michigan (Coursera)",
    year: "2020",
    credentialId: "9CPBTJRWEZ98",
  },
  {
    title: "Top-up IT Training, Web Development (300 hours)",
    issuer: "LICT Project / Bangladesh Computer Council, certified by George Washington University",
    year: "2017",
    credentialId: "G023933",
  },
  { title: "Ajax with PHP: Add Dynamic Content to Websites" },
  { title: "Frontend Fundamentals" },
  { title: "Python (Basic)" },
];
