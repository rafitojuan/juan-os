"use client";

import React from "react";
import { useOSStore } from "@/store/useOSStore";
import { DEFAULT_APPS, PROJECTS } from "@/config/projects";
import { AppConfig } from "@/types/os";
import StartMenu, { getAppIcon } from "./StartMenu";
import Taskbar from "./Taskbar";
import Window from "./Window";
import AboutMe from "@/components/apps/AboutMe";
import ProjectViewer from "@/components/apps/ProjectViewer";

export default function Desktop() {
  const { windows, openApp, closeStartMenu } = useOSStore();

  const desktopShortcuts: AppConfig[] = [...DEFAULT_APPS, ...PROJECTS];

  const handleShortcutDoubleClick = (app: AppConfig) => {
    openApp(app);
  };

  const renderAppContent = (win: (typeof windows)[string]) => {
    if (win.appType === "about") {
      return <AboutMe />;
    }
    return <ProjectViewer url={win.url} title={win.title} />;
  };

  return (
    <div
      data-testid="desktop-surface"
      onClick={closeStartMenu}
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center select-none"
      style={{
        backgroundImage: "url('/wallpaper.jpg')",
        backgroundColor: "#0d1b2a",
      }}
    >
      {/* Desktop shortcuts grid */}
      <div className="p-4 grid grid-flow-col grid-rows-6 gap-4 w-max h-[calc(100vh-48px)]">
        {desktopShortcuts.map((app) => (
          <button
            key={app.id}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleShortcutDoubleClick(app);
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-20 h-22 flex flex-col items-center justify-center gap-1 p-1 rounded hover:bg-white/15 focus:bg-white/20 focus:border focus:border-white/30 text-center transition-colors group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-600/30 to-blue-600/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-md">
              {getAppIcon(app.icon, "w-6 h-6")}
            </div>
            <span className="text-xs text-white drop-shadow font-normal line-clamp-2 leading-tight">
              {app.title}
            </span>
          </button>
        ))}
      </div>

      {/* Windows Layer */}
      {Object.values(windows).map((win) => {
        if (!win.isOpen) return null;
        return (
          <Window key={win.id} window={win}>
            {renderAppContent(win)}
          </Window>
        );
      })}

      {/* Start Menu */}
      <StartMenu />

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
