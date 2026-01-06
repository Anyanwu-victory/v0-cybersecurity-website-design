import { Target, Eye, ShieldCheck, Shield, Lock, Search, } from "lucide-react";
import { IconBrandLinkedin, IconBrandX, IconBrandGithub }  from '@tabler/icons-react';

//Home page data
export const services = [
    {
    title: "Threat Detection",
    description:
      "Real-time monitoring and AI-driven analysis to identify complex attack patterns before they breach your perimeter.",
    icon: Shield,
    color: "text-red-500",
  },
    {
    title: "Digital Forensics",
    description:
      "Deep-dive analysis of security incidents to recover data, trace origins, and build legally sound forensic reports.",
    icon: Search,
    color: "text-blue-500",
  },
  {
    title: "Cyber Defense",
    description:
      "Hardening infrastructure with zero-trust architecture and automated response protocols for maximum resilience.",
    icon: Lock,
    color: "text-purple-500",
  },
];

export const socials = [
    {
        name: "LinkedIn",
        href: `#`,
        icon: IconBrandLinkedin,
    },
       {
        name: "Github",
        href: "#",
        icon: IconBrandGithub,
    },
    {
        name: "X",
        href: "#",
        icon: IconBrandX,
    },

]
//Home page data ends here 

// About page data
export const aboutCompanyText = ` Founded in 2021, RT-DS (Response Technology & Digital Security) emerged from a collective of elite security researchers dedicated to solving the most complex digital puzzles.

 Our vision is to build a future where digital innovation isn't hampered by the fear of compromise. By staying "One Trace Ahead," we provide the clarity and armor businesses need to thrive in a hostile cyber climate.`;

 export const missionText = `At RT-DS, we are dedicated to protecting organizations from evolving cyber threats through advanced threat intelligence, digital forensics, and proactive defense strategies. Our mission is to empower businesses with the tools and expertise needed to secure their digital infrastructure in an increasingly connected world.

We combine cutting-edge technology with deep domain expertise to deliver comprehensive security solutions that adapt to the ever-changing threat landscape.`;

export const visionText = `We envision a future where organizations can operate with confidence, knowing their digital assets are protected by intelligent, adaptive security systems. Through continuous innovation and research, we strive to stay ahead of emerging threats and set new standards in cybersecurity excellence.

Our goal is to become the most trusted partner for enterprise cybersecurity, known for our unwavering commitment to protecting what matters most to our clients.`;

export const breachesPrevented  = 500;
export const activeMonitoringHours = "24/7";

export const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every trace tells a story. We decode it with surgical precision.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Open communication and detailed reporting on every vulnerability found.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Unwavering commitment to ethical hacking and client confidentiality.",
  },
];

export const team = [
  {
    name: "Dr. Elena Vance",
    role: "Chief Security Architect",
    bio: "Former intelligence analyst specialized in advanced persistent threat (APT) research.",
    avatar: "/professional-cybersecurity-expert-woman.jpg",
  },
  {
    name: "Marcus Thorne",
    role: "Head of Forensics",
    bio: "Expert in cross-platform digital artifact recovery and memory forensics.",
    avatar: "/cybersecurity-professional-man.jpg",
  },
  {
    name: "Sarah Chen",
    role: "Red Team Lead",
    bio: "Offensive security specialist with over 15 years in cloud infrastructure penetration testing.",
    avatar: "/tech-female-leader-portrait.jpg",
  },
  {
    name: "Jaxson Reed",
    role: "SOC Operations Director",
    bio: "Pioneer in automated incident response systems and 24/7 threat hunting.",
    avatar: "/cybersecurity-man-expert.jpg",
  },
];


//Events page data

export const events = [
  {
    title: "Zero-Trust Architecture Summit",
    date: "March 15, 2026",
    location: "Online / Virtual",
    description: "A deep dive into implementing zero-trust security models for distributed enterprise teams.",
    tag: "Workshop",
  },
  {
    title: "Advanced Threat Hunting & Forensic Analysis",
    date: "April 02, 2026",
    location: "Washington D.C.",
    description: "Exclusive 2-day workshop on modern forensic techniques and tracing APT movements.",
    tag: "Exclusive",
  },
  {
    title: "The Future of Cyber Defense in the AI Era",
    date: "May 12, 2026",
    location: "London, UK",
    description: "Keynote presentation on how machine learning is revolutionizing both attacks and defense.",
    tag: "Conference",
  },
  {
    title: "Cloud Infrastructure Hardening",
    date: "June 20, 2026",
    location: "Singapore",
    description: "Hands-on session for securing multi-cloud environments against lateral movement.",
    tag: "Seminar",
  },
]
