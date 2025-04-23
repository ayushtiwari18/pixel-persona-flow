
import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product management, cart functionality, and payment processing.",
    image: "/placeholder.svg",
    demoUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/janedeveloper/ecommerce",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe"],
    category: "web",
    featured: true,
    date: "2023-08-15",
    submissionCount: 24
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates. Includes features like task assignment, progress tracking, and team communication.",
    image: "/placeholder.svg",
    demoUrl: "https://taskmanager-demo.com",
    githubUrl: "https://github.com/janedeveloper/taskmanager",
    technologies: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    category: "web",
    featured: true,
    date: "2023-05-10",
    submissionCount: 15
  },
  {
    id: "3",
    title: "AI Content Generator",
    description: "A content generation tool that uses machine learning to create blog posts, social media content, and marketing copy based on user inputs and preferences.",
    image: "/placeholder.svg",
    githubUrl: "https://github.com/janedeveloper/ai-content",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    category: "machine-learning",
    featured: true,
    date: "2023-02-28",
    submissionCount: 32
  },
  {
    id: "4",
    title: "Fitness Tracking Mobile App",
    description: "A mobile application for tracking workouts, nutrition, and fitness goals. Includes visualization of progress and personalized recommendations.",
    image: "/placeholder.svg",
    githubUrl: "https://github.com/janedeveloper/fitness-app",
    technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
    category: "mobile",
    featured: false,
    date: "2022-11-05",
    submissionCount: 8
  },
  {
    id: "5",
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current conditions and forecasts for multiple locations. Includes interactive maps and data visualization.",
    image: "/placeholder.svg",
    demoUrl: "https://weather-demo.com",
    githubUrl: "https://github.com/janedeveloper/weather",
    technologies: ["JavaScript", "HTML/CSS", "OpenWeatherMap API", "Chart.js"],
    category: "web",
    featured: false,
    date: "2022-09-20",
    submissionCount: 12
  },
  {
    id: "6",
    title: "Microservices Architecture",
    description: "A demonstration of microservices architecture with Docker and Kubernetes. Includes service discovery, load balancing, and fault tolerance.",
    image: "/placeholder.svg",
    githubUrl: "https://github.com/janedeveloper/microservices",
    technologies: ["Docker", "Kubernetes", "Node.js", "Go", "Redis"],
    category: "backend",
    featured: false,
    date: "2022-07-12",
    submissionCount: 5
  }
];
