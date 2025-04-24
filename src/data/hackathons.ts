
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
    name: "TechCrunch Disrupt Hackathon 2024",
    date: "2024-03-15",
    role: "Full Stack Developer",
    result: "Winner",
    learnings: [
      "Built a real-time collaboration tool using WebRTC",
      "Implemented serverless architecture with AWS Lambda",
      "Led a team of 4 developers"
    ],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: "2",
    name: "Global AI Hackathon",
    date: "2024-02-01",
    role: "ML Engineer",
    result: "Finalist",
    learnings: [
      "Developed a computer vision model for real-time object detection",
      "Optimized model performance using TensorFlow",
    ],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  }
];
