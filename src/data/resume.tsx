import { Icons } from "@/components/icons";
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
  description: "A Software Engineer and New Grad with a focus in AI, currently diving deeper into quant. I thrive solving challenging problems and I'm driven to build tools and solutions that help people.",
  summary:
    "I’m third cultured: born in France and shaped by growing up across France, India, and Canada. Moving between cultures and spending much of my youth at boarding school shaped my independence, perspective, and adaptability.\n\nI built my first business at 17 and pursued ideas ever since—launching and pitching ventures, and working with early-stage teams. I [studied computer science and business](#education), and have a keen interest in [AI, algorithms, backend, and quant](#projects). I have significant experience in C/C++, Python, SQL, and machine learning frameworks including PyTorch and scikit-learn, as well as Java, JavaScript, TypeScript, Racket and Go. My hobbies include coding, playing soccer, backpacking, and fishing.",
  avatarUrl: "/paul-mancion.png",
  ogImage: "/paul-mancion.png",
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    work: {
      order: 4,
      enabled: true,
      heading: "Work Experience",
    },
    skills: { order: 2, enabled: true, heading: "Skills" },
    education: { order: 3, enabled: true, heading: "Education" },
    projects: {
      order: 5,
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
      text: "I'm currently looking for opportunities to start my career in software engineering, particularly with teams working on challenging technical problems. I'm also open to internships, collaborations, and feedback on my projects.",
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
    { name: "C / C++", logos: ["C", "C++"] },
    { name: "Python", logos: ["Python"] },
    { name: "SQL", logos: ["SQL"] },
    { name: "Java", logos: ["Java"] },
    { name: "JavaScript", logos: ["JavaScript"] },
    { name: "TypeScript", logos: ["TypeScript"] },
    { name: "Racket", logos: ["Racket"] },
    { name: "Go", logos: ["Go"] },
    { name: "PyTorch", logos: ["PyTorch"] },
    { name: "scikit-learn", logos: ["scikit-learn"] },
    { name: "Hugging Face", logos: ["Hugging Face"] },
    { name: "Flutter / Mobile", logos: ["Flutter"] },
    { name: "React", logos: ["React"] },
    { name: "Node.js", logos: ["Node.js"] },
  ],
  contact: {
    email: {
      name: "Email",
      address: "connect@paulmancion.com",
      url: "mailto:connect@paulmancion.com",
    },
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
      company: "Marcatus QED",
      title: "Marketing Communications Intern",
      logoUrl: "/logos/marcatus-qed.png",
      logoBackground: "linear-gradient(135deg, #ffe66d 0%, #39c9a8 48%, #0b3a4a 100%)",
      period: "Mar 2023 - May 2023",
      highlights: [
        "Created Marcatus Mobile Education Platform deck, showing impact across 77,000+ smallholder farmers.",
        "Developed the Marcatus Unilever Global Summit 2023 deck, presenting expansion plans for 6,000 farmers.",
      ],
    },
    {
      company: "Docushield",
      title: "Marketing and MVP Lead",
      logoUrl: "/logos/docushield.png",
      logoBackground: "linear-gradient(90deg, #4c1d95 0%, #6d28d9 52%, #8b5cf6 100%)",
      period: "May 2022 - Nov 2022",
      highlights: [
        "Drove product-market fit research, community initiatives, and IDO campaigns supporting $1M+ in funding.",
        "Delivered MVP and beta releases for the core app and NFT platform by leading product design, developer coordination, and community testing.",
      ],
    },
    {
      company: "High School Math and Science",
      title: "Tutor",
      logoUrl: "/logos/pi.png",
      logoBackground: "linear-gradient(135deg, #a7f3d0 0%, #5eead4 52%, #38bdf8 100%)",
      period: "Jun 2020 - Sep 2024",
      description:
        "Tutored high-school students in math and science by preparing practice exercises, explaining concepts clearly, and adapting lessons to each student's needs.",
    },
    {
      company: "WRLDSUPPLY",
      title: "Founder",
      logoUrl: "/logos/wrldsupply.png",
      logoBackground: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 52%, #9ca3af 100%)",
      period: "Feb 2019 - Dec 2022",
      description:
        "Built a luxury sneaker and apparel business across Canada and Europe. Led sourcing, sales, operations, and marketing to $80K in 18 months.",
    },
    {
      company: "Investment Portfolio",
      title: "Trader",
      logoUrl: "/logos/invest.png",
      logoBackground: "linear-gradient(135deg, #1e3a8a 0%, #155e75 52%, #0f766e 100%)",
      period: "Dec 2020 - Mar 2024",
      description:
        "Managed a Canada-based investment portfolio with friends across Web3, crypto, and active trading, growing the portfolio to over $100K.",
    },
  ] as PortfolioWork[],
  education: [
    {
      school: "University of Guelph",
      href: "https://www.uoguelph.ca",
      degree: "Honours, Bachelor of Computer Science (GPA 3.95 / 4.0)",
      logoUrl: "/logos/university_of_guelph.png",
      logoBackground: "linear-gradient(135deg, #ffffff 0%, #f8fafc 58%, #e5e7eb 100%)",
      start: "Sep 2021",
      end: "Jun 2026",
      achievements: ["Dean's honours list for 7 consecutive semesters.", "My favorite courses were Intro to Intelligent Systems (achieved 100%), Parallel Programming (achieved 96%), and Software Engineering (achieved 96%)."],
    },
    {
      school: "University of Waterloo and Wilfrid Laurier",
      href: "https://uwaterloo.ca",
      degree: "Bachelor of Computer Science and Business Administration",
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
      ],
    },
    {
      school: "St. Mary Catholic Academy",
      href: "https://www.tcdsb.org/o/stmarycatholicacademy",
      degree: "Honours, OSSD & IB Diploma Program (GPA 3.97 / 4.0)",
      logoUrl: "/logos/st_mary_catholic_academy.png",
      logoBackground: "linear-gradient(135deg, #ffffff 0%, #f8fafc 58%, #e5e7eb 100%)",
      start: "Jan 2019",
      end: "Jun 2020",
      achievements: [
        "Won the Geography School Award.",
        "Earned distinction in the University of Waterloo Beaver Computing and Pascal contests.",
      ],
    },
    {
      school: "Kodaikanal International School",
      href: "https://www.kis.in",
      degree: "Honours, IB Middle Years Program (GPA 4.0 / 4.0)",
      logoUrl: "/logos/kodaikanal_international_school.png",
      logoBackground: "linear-gradient(135deg, #ffffff 0%, #f8fafc 58%, #e5e7eb 100%)",
      start: "Jan 2015",
      end: "Dec 2018",
      achievements: [
        "Robotics Club President and member of the Senior Men's Football and Basketball teams.",
        "Won the 2017 Oxford British English Olympics against 150 schools across 19 countries.",
      ],
    },
  ],
  projects,
} as const;
