"use client";

import React, { useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import { DEFAULT_APPS, PROJECTS } from "@/config/projects";
import { AppConfig } from "@/types/os";
import {
  Search,
  Lock,
  User,
  Globe,
  Bot,
  Timer,
  AppWindow,
} from "lucide-react";

export function getAppIcon(iconName: string, className = "w-6 h-6") {
  switch (iconName) {
    case "user":
      return <User className={className} />;
    case "globe":
      return <Globe className={className} />;
    case "bot":
      return <Bot className={className} />;
    case "timer":
      return <Timer className={className} />;
    default:
      return <AppWindow className={className} />;
  }
}

export default function StartMenu() {
  const { isStartOpen, openApp, lock } = useOSStore();
  const [searchQuery, setSearchQuery] = useState("");

  if (!isStartOpen) return null;

  const allApps: AppConfig[] = [...DEFAULT_APPS, ...PROJECTS];
  const filteredApps = searchQuery.trim()
    ? allApps.filter((app) =>
        app.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allApps;

  const handleAppClick = (app: AppConfig) => {
    openApp(app);
  };

  return (
    <div
      data-testid="start-menu"
      className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[580px] max-w-[95vw] h-[600px] max-h-[80vh] bg-[#202020]/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden text-white animate-in fade-in slide-in-from-bottom-4 duration-150 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Bar */}
      <div className="p-6 pb-4">
        <div className="relative flex items-center bg-[#2d2d2d]/90 rounded-full border border-white/10 px-4 py-2 text-sm focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
          <Search className="w-4 h-4 text-white/50 mr-2.5 shrink-0" />
          <input
            type="text"
            placeholder="Type here to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-white/40 outline-none text-sm"
            autoFocus
          />
        </div>
      </div>

      {/* Pinned Section */}
      <div className="flex-1 overflow-y-auto px-6 py-2">
        <div className="flex items-center justify-between pb-3">
          <span className="text-xs font-semibold tracking-wide text-white/90">
            Pinned
          </span>
          <span className="text-[11px] bg-white/10 hover:bg-white/15 px-2 py-0.5 rounded text-white/70 cursor-pointer">
            All apps &gt;
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-2">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-white/10 transition-colors group text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-600/30 to-blue-600/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform mb-2">
                {getAppIcon(app.icon, "w-5 h-5")}
              </div>
              <span className="text-xs text-white/80 line-clamp-1 group-hover:text-white">
                {app.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Profile Bar */}
      <div className="h-14 bg-[#181818]/90 border-t border-white/10 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-xs font-bold text-white shadow">
            U
          </div>
          <span className="text-sm font-medium text-white/90">USER</span>
        </div>

        <button
          onClick={lock}
          aria-label="Lock"
          title="Lock"
          className="p-2 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-colors"
        >
          <Lock className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
