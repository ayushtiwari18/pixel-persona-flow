import { Experience, Education } from "@/types";

export const experiences: Experience[] = [
  {
    title: "Full Stack Web Developer Intern",
    company: "Nullclass Edtech Pvt Ltd",
    location: "Remote",
    description:
      "Developed and deployed MERN-based full-stack web applications. Integrated secure login with JWT & OAuth, implemented device tracking, and integrated Stripe/PayPal for seamless payments. Enhanced video streaming performance by 30%.",
    startDate: "2024-07",
    endDate: "2024-08",
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT",
      "OAuth",
      "Stripe",
      "PayPal",
    ],
  },
  {
    title: "Cloud Network Intern",
    company: "AICTE Virtual Internship 2024",
    location: "Remote",
    description:
      "Analyzed network topologies using Cisco Packet Tracer, identified vulnerabilities, and proposed countermeasures. Hands-on exposure to VLANs, IDS, firewalls, and cybersecurity protocols including RBAC and LDAP.",
    startDate: "2024-05",
    endDate: "2024-07",
    technologies: [
      "Cisco Packet Tracer",
      "Nmap",
      "OpenVAS",
      "RBAC",
      "RADIUS",
      "VLAN",
      "Firewall",
    ],
  },
  {
    title: "Cloud Security Intern",
    company: "Cisco Networking Academy (AICTE)",
    location: "Remote",
    description:
      "Designed and implemented secure cloud infrastructure using AWS VPC and IAM policies. Configured private subnets, VPN access, and security monitoring for academic record management.",
    startDate: "2023-05",
    endDate: "2023-07",
    technologies: [
      "AWS VPC",
      "IAM",
      "RBAC",
      "MFA",
      "SSL/TLS",
      "Cloud Security",
      "Monitoring",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Gyan Ganga Institute of Technology and Sciences",
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    startDate: "2022",
    endDate: "2026",
    description:
      "NBA-accredited program. Active participant in hackathons, research projects, and developer communities. Current CGPA: 7.54.",
    location: "Jabalpur, Madhya Pradesh, India",
  },
  {
    institution: "Joy Senior Secondary School",
    degree: "12th CBSE",
    field: "Science (Physics, Chemistry, Math)",
    startDate: "2020",
    endDate: "2022",
    description:
      "Secured 82.32% marks. Participated in science exhibitions and technology outreach programs.",
    location: "Jabalpur, Madhya Pradesh, India",
  },
  {
    institution: "Joy Senior Secondary School",
    degree: "10th CBSE",
    field: "General Curriculum",
    startDate: "2018",
    endDate: "2020",
    description:
      "Scored 83.62%. Demonstrated academic excellence and contributed actively in extracurricular clubs.",
    location: "Jabalpur, Madhya Pradesh, India",
  },
];
