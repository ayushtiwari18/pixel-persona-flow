
import { Experience, Education } from "@/types";

export const experiences: Experience[] = [
  {
    title: "Full Stack Web Developer Intern",
    company: "Nullclass Edtech Pvt Ltd",
    location: "Remote",
    description:
      "Worked on a video streaming platform. Contributed to login security, device tracking, and payment gateway integration using the MERN stack. Enhanced UX with key feature implementations.",
    startDate: "2024-07",
    endDate: "2024-08",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "JavaScript",
      "Payment Gateway",
    ],
  },
  {
    title: "Cybersecurity Intern",
    company: "AICTE Virtual Internship",
    location: "Remote",
    description:
      "Designed and implemented a home network using Cisco Packet Tracer. Gained hands-on experience in cybersecurity and cloud security fundamentals.",
    startDate: "2024-05",
    endDate: "2024-07",
    technologies: ["Cisco Packet Tracer", "Network Security", "Cloud Security"],
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
      "AICTE accredited. Engaged in various projects, hackathons, and leadership roles. Current CGPA: 7.39",
    location: "Jabalpur, Madhya Pradesh, India",
  },
  {
    institution: "Joy Senior Secondary School",
    degree: "12th CBSE",
    field: "Science (PCM)",
    startDate: "2020",
    endDate: "2022",
    description:
      "Completed 12th Grade with 87.32% marks. Participated in science exhibitions and Olympiads.",
    location: "Jabalpur, Madhya Pradesh, India",
  },
  {
    institution: "Joy Senior Secondary School",
    degree: "10th CBSE",
    field: "General Curriculum",
    startDate: "2018",
    endDate: "2020",
    description:
      "Scored 83.62%. School topper in multiple subjects and actively participated in extracurricular activities.",
    location: "Jabalpur, Madhya Pradesh, India",
  },
];
