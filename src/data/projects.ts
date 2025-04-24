import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Marine Minds – Ocean Literacy Platform",
    description:
      "A gamified platform promoting ocean literacy. Features Unity-based games, 3D models, virtual labs, and interactive simulations built using the MERN stack, Three.js, D3.js, and Blender.",
    image: "/marine-minds.png", // Replace with actual image path
    demoUrl: "https://mm-qgbd.onrender.com/",
    githubUrl: "https://github.com/ayushtiwari18",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Three.js",
      "Blender",
      "Unity",
      "D3.js",
    ],
    category: "web",
    featured: true,
    date: "2024-12-01",
    submissionCount: 60,
  },
  {
    id: "2",
    title: "Wanderlust – Travel Platform",
    description:
      "Full-stack travel booking web app inspired by Airbnb. Integrated user authentication, image storage (Cloudinary), and map-based listing view.",
    image: "/wanderlust.png",
    demoUrl: "https://wanderlust1-6qas.onrender.com/listings",
    githubUrl: "https://github.com/ayushtiwari18",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "Bootstrap",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    category: "web",
    featured: true,
    date: "2024-06-30",
    submissionCount: 35,
  },
  {
    id: "3",
    title: "Simon-Says Color Memory Game",
    description:
      "A simple web-based memory game challenging users to remember sequences of colors. Built with responsive UI for a smooth cross-device experience.",
    image: "/simon-says.png",
    demoUrl: "http://8.208.100.87/Simon%20says/index.html",
    githubUrl: "https://github.com/ayushtiwari18",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "web",
    featured: false,
    date: "2024-05-10",
    submissionCount: 18,
  },
  {
    id: "4",
    title: "Personal Portfolio",
    description:
      "Responsive portfolio website showcasing projects, skills, blogs, and resume. Built with HTML, CSS, JavaScript and deployed on Netlify.",
    image: "/portfolio.png",
    demoUrl: "https://ayusht.netlify.app/",
    githubUrl: "https://github.com/ayushtiwari18",
    technologies: ["HTML", "CSS", "JavaScript", "Netlify"],
    category: "web",
    featured: false,
    date: "2024-04-01",
    submissionCount: 22,
  },
];
