import { AppConfig } from "@/types/os";

export const DEFAULT_APPS: AppConfig[] = [
  {
    id: "about-me",
    title: "About Rafito Juan",
    icon: "user",
    appType: "about",
    description: "Bio, experiences, technical skills and contact info",
    defaultSize: { width: 720, height: 540 },
  },
];

export const PROJECTS: AppConfig[] = [
  {
    id: "portfolio-v2",
    title: "Portfolio v2",
    icon: "globe",
    appType: "project",
    url: "https://rafitojuan.vercel.app",
    description: "Personal portfolio website v2",
    tags: ["Svelte", "TailwindCSS", "Vite"],
    defaultSize: { width: 960, height: 600 },
  },
  {
    id: "juan-ai",
    title: "Juan AI Assistant",
    icon: "bot",
    appType: "project",
    url: "https://juan-ai.vercel.app",
    description: "Interactive AI Chatbot assistant",
    tags: ["Next.js", "OpenAI", "TailwindCSS"],
    defaultSize: { width: 900, height: 620 },
  },
  {
    id: "pomore",
    title: "Pomore Focus",
    icon: "timer",
    appType: "project",
    url: "https://pomore.vercel.app",
    description: "Productivity and Pomodoro timer application",
    tags: ["React", "TypeScript", "PWA"],
    defaultSize: { width: 800, height: 540 },
  },
];
