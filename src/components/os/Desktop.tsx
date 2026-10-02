"use client";

import React from "react";
import { useOSStore } from "@/store/useOSStore";
import { DEFAULT_APPS, PROJECTS, SYSTEM_APPS } from "@/config/projects";
import { AppConfig } from "@/types/os";
import StartMenu, { getAppIcon } from "./StartMenu";
import Taskbar from "./Taskbar";
import Window from "./Window";
import AboutMe from "@/components/apps/AboutMe";
import ProjectViewer from "@/components/apps/ProjectViewer";
import FileExplorer from "@/components/apps/FileExplorer";
import SettingsApp from "@/components/apps/SettingsApp";
import TerminalApp from "@/components/apps/TerminalApp";
import StoreApp from "@/components/apps/StoreApp";
import RecycleBinApp from "@/components/apps/RecycleBinApp";
export default function Desktop() {
  const { windows, openApp, closeStartMenu } = useOSStore();

  const recycleBinApp = SYSTEM_APPS.find((a) => a.id === "recycle-bin");
  const fileExplorerApp = SYSTEM_APPS.find((a) => a.id === "file-explorer");
  const terminalApp = SYSTEM_APPS.find((a) => a.id === "terminal");
  const settingsApp = SYSTEM_APPS.find((a) => a.id === "settings");

  const desktopShortcuts: AppConfig[] = [
    ...(recycleBinApp ? [recycleBinApp] : []),
    ...(fileExplorerApp ? [fileExplorerApp] : []),
    ...DEFAULT_APPS,
    ...PROJECTS,
    ...(terminalApp ? [terminalApp] : []),
    ...(settingsApp ? [settingsApp] : []),
  ];

  const handleShortcutDoubleClick = (app: AppConfig) => {
    openApp(app);
  };

  const renderAppContent = (win: (typeof windows)[string]) => {
    switch (win.appType) {
      case "about":
        return <AboutMe />;
      case "explorer":
        return <FileExplorer />;
      case "settings":
        return <SettingsApp />;
      case "terminal":
        return <TerminalApp />;
      case "store":
        return <StoreApp />;
      case "bin":
        return <RecycleBinApp />;
      default:
        return <ProjectViewer url={win.url} title={win.title} />;
    }
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
            className="w-20 h-24 flex flex-col items-center justify-start gap-1 p-1 rounded hover:bg-white/10 hover:backdrop-blur-xs focus:bg-white/20 focus:border focus:border-white/30 text-center transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform drop-shadow-md">
              {getAppIcon(app.icon, "w-11 h-11")}
            </div>
            <span className="text-[11px] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-normal line-clamp-2 leading-tight px-1 select-none">
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
