"use client";

import React, { useState } from "react";
import { Folder, HardDrive, FileCode, ExternalLink, ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { PROJECTS } from "@/config/projects";
import { useOSStore } from "@/store/useOSStore";

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState("This PC > Juan Projects");
  const { openApp } = useOSStore();

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white/90 text-sm select-none font-sans">
      {/* Ribbon / Toolbar */}
      <div className="h-10 border-b border-white/10 px-3 flex items-center gap-3 bg-[#252525]/80">
        <div className="flex items-center gap-1 text-white/60">
          <button className="p-1 hover:bg-white/10 rounded cursor-pointer disabled:opacity-40" title="Back">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded cursor-pointer disabled:opacity-40" title="Forward">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded cursor-pointer" title="Refresh">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-3 py-1 text-xs text-white/80 flex items-center gap-2">
          <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
          <span>{currentPath}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Pane */}
        <aside className="w-48 bg-[#181818]/90 border-r border-white/10 p-2 space-y-1 text-xs text-white/70">
          <div className="px-2 py-1 font-semibold text-white/40 uppercase tracking-wider text-[10px]">
            Quick Access
          </div>
          <button
            onClick={() => setCurrentPath("This PC > Juan Projects")}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 text-white/90 text-left cursor-pointer"
          >
            <Folder className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
            <span>Juan Projects</span>
          </button>
          <button
            onClick={() => setCurrentPath("This PC > Desktop")}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 text-white/90 text-left cursor-pointer"
          >
            <Folder className="w-4 h-4 text-cyan-500 fill-cyan-500/20" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setCurrentPath("This PC > Documents")}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 text-white/90 text-left cursor-pointer"
          >
            <Folder className="w-4 h-4 text-blue-400 fill-blue-400/20" />
            <span>Documents</span>
          </button>

          <div className="pt-3 px-2 py-1 font-semibold text-white/40 uppercase tracking-wider text-[10px]">
            Drives
          </div>
          <div className="flex items-center gap-2 px-2 py-1 text-white/80">
            <HardDrive className="w-4 h-4 text-gray-400" />
            <span>OS (C:) - 120 GB free</span>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onDoubleClick={() => openApp(proj)}
                className="group flex flex-col items-center p-3 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 cursor-pointer transition-all text-center"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <img
                    src={proj.icon}
                    alt={proj.title}
                    className="w-10 h-10 object-contain drop-shadow"
                    draggable={false}
                  />
                </div>
                <span className="text-xs font-medium text-white/90 line-clamp-1">{proj.title}</span>
                <span className="text-[10px] text-white/50">{proj.tags?.[0] || "Web App"}</span>
              </div>
            ))}

            <div className="flex flex-col items-center p-3 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 cursor-pointer transition-all text-center">
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <FileCode className="w-10 h-10 text-cyan-400" />
              </div>
              <span className="text-xs font-medium text-white/90">readme.txt</span>
              <span className="text-[10px] text-white/50">Text Document</span>
            </div>
          </div>
        </main>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#181818] border-t border-white/10 px-3 flex items-center text-[11px] text-white/50 justify-between">
        <span>{PROJECTS.length + 1} items</span>
        <span>juanOS File System</span>
      </div>
    </div>
  );
}
