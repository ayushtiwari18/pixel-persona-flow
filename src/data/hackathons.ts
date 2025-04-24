
export type HackathonResult = "Winner" | "Finalist" | "Participant";

export interface Hackathon {
  id: string;
  name: string;
  date: string;
  role: string;
  result: HackathonResult;
  learnings: string[];
  image?: string;
}

export const hackathons: Hackathon[] = [
  {
    id: "1",
    name: "Smart India Hackathon (SIH) 2024",
    date: "2024-12-01",
    role: "Full Stack Developer",
    result: "Participant",
    learnings: [
      "Collaborated on building a web platform to spread ocean literacy using gamification",
      "Integrated Unity-based games, virtual labs, and 3D models using MERN stack and Blender",
      "Improved teamwork, agile development, and real-world problem-solving skills",
    ],
    image: "/sih2024.jpg",
  },
  {
    id: "2",
    name: "HackByte 2.0 – IIITDM Jabalpur",
    date: "2024-10-15",
    role: "Team Leader",
    result: "Participant",
    learnings: [
      "Crafted innovative solutions with a focus on impactful tech",
      "Led a team and delegated responsibilities during fast-paced sprints",
      "Enhanced skills in brainstorming and rapid prototyping",
    ],
    image: "/hackbyte.jpg",
  },
  {
    id: "3",
    name: "Web-a-Thon – TechUtsav, GGITS",
    date: "2024-03-10",
    role: "Web Developer",
    result: "Participant",
    learnings: [
      "Showcased front-end and back-end capabilities in a timed challenge",
      "Built responsive and functional UIs using modern web tech",
      "Refined time management under pressure",
    ],
    image: "/webathon.jpg",
  },
  {
    id: "4",
    name: "IBM Hack Challenge 2023",
    date: "2023-12-05",
    role: "Developer",
    result: "Participant",
    learnings: [
      "Tackled real-world, industry-grade problems in a competitive environment",
      "Collaborated with peers to brainstorm and implement effective solutions",
      "Gained exposure to corporate expectations and solution pitching",
    ],
    image: "/ibm-hack.jpg",
  },
];
