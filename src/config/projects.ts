import { AppConfig } from "@/types/os";

export const DEFAULT_APPS: AppConfig[] = [
  {
    id: "about-me",
    title: "About Rafito Juan",
    icon: "/icons/notepad.png",
    appType: "about",
    description: "Bio, experiences, technical skills and contact info",
    defaultSize: { width: 750, height: 550 },
  },
];

export const SYSTEM_APPS: AppConfig[] = [
  {
    id: "file-explorer",
    title: "File Explorer",
    icon: "/icons/explorer.png",
    appType: "explorer",
    description: "Browse files and juanOS projects",
    defaultSize: { width: 840, height: 560 },
  },
  {
    id: "settings",
    title: "Settings",
    icon: "/icons/settings.png",
    appType: "settings",
    description: "System preferences, personalization, and display settings",
    defaultSize: { width: 860, height: 580 },
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "/icons/terminal.png",
    appType: "terminal",
    description: "juanOS Command Prompt & Terminal",
    defaultSize: { width: 780, height: 480 },
  },
  {
    id: "microsoft-store",
    title: "Microsoft Store",
    icon: "/icons/store.png",
    appType: "store",
    description: "Discover tools, apps, and featured projects",
    defaultSize: { width: 920, height: 600 },
  },
];

export const PROJECTS: AppConfig[] = [
  {
    id: "portfolio-v2",
    title: "Portfolio v2",
    icon: "/icons/edge.png",
    appType: "project",
    url: "https://portfolio.rafitojuan.my.id",
    description: "Personal portfolio website v2",
    tags: ["Svelte", "TailwindCSS", "Vite"],
    defaultSize: { width: 960, height: 600 },
  },
  {
    id: "juan-ai",
    title: "Juan AI Assistant",
    icon: "/icons/copilot.svg",
    appType: "project",
    url: "https://ai.rafitojuan.my.id",
    description: "Interactive AI Chatbot assistant",
    tags: ["Next.js", "OpenAI", "TailwindCSS"],
    defaultSize: { width: 900, height: 620 },
  },
  {
    id: "pomore",
    title: "Pomore Focus",
    icon: "/icons/alarm.png",
    appType: "project",
    url: "https://pomore.rafitojuan.my.id",
    description: "Productivity and Pomodoro timer application",
    tags: ["React", "TypeScript", "PWA"],
    defaultSize: { width: 800, height: 540 },
  },
];
