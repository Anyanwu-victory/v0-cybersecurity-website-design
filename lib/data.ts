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
    href: `https://www.linkedin.com/company/111051146/admin/dashboard/`,
    icon: IconBrandLinkedin,
  },
  {
    name: "Tiktok",
    href: "https://www.tiktok.com/@redtraced.securit?_r=1&_t=ZS-92n1s803UVp",
    icon: IconBrandTiktok,
  },
  {
    name: "X",
    href: "https://x.com/RSecure41760",
    icon: IconBrandX,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/rtdsglobal",
    icon: IconBrandInstagram,
  },

]

export const homePageIntroSectionText = ` "At RedTrace-D Sentinel, We believe true security starts with awareness. 
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


//Events page data
export const events = [
  {
    id: "cybersecurity-for-begninner",
    slug: "cybersecurity-for-begninner",
    title: "Cybersecurity For Beginner- Cohort 1",
    date: "October 11, 2025",
    time: "09:00 AM - 10:30 AM WAT",
    location: "Online / Virtual",
    eventType: "virtual",
    description: "A deep dive into the fundamentals of cybersecurity for aspiring professionals.",
    tag: "WORKSHOP",
    duration: "4 weeks",
    audience: "Beginner",
    price: "N1,000",
    fullDescription:
      "This comprehensive 4-week workshop is designed for individuals new to cybersecurity.*Special Early Bird Offer*! Be among the *first 15 people* to register for our Cybersecurity for Beginners training and secure your spot at just *₦1,000* instead of ₦5,000. Offer runs from *28th September – 5th October 2025* Standard fee resumes at ₦5,000 from *6th – 9th October 2025*. Don’t miss this chance to start your cybersecurity journey with hands-on training, expert guidance, and a Certificate of Completion all at an unbeatable offer.",
    learningOutcomes: [
      "Learn Online Safety and Best Practices",
      "Understand Common Cyber Threats",
      "Hands-on security exercises(Laptop and mobile friendly)",
      "Certificate of Completion",
    ],
    agenda: [
      {
        time: "Oct 11",
        title: "Resources",
        duration: "30 min",
        description: "Industry overview and zero-trust evolution",
        resourcesList: [
          {
            type: "video",
            link: "https://drive.google.com/file/d/1LliM2mkyw7XbmrTD57crOP4xbdu7_ks6/view?usp=drivesdk"

          },
        ],
      },
      {
        time: "Oct 17",
        title: "Resources",
        duration: "1 hour",
        description: "",
        resourcesList: [
          {
            type: "video",
            link: "https://drive.google.com/file/d/1qXXEXf4QwnkejoAcpnbVhuc3-fucvp72/view?usp=drivesdk"

          },
          {
            type: "Kali documentation",
            link: "https://www.kali.org/docs/",
          },
          {
            type: "Kali tutorial",
            link: "https://ubuntu.com/tutorials/command-line-for-beginners"

          },
          {
            type: "Microsoft tutorial",
            link: "https://www.microsoft.com/en-us/security/business"

          },
        ],
      },
      {
        time: "Oct 18",
        title: "",
        duration: "35 min",
        description: "",
        resourcesList: [
          {
            type: "video",
            link: "https://drive.google.com/file/d/1mi4SJUqmw-vmnkLo5UmKKy9egEAw072l/view?usp=drivesdk"

          },
        ],

      },
      {
        time: "Oct 24",
        title: "",
        duration: "1 hour",
        description: "",
        resourcesList: [
          {
            type: "video",
            link: "https://drive.google.com/file/d/1fgWKUKI_tzBydo1hnaFzEbS1FTFumCnM/view?usp=drivesdk"

          },
        ],

      },
      {
        time: "Oct 25",
        title: "",
        duration: "35 min",
        description: "",
        resourcesList: [
          {
            type: "video",
            link: "https://drive.google.com/file/d/1ZOIsfr0bi8-k9IoQF1RBBuC9qZzcJoFu/view?usp=drivesdk"

          },
        ],

      },
      {
        time: "Oct 31",
        title: "",
        duration: "1 hour",
        description: "",
        resourcesList: [
          {
            type: "video",
            link: "https://drive.google.com/file/d/1gEDtO8xHGPaVpydC0Z7ovPojeqwjq99C/view?usp=drivesdk"

          },
        ],

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
    roles: ["Everyoe in tech", "Software Engineer"],
    registrationLink: "#",
    calendarLink: "#",
  },
  {
    id: "cyber-security-awareness",
    slug: "cyber-security-awareness",
    title: "Defend the Click: Cyber Security Awareness 1.0",
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

]

// Services detail data is imported from servicesDetailsData.ts

export const contactMethods = [
  {
    icon: Mail,
    type: "Contact Email",
    detail: "rtdsecure004@gmail.com",
    color: "[#E11D2E]",
    href: "mailto:rtdsecure004@gmail.com",
  },
  {
    icon: Phone,
    type: "Direct Hotline",
    detail: "+(234) 810 628 3100",
    color: "[#38BDF8]",
    href: "tel:+2348106283100",
  },
  {
    icon: MapPin,
    type: "HQ Coordinates",
    detail: "Abuja, Nigeria",
    color: "[#7C3AED]",
    href: "https://maps.app.goo.gl/5wwBxxQe9xJY1dhz6",
  },
]
