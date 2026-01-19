import { Target, Eye, ShieldCheck, Shield, Lock, Search, Mail, Phone, MapPin, Presentation } from "lucide-react"
import { IconBrandLinkedin, IconBrandX, IconBrandTiktok, IconBrandInstagram, IconUser, IconDeviceDesktop } from "@tabler/icons-react"

//Home page data
export const services = [
  {
    slug: "penetration-testing",
    title: "Penetration Testing & Ethical Hacking",
    description:
      "We simulate real-world attacks to uncover vulnerabilities before malicious actors do.",
    icon: Shield,
    color: "text-[#E11D2E]",
    glowClass: "neon-glow-red",
  },
  {
    slug: "training-webinars",
    title: "Cybersecurity Education & Mentorship",
    description:
      "Practical training for students, developers, and professionals—from beginner to advanced levels.",
    icon: Presentation,
    color: "text-[#38BDF8]",
    glowClass: "neon-glow-blue",
  },
  {
    slug: "vulnerability-assessment",
    title: "Vulnerability Assessment & Risk Analysis",
    description:
      "Identify security gaps, assess impact, and get clear recommendations to reduce risk.",
    icon: Search,
    color: "text-[#7C3AED]",
    glowClass: "neon-glow-purple",
  },
   {
    slug: "security-consulting",
    title: "Security Consulting & Advisory",
    description:
      "Expert guidance to help organizations make smart security decisions and build resilient systems.",
    icon: IconUser,
    color: "text-[#7C3AED]",
    glowClass: "neon-glow-purple",
  },
   {
    slug: "secure-software-development",
    title: "Secure Software Development",
    description:
      "We design and build software with security baked in—from architecture to deployment.",
    icon: Lock,
    color: "text-[#E11D2E]",
    glowClass: "neon-glow-red",
  },
   {
    slug: "product-design",
    title: "Product Design (UI/UX & Security-First Design)",
    description:
      "Creating user-friendly, secure digital products that balance usability with protection.",
    icon: IconDeviceDesktop,
    color: "text-[#38BDF8]",
    glowClass: "neon-glow-blue",
  },
]

export const socials = [
  {
    name: "LinkedIn",
    href: `#`,
    icon: IconBrandLinkedin,
  },
  {
    name: "Tiktok",
    href: "https://www.tiktok.com/@redtraced.securit?_r=1&_t=ZS-92n1s803UVp",
    icon: IconBrandTiktok,
  },
  {
    name: "X",
    href: "#",
    icon: IconBrandX,
  },
  {
    name: "Instagram",
    href: "#",
    icon: IconBrandInstagram,
  },
  
]

export const homePageIntroSectionText = ` "At RedTrace-D Security, We believe true security starts with awareness. 
          Our mission is to simplify cybersecurity through education, 
          consultancy, and proactive 
          defense strategies that protect digital systems and users at every level.
          
          We don’t wait for attacks to happen—we trace weaknesses,
           strengthen systems, and help teams build secure digital products from day one.

           With RedTrace-D Security, you’re not just getting a service provider;
            you’re gaining a trusted partner dedicated to
             securing your digital future."`
//Home page data ends here

// About page data
export const aboutCompanyText = ` RTDS is more than a cybersecurity company—we’re building a community of security-aware creators, developers, and organizations committed to shaping a safer digital future.

The name RedTrace reflects our focus on tracing vulnerabilities early—before they become real threats. What began as a passion for cybersecurity has grown into a startup focused on secure software, product design, training, and digital defense.`

export const missionText = `Our mission is to make cybersecurity practical, accessible, and proactive.
 We empower individuals, developers, startups, and organizations to secure their digital environments through education, consulting, and hands-on security solutions.`

export const visionText = `To build a future where security is not an afterthought, but a foundation—powering innovation, trust, and digital growth across Africa and beyond.`

export const breachesPrevented = 500
export const activeMonitoringHours = "24/7"

export const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every trace tells a story. Tracing vulnerabilities with accuracy before they become threats.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Open communication and detailed reporting on every vulnerability found.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Unwavering commitment to ethical hacking and client confidentiality.",
  },
]

