// Core data types for the portfolio

export interface NavItem {
  title: string;
  href: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string | 'Present';
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
  location: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'backend' | 'machine-learning' | 'other';
  featured: boolean;
  date: string;
  submissionCount?: number; // Adding optional submissionCount property
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: number;
  tags: string[];
}

export interface CodingProfile {
  platform: string;
  username: string;
  profileUrl: string;
  stats: {
    [key: string]: any;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  links: {
    github: string;
    linkedin: string;
    twitter?: string;
    [key: string]: string | undefined;
  };
  resume: string;
}
