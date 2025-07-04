import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Marine Minds – Ocean Literacy Platform",
    description:
      "An immersive platform promoting ocean literacy through gamified learning, virtual lab simulations, and Unity-based exploration. Combines scientific data visualization with interactive 3D environments.",
    image: "/Projects/marine-minds.jpg",
    demoUrl: "https://mm-qgbd.onrender.com/",
    githubUrl: "https://github.com/ayushtiwari18/MM",
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Three.js",
      "D3.js",
      "p5.js",
      "Unity",
      "Blender",
      "GSAP",
    ],
    category: "web",
    featured: true,
    date: "2024-12-01",
    submissionCount: 60,
  },
  {
    id: "2",
    title: "GameON – Sports Tournament Management System",
    description:
      "A centralized platform for organizing and tracking sports tournaments. Supports real-time match updates, player analytics, and notifications using Socket.io and Azure SQL.",
    image: "/Projects/gameon.jpg",
    demoUrl: "https://game-on.me/",
    githubUrl: "https://github.com/ayushtiwari18/GameON",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "Azure SQL",
      "Socket.io",
      "Tailwind CSS",
      "Vite",
      "JWT",
      "bcrypt",
      "MUI",
    ],
    category: "web",
    featured: true,
    date: "2025-03-01",
    submissionCount: 48,
  },
  {
    id: "3",
    title: "EchoMeet – Zoom-Inspired Video Conferencing",
    description:
      "A MERN stack-based video conferencing app with screen sharing, real-time chat, and meeting room generation using Socket.io. Designed as a lightweight Zoom alternative.",
    image: "/Projects/echomeet.jpg",
    demoUrl: "https://echomeet-at.netlify.app/",
    githubUrl: "https://github.com/ayushtiwari18/EchoMeet",
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Socket.io",
      "WebRTC",
      "CSS",
    ],
    category: "web",
    featured: false,
    date: "2024-07-01",
    submissionCount: 26,
  },
  {
    id: "4",
    title: "AuroraFlow – YouTube-Inspired Video Streaming App",
    description:
      "A responsive frontend-only app using React.js and RapidAPI for streaming real-time video content. Features category filters, search functionality, and dynamic rendering.",
    image: "/Projects/auroraflow.jpg",
    demoUrl: "https://aurora-flow.netlify.app/",
    githubUrl: "https://github.com/ayushtiwari18/AuroraFlow",
    technologies: ["React.js", "CSS", "RapidAPI", "Netlify"],
    category: "web",
    featured: false,
    date: "2024-06-15",
    submissionCount: 20,
  },
  {
    id: "5",
    title: "Wanderlust – Travel Booking Platform",
    description:
      "Airbnb-style platform supporting listing creation, booking flow, reviews, and map-based property discovery. Implements Passport.js, session handling, and Cloudinary for media uploads.",
    image: "/Projects/wanderlust.png",
    demoUrl: "https://wanderlust-chlq.onrender.com/listings",
    githubUrl: "https://github.com/ayushtiwari18/Wanderlust_",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Bootstrap",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Passport.js",
      "Cloudinary",
    ],
    category: "web",
    featured: true,
    date: "2024-06-01",
    submissionCount: 35,
  },
  {
    id: "6",
    title: "Simon-Says – Color Memory Game",
    description:
      "Classic color memory game using vanilla JavaScript. Includes animated sequences, level progression, and auditory feedback for engagement across devices.",
    image: "/Projects/simon-says.jpg",
    demoUrl: "https://simon-si-game.netlify.app/",
    githubUrl: "https://github.com/ayushtiwari18/Simon-Says-Game",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "web",
    featured: false,
    date: "2024-05-10",
    submissionCount: 18,
  },
  {
    id: "7",
    title: "Personal Portfolio Website",
    description:
      "Clean and responsive personal site showcasing skills, projects, and resume. Designed with simplicity and accessibility in mind.",
    image: "/portfolio.png",
    demoUrl: "https://ayushtiwaritech.netlify.app/",
    githubUrl: "https://github.com/ayushtiwari18",
    technologies: ["HTML", "CSS", "JavaScript", "Netlify"],
    category: "web",
    featured: false,
    date: "2024-04-01",
    submissionCount: 22,
  },
];