export const team = [
  {
    name: "David Dorcas Mishel",
    role: "Founder/CEO, Red team lead and CISO",
    bio: "Former intelligence analyst specialized in advanced persistent threat (APT) research.",
    avatar: "/Dorcas image.jpeg",
    socials: [
      { name: "LinkedIn", href: "#", icon: IconBrandLinkedin },
      { name: "Instagram", href: "#", icon: IconBrandInstagram },
    ],
  },
  {
    name: "Oluebube Victoria Udegbunam",
    role: "SOC Analyst/Blue Team Lead",
    bio: "Expert in cross-platform digital artifact recovery and memory forensics.",
    avatar: "/cybersecurity-professional-man.jpg",
    socials: [
      { name: "LinkedIn", href: "#", icon: IconBrandLinkedin },
      { name: "Instagram", href: "#", icon: IconBrandInstagram },
    ],
  },
  {
    name: "Shekinah Glory Frederick",
    role: "Governance risk and Compliance Officer( team lead)",
    bio: "Offensive security specialist with over 15 years in cloud infrastructure penetration testing.",
    avatar: "/images/shekinah-image.jpeg",
    socials: [
      { name: "LinkedIn", href: "#", icon: IconBrandLinkedin },
      { name: "Instagram", href: "#", icon: IconBrandInstagram },
    ],
  },
  {
    name: "Anyanwu Victory",
    role: "Product Design and Software development",
    bio: "Pioneer in automated incident response systems and 24/7 threat hunting.",
    avatar: "/cybersecurity-man-expert.jpg",
    socials: [
      { name: "LinkedIn", href: "#", icon: IconBrandLinkedin },
      { name: "Instagram", href: "#", icon: IconBrandInstagram },
    ],
  },
]

