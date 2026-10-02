export type AppType =
  | "project"
  | "about"
  | "browser"
  | "explorer"
  | "settings"
  | "terminal"
  | "store"
  | "bin"
  | "calculator";

export interface AppConfig {
  id: string;
  title: string;
  icon: string;
  appType: AppType;
  description?: string;
  url?: string;
  tags?: string[];
  defaultSize?: { width: number; height: number };
}

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  appType: AppType;
  url?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
}
