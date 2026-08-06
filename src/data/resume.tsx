import { Icons } from "@/components/icons";
import {
  BrainCircuit,
  Search,
  Server,
} from "lucide-react";
import { projects } from "@/data/projects";

type PortfolioPhoto = {
  src: string;
  alt: string;
};

type PortfolioWork = {
  company: string;
  title: string;
  logoUrl: string;
  logoBackground?: string;
  period: string;
  description: string;
  highlights?: string[];
};

export const DATA = {
  name: "Paul Mancion",
  initials: "PM",
  sourceCodeUrl: "https://github.com/MindMidas/mywebsite",
  cvUrl: "/cv.pdf",
  description: "A full-stack dev and new grad with a focus in AI.\nI'm currently diving deeper into quant, but what drives me is building stuff that helps people.",
  summary:
    "I’m third cultured: born in France and shaped by growing up across France, India, and Canada. Moving between cultures and spending much of my youth at boarding school shaped my independence, perspective, and adaptability.\n\nI built my first business at 17 and have pursued ideas ever since—launching and pitching ventures, and working with early-stage teams. [Studied computer science and business](#education), with an [interest in AI, algorithms, backend, and quant](#projects). I also enjoy playing football and basketball, training at the gym, hiking, fishing, and backpacking.",
  avatarUrl: "/paul-mancion.png",
  ogImage: "/paul-mancion.png",
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    work: {
      order: 5,
      enabled: true,
      heading: "Experience",
    },
    skills: { order: 2, enabled: true, heading: "Skills" },
    education: { order: 3, enabled: true, heading: "Education" },
    projects: {
      order: 4,
      enabled: true,
      label: "Projects",
      heading: "Check out some of my work.",
      text: "A few projects that show the kind of software I like building across AI, mobile, algorithms, games, and systems. I work until completion and I'm willing to do the hard and challenging tasks.",
    },
    photos: {
      order: 6,
      enabled: true,
      heading: "A few moments",
    },
    contact: {
      order: 7,
      enabled: true,
      label: "Contact",
      heading: "Get in touch",
      text: "I'm open to software roles, internships, collaboration, and project feedback. GitHub and LinkedIn are the best places to see my work and reach out for now.",
    },
  },
  photos: [
    { src: "/about/collage/04-convocation.png", alt: "University of Guelph convocation" },
    { src: "/about/collage/06-graduation-portrait.png", alt: "Graduation portrait" },
    { src: "/about/collage/02-childhood.png", alt: "Childhood on the beach" },
    { src: "/about/collage/03-football.png", alt: "Youth football team" },
    { src: "/about/collage/01-diving.png", alt: "Scuba diving" },
    { src: "/about/collage/05-hiking.png", alt: "Hiking the ridge" },
  ] as PortfolioPhoto[],
  skills: [
    { name: "Python", logos: ["Python"] },
    { name: "AI / ML", icon: BrainCircuit },
    { name: "Algorithms & Search", icon: Search },
    { name: "Backend APIs", icon: Server },
    { name: "TypeScript", logos: ["TypeScript"] },
    { name: "React", logos: ["React"] },
    { name: "Node.js", logos: ["Node.js"] },
    { name: "PostgreSQL / Supabase", logos: ["PostgreSQL", "Supabase"] },
    { name: "Computer Vision", logos: ["OpenCV"] },
    { name: "Flutter / Mobile", logos: ["Flutter"] },
    { name: "C / C++", logos: ["C", "C++"] },
    { name: "Java", logos: ["Java"] },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/MindMidas",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/paul-jules-mancion-4596941a2/",
        icon: Icons.linkedin,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Math Tutoring",
      title: "High School Math Tutor",
      logoUrl: "/logos/pi.png",
      logoBackground: "linear-gradient(135deg, #a7f3d0 0%, #5eead4 52%, #38bdf8 100%)",
      period: "Jun 2020 - Present",
      description:
        "Tutored high-school math in Canada by preparing practice exercises, explaining concepts clearly, and adapting lessons to each student's needs.",
    },
    {
      company: "Marcatus QED",
      title: "Presentation Manager, Freelance",
      logoUrl: "/logos/marcatus-qed.png",
      logoBackground: "linear-gradient(135deg, #ffe66d 0%, #39c9a8 48%, #0b3a4a 100%)",
      period: "Mar 2023 - May 2023",
      description:
        "Freelance presentation work for Marcatus QED, focused on clear executive decks for partner and summit conversations.",
      highlights: [
        "Created the executive presentation for MMEP, the Marcatus Mobile Education Platform.",
        "Built presentation material used for the Unilever partnership and Global Unilever Partner with Purpose Summit 2023.",
      ],
    },
    {
      company: "Docushield",
      title: "Marketing and MVP Lead",
      logoUrl: "/logos/docushield.png",
      logoBackground: "linear-gradient(90deg, #4c1d95 0%, #6d28d9 52%, #8b5cf6 100%)",
      period: "May 2022 - Nov 2022",
      description:
        "Based in Los Angeles, led social media, product research, and $0.5M+ in IDO campaigns. Managed docs, post-launch development, beta testing, and community feedback.",
    },
    {
      company: "Investment Portfolio",
      title: "Trader",
      logoUrl: "/logos/invest.png",
      logoBackground: "linear-gradient(135deg, #1e3a8a 0%, #155e75 52%, #0f766e 100%)",
      period: "Self-directed",
      description:
        "Managed a Canada-based investment portfolio with friends across Web3, crypto, and active trading, growing the portfolio to over $100K.",
    },
    {
      company: "WRLDSUPPLY",
      title: "Founder",
      logoUrl: "/logos/wrldsupply.png",
      logoBackground: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 52%, #9ca3af 100%)",
      period: "Founder",
      description:
        "Built a luxury sneaker and apparel business across Canada and Europe. Led sourcing, sales, operations, and marketing to $80K in 18 months.",
    },
  ] as PortfolioWork[],
  education: [
    {
      school: "University of Guelph",
      href: "https://www.uoguelph.ca",
      degree: "Bachelor of Computer Science",
      logoUrl: "/logos/university_of_guelph.png",
      logoBackground: "linear-gradient(135deg, #ffffff 0%, #f8fafc 58%, #e5e7eb 100%)",
      start: "Sep 2021",
      end: "Jun 2026",
      achievements: [
        "Dean's Honors, 4.0 GPA.",
      ],
    },
    {
      school: "University of Waterloo and Wilfrid Laurier",
      href: "https://uwaterloo.ca",
      degree: "Computer Science & Business Double Degree",
      logoUrl: "/logos/university_of_waterloo.png",
      logoBackground: "linear-gradient(135deg, #ffffff 0%, #f8fafc 58%, #e5e7eb 100%)",
      logoUrls: [
        {
          src: "/logos/university_of_waterloo.png",
          alt: "University of Waterloo logo",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 58%, #e5e7eb 100%)",
          href: "https://uwaterloo.ca",
          label: "Waterloo",
        },
        {
          src: "/logos/wilfrid_laurier_university.png",
          alt: "Wilfrid Laurier University logo",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 58%, #e5e7eb 100%)",
          href: "https://www.wlu.ca",
          label: "Laurier",
        },
      ],
      start: "Sep 2020",
      end: "Apr 2021",
      achievements: [
        "Started during a difficult COVID-year transition between two schools, realized I wanted to focus on CS, and reset at Guelph.",
      ],
    },
    {
      school: "St. Mary Catholic Academy",
      href: "https://www.tcdsb.org/o/stmarycatholicacademy",
      degree: "OSSD & IB Diploma Program",
      logoUrl: "/logos/st_mary_catholic_academy.png",
      logoBackground: "linear-gradient(135deg, #ffffff 0%, #f8fafc 58%, #e5e7eb 100%)",
      start: "Jan 2019",
      end: "Jun 2020",
      achievements: [
        "Dean's Honors, 3.97 GPA.",
        "Won the Geography School Award.",
        "Earned distinction in the University of Waterloo Beaver Computing and Pascal contests.",
      ],
    },
    {
      school: "Kodaikanal International School",
      href: "https://www.kis.in",
      degree: "IB Middle Years Program",
      logoUrl: "/logos/kodaikanal_international_school.png",
      logoBackground: "linear-gradient(135deg, #ffffff 0%, #f8fafc 58%, #e5e7eb 100%)",
      start: "Jan 2015",
      end: "Dec 2018",
      achievements: [
        "Dean's Honors, 4.0 GPA.",
        "Robotics Club President and member of the Senior Men's Football and Basketball teams.",
        "Won the 2017 Oxford British English Olympics against 150 schools across 19 countries.",
      ],
    },
  ],
  projects,
} as const;
