"use client";

import React, { useEffect, useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import { DEFAULT_APPS, PROJECTS } from "@/config/projects";
import { getAppIcon } from "./StartMenu";
import { Wifi, Volume2 } from "lucide-react";

export default function Taskbar() {
  const {
    isStartOpen,
    toggleStartMenu,
    windows,
    activeWindowId,
    openApp,
    focusApp,
    minimizeApp,
  } = useOSStore();

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      );
      setCurrentDate(
        now.toLocaleDateString([], {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const pinnedApps = [...DEFAULT_APPS, ...PROJECTS];

  const handleAppClick = (appId: string) => {
    const win = windows[appId];
    if (win && win.isOpen) {
      if (activeWindowId === appId && !win.isMinimized) {
        minimizeApp(appId);
      } else {
        focusApp(appId);
      }
    } else {
      const config = pinnedApps.find((a) => a.id === appId);
      if (config) {
        openApp(config);
      }
    }
  };

  return (
    <footer className="h-12 w-full bg-[#1c1c1c]/80 backdrop-blur-2xl border-t border-white/10 z-40 fixed bottom-0 left-0 right-0 flex items-center justify-between px-3 select-none text-white">
      {/* Left empty spacer for balance */}
      <div className="w-32 hidden sm:block" />

      {/* Center Apps & Start Button */}
      <div className="flex items-center gap-1.5 mx-auto">
        {/* Windows 11 Start Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleStartMenu();
          }}
          aria-label="Start"
          title="Start"
          className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
            isStartOpen ? "bg-white/15" : "hover:bg-white/10"
          }`}
        >
          <svg
            className="w-5 h-5 text-cyan-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="2" y="2" width="9" height="9" rx="1" />
            <rect x="13" y="2" width="9" height="9" rx="1" />
            <rect x="2" y="13" width="9" height="9" rx="1" />
            <rect x="13" y="13" width="9" height="9" rx="1" />
          </svg>
        </button>

        {/* Pinned & Open Apps */}
        {pinnedApps.map((app) => {
          const win = windows[app.id];
          const isOpen = win?.isOpen ?? false;
          const isActive = activeWindowId === app.id && isOpen && !win?.isMinimized;

          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              title={app.title}
              className={`relative w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
                isActive
                  ? "bg-white/15"
                  : isOpen
                  ? "bg-white/10 hover:bg-white/15"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="text-cyan-400">{getAppIcon(app.icon, "w-5 h-5")}</div>

              {/* Running indicator pill/dot */}
              {isOpen && (
                <div
                  className={`absolute bottom-0.5 rounded-full transition-all ${
                    isActive
                      ? "w-4 h-1 bg-cyan-400"
                      : "w-1.5 h-1.5 bg-white/60"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right System Tray */}
      <div className="flex items-center gap-2 text-xs text-white/80">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 cursor-pointer">
          <Wifi className="w-3.5 h-3.5" />
          <Volume2 className="w-3.5 h-3.5" />
        </div>

        <div className="flex flex-col items-end px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer text-[11px] leading-tight text-white/90">
          <span>{currentTime || "12:00 PM"}</span>
          <span className="text-white/60 text-[10px]">{currentDate || "9/4/2026"}</span>
        </div>
      </div>
    </footer>
  );
}
