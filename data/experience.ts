import { Certification, EducationEntry, ExperienceEntry } from "./types";

// Sourced from resume + LinkedIn export (public/cv/Profile.pdf, 2026-08-07).
export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    company: "YOUR Campus",
    companyUrl: "https://your-campus.com/",
    start: "Mar 2022",
    end: "Present",
    description:
      "Core team member on in-house software architecture, execution, and deployment for a campus platform serving university students in Bangladesh with a smart laundry service, a vending machine service, and an e-commerce service.",
  },
  {
    role: "Web Developer",
    company: "Upwork (Freelance)",
    companyUrl: "https://www.upwork.com/freelancers/~017a6b074dbd601705",
    start: "May 2021",
    end: "Present",
    description: "Freelance front-end, WordPress, and Shopify development for clients worldwide.",
  },
  {
    role: "Junior Software Developer",
    company: "Germania Holdings Ltd.",
    companyUrl: "https://ghl-bd.com/",
    start: "Jul 2021",
    end: "Nov 2022",
    description:
      "Worked on the technical team behind SnacKeeper, a pioneer smart vending machine service in Bangladesh — design, implementation, backend operations, server management, DevOps, and keeping the system running 24/7.",
  },
  {
    role: "Executive Developer",
    company: "Dokmi BD",
    companyUrl: "https://dokmi.com/",
    start: "Aug 2020",
    end: "Jun 2021",
    description:
      "WordPress and Shopify development: theme customization, plugin implementation, site migrations, and full website rebuilds using Bootstrap and JavaScript.",
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