//Events page data
export const events = [
  {
    id: "zero-trust-summit",
    slug: "zero-trust-summit",
    title: "Zero-Trust Architecture Summit",
    date: "March 15, 2026",
    time: "10:00 AM - 5:00 PM EST",
    location: "Online / Virtual",
    eventType: "virtual",
    description: "A deep dive into implementing zero-trust security models for distributed enterprise teams.",
    tag: "WORKSHOP",
    duration: "6 hours",
    audience: "Intermediate to Advanced",
    price: "Free",
    fullDescription:
      "Join industry experts as we explore the principles and implementation strategies of zero-trust architecture. This comprehensive workshop covers identity verification, continuous authentication, and microservices security.",
    learningOutcomes: [
      "Understand zero-trust core principles and architecture design",
      "Implement identity and access management at scale",
      "Deploy network segmentation and microsegmentation",
      "Monitor and respond to zero-trust violations",
    ],
    agenda: [
      {
        time: "10:00 AM",
        title: "Welcome & Keynote",
        duration: "30 min",
        description: "Industry overview and zero-trust evolution",
      },
      {
        time: "10:30 AM",
        title: "Architecture Fundamentals",
        duration: "1 hour",
        description: "Deep dive into zero-trust principles",
      },
      { time: "11:30 AM", title: "Break", duration: "15 min", description: "" },
      {
        time: "11:45 AM",
        title: "Implementation Case Studies",
        duration: "1 hour",
        description: "Real-world deployments and lessons learned",
      },
      { time: "12:45 PM", title: "Lunch Break", duration: "1 hour", description: "" },
      {
        time: "1:45 PM",
        title: "Hands-on Lab: IAM Setup",
        duration: "1.5 hours",
        description: "Configure zero-trust identity management",
      },
      { time: "3:15 PM", title: "Break", duration: "15 min", description: "" },
      {
        time: "3:30 PM",
        title: "Q&A Panel & Closing",
        duration: "1.5 hours",
        description: "Expert panel discussion and networking",
      },
    ],
    speakers: [
      {
        id: 1,
        name: "David Dorcas Mishel",
        role: "Founder/CEO, Red Team Lead",
        organization: "RT-DS",
        bio: "Former intelligence analyst specialized in advanced persistent threat research and zero-trust implementations.",
        avatar: "/professional-cybersecurity-expert-woman.jpg",
      },
      {
        id: 2,
        name: "Oluebube Victoria Udegbunam",
        role: "SOC Analyst/Blue Team Lead",
        organization: "RT-DS",
        bio: "Expert in cross-platform security audits and identity management systems.",
        avatar: "/cybersecurity-professional-man.jpg",
      },
    ],
    roles: ["CISO", "Security Architect", "Identity Manager", "Network Engineer"],
    registrationLink: "#",
    calendarLink: "#",
  },
  {
    id: "threat-hunting-forensics",
    slug: "threat-hunting-forensics",
    title: "Advanced Threat Hunting & Forensic Analysis",
    date: "April 02, 2026",
    time: "9:00 AM - 6:00 PM UTC",
    location: "Washington D.C.",
    eventType: "in-person",
    description: "Exclusive 2-day workshop on modern forensic techniques and tracing APT movements.",
    tag: "EXCLUSIVE",
    duration: "2 days",
    audience: "Advanced",
    price: "$1,499",
    fullDescription:
      "This intensive 2-day workshop brings together elite threat hunters and forensic analysts to share advanced techniques for detecting, analyzing, and responding to sophisticated APT campaigns.",
    learningOutcomes: [
      "Master advanced forensic artifact analysis techniques",
      "Hunt for indicators of compromise across enterprise networks",
      "Trace APT kill chains and attribute threat actors",
      "Develop custom detection rules and hunting queries",
      "Build forensic timelines from diverse data sources",
    ],
    agenda: [
      {
        time: "9:00 AM",
        title: "Threat Hunting Fundamentals",
        duration: "2 hours",
        description: "Framework and methodology for proactive threat discovery",
      },
      { time: "11:00 AM", title: "Break", duration: "15 min", description: "" },
      {
        time: "11:15 AM",
        title: "Artifact Analysis Deep Dive",
        duration: "2 hours",
        description: "Windows, Linux, and Mac forensic artifacts",
      },
      { time: "1:15 PM", title: "Lunch", duration: "1 hour", description: "" },
      {
        time: "2:15 PM",
        title: "Hands-on Lab: Hunt Exercise 1",
        duration: "2.5 hours",
        description: "Detect and analyze simulated APT activity",
      },
      { time: "4:45 PM", title: "Day 1 Wrap-up", duration: "15 min", description: "" },
      {
        time: "9:00 AM",
        title: "Day 2: APT Attribution & Response",
        duration: "2 hours",
        description: "Techniques for threat actor identification",
      },
      { time: "11:00 AM", title: "Break", duration: "15 min", description: "" },
      {
        time: "11:15 AM",
        title: "Hands-on Lab: Hunt Exercise 2",
        duration: "2.5 hours",
        description: "End-to-end investigation scenario",
      },
      { time: "1:45 PM", title: "Lunch", duration: "1 hour", description: "" },
      {
        time: "2:45 PM",
        title: "Case Studies & Report Writing",
        duration: "2 hours",
        description: "Real investigations and forensic reporting",
      },
      { time: "4:45 PM", title: "Closing Ceremony", duration: "15 min", description: "" },
    ],
    speakers: [
      {
        id: 1,
        name: "Oluebube Victoria Udegbunam",
        role: "SOC Analyst/Blue Team Lead",
        organization: "RT-DS",
        bio: "Expert in digital artifact recovery with over 500+ investigations and memory forensics specialist.",
        avatar: "/cybersecurity-professional-man.jpg",
      },
    ],
    roles: ["SOC Analyst", "Threat Hunter", "Incident Responder", "Forensic Analyst"],
    registrationLink: "#",
    calendarLink: "#",
  },
  {
    id: "ai-cyber-defense",
    slug: "ai-cyber-defense",
    title: "The Future of Cyber Defense in the AI Era",
    date: "May 12, 2026",
    time: "2:00 PM - 5:00 PM GMT",
    location: "London, UK",
    eventType: "in-person",
    description: "Keynote presentation on how machine learning is revolutionizing both attacks and defense.",
    tag: "CONFERENCE",
    duration: "3 hours",
    audience: "All Levels",
    price: "Free",
    fullDescription:
      "Discover how artificial intelligence and machine learning are transforming the cybersecurity landscape. This keynote explores defensive AI applications, emerging attack vectors, and the future of intelligent security systems.",
    learningOutcomes: [
      "Understand AI/ML applications in cybersecurity defense",
      "Identify AI-driven attack methodologies and countermeasures",
      "Explore predictive threat analytics and anomaly detection",
      "Learn about responsible AI in security operations",
    ],
    agenda: [
      {
        time: "2:00 PM",
        title: "Opening Remarks",
        duration: "15 min",
        description: "Conference welcome and keynote introduction",
      },
      {
        time: "2:15 PM",
        title: "AI in Cybersecurity: Past, Present, Future",
        duration: "1.5 hours",
        description: "Evolution of AI-powered security tools",
      },
      { time: "3:45 PM", title: "Break & Networking", duration: "15 min", description: "" },
      {
        time: "4:00 PM",
        title: "Panel Discussion: AI Ethics & Responsible Security",
        duration: "45 min",
        description: "Expert perspectives on AI safety and ethics",
      },
      { time: "4:45 PM", title: "Q&A & Closing", duration: "15 min", description: "" },
    ],
    speakers: [
      {
        id: 1,
        name: "David Dorcas Mishel",
        role: "Founder/CEO",
        organization: "RT-DS",
        bio: "Keynote speaker and visionary in applying AI to threat intelligence and predictive defense.",
        avatar: "/professional-cybersecurity-expert-woman.jpg",
      },
    ],
    roles: ["Security Leader", "Data Scientist", "Analyst", "Researcher"],
    registrationLink: "#",
    calendarLink: "#",
  },
  {
    id: "cloud-hardening",
    slug: "cloud-hardening",
    title: "Cloud Infrastructure Hardening",
    date: "June 20, 2026",
    time: "8:00 AM - 12:00 PM SGT",
    location: "Singapore",
    eventType: "in-person",
    description: "Hands-on session for securing multi-cloud environments against lateral movement.",
    tag: "SEMINAR",
    duration: "4 hours",
    audience: "Intermediate to Advanced",
    price: "$799",
    fullDescription:
      "Learn practical strategies for hardening cloud infrastructure across AWS, Azure, and Google Cloud. This hands-on seminar covers container security, identity management, and advanced threat detection in cloud environments.",
    learningOutcomes: [
      "Master cloud-native security best practices",
      "Implement container and Kubernetes security controls",
      "Configure cloud IAM for zero-trust environments",
      "Detect and prevent lateral movement in cloud networks",
      "Deploy cloud-native threat detection and response",
    ],
    agenda: [
      {
        time: "8:00 AM",
        title: "Cloud Security Fundamentals",
        duration: "1 hour",
        description: "Overview of cloud threat landscape and controls",
      },
      {
        time: "9:00 AM",
        title: "Container & Kubernetes Security",
        duration: "1.5 hours",
        description: "Securing containerized workloads",
      },
      { time: "10:30 AM", title: "Break & Networking", duration: "15 min", description: "" },
      {
        time: "10:45 AM",
        title: "Hands-on Lab: Cloud Hardening Scenarios",
        duration: "1 hour",
        description: "Practical exercises on securing cloud resources",
      },
      { time: "11:45 AM", title: "Q&A & Resources", duration: "15 min", description: "" },
    ],
    speakers: [
      {
        id: 1,
        name: "Anyanwu Victory",
        role: "Product Design and Software Development",
        organization: "RT-DS",
        bio: "Pioneer in cloud infrastructure security and automated incident response systems.",
        avatar: "/cybersecurity-man-expert.jpg",
      },
    ],
    roles: ["Cloud Architect", "DevOps Engineer", "Security Engineer", "Platform Engineer"],
    registrationLink: "#",
    calendarLink: "#",
  },
]

// Services detail data is imported from servicesDetailsData.ts

export const contactMethods = [
  {
    icon: Mail,
    type: "Encrypted Email",
    detail: "rtdsecure004@gmail.com",
    color: "[#E11D2E]",
    href: "mailto:rtdsecure004@gmail.com",
  },
  {
    icon: Phone,
    type: "Direct Hotline",
    detail: "+1 (888) TRACE-OPS",
    color: "[#38BDF8]",
    href: "",
  },
  {
    icon: MapPin,
    type: "HQ Coordinates",
    detail: "7th Fl, Cyber Hub, Austin TX, USA",
    color: "[#7C3AED]",
    href: "",
  },
]
