
import { Experience, Education } from "@/types";

export const experiences: Experience[] = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    description: "Led the development of multiple web applications using React, Next.js, and TypeScript. Implemented modern UI/UX designs and optimized performance across all projects. Mentored junior developers and conducted code reviews.",
    startDate: "2022-01",
    endDate: "Present",
    technologies: ["React", "Next.js", "TypeScript", "GraphQL", "Redux", "Tailwind CSS"]
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Group",
    location: "New York, NY",
    description: "Developed and maintained full-stack web applications using MERN stack. Collaborated with designers and product managers to implement new features and improve user experience. Implemented CI/CD pipelines to improve deployment efficiency.",
    startDate: "2019-06",
    endDate: "2021-12",
    technologies: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "AWS"]
  },
  {
    title: "Web Developer",
    company: "Creative Web Agency",
    location: "Boston, MA",
    description: "Created responsive websites for various clients across multiple industries. Worked closely with design team to implement pixel-perfect UI. Managed content management systems and client databases.",
    startDate: "2017-03",
    endDate: "2019-05",
    technologies: ["HTML/CSS", "JavaScript", "PHP", "WordPress", "MySQL"]
  },
  {
    title: "Frontend Developer Intern",
    company: "StartUp Labs",
    location: "Seattle, WA",
    description: "Assisted in developing user interfaces for web applications. Gained experience in modern frontend frameworks and responsive design principles. Participated in agile development cycles and product planning.",
    startDate: "2016-05",
    endDate: "2016-12",
    technologies: ["HTML/CSS", "JavaScript", "jQuery", "Bootstrap"]
  }
];

export const education: Education[] = [
  {
    institution: "Massachusetts Institute of Technology",
    degree: "Master's",
    field: "Computer Science",
    startDate: "2014",
    endDate: "2016",
    description: "Focused on human-computer interaction and web technologies. Completed thesis on optimizing user experience in web applications.",
    location: "Cambridge, MA"
  },
  {
    institution: "University of California, Berkeley",
    degree: "Bachelor's",
    field: "Computer Science",
    startDate: "2010",
    endDate: "2014",
    description: "Graduated with honors. Participated in multiple hackathons and web development competitions.",
    location: "Berkeley, CA"
  }
];
