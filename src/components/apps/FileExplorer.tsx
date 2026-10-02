"use client";

import React, { useState } from "react";
import {
  Folder,
  HardDrive,
  FileCode,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  RefreshCw,
  Plus,
  X,
  Scissors,
  Copy,
  ClipboardPaste,
  Edit2,
  Share2,
  Trash2,
  SlidersHorizontal,
  LayoutGrid,
  Search,
  ChevronRight,
  Home,
  Star,
  Monitor,
  Download,
  FileText,
  Image,
} from "lucide-react";
import { PROJECTS } from "@/config/projects";
import { useOSStore } from "@/store/useOSStore";

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState("This PC > Juan Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const { openApp } = useOSStore();

  const filteredProjects = searchQuery.trim()
    ? PROJECTS.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : PROJECTS;

  return (
    <div className="flex flex-col h-full bg-[#191919] text-white/90 text-xs select-none font-sans overflow-hidden">
      {/* 1. File Explorer 24H2 Tabs Header */}
      <div className="h-10 bg-[#141414] flex items-end px-2 pt-1 border-b border-black/40 gap-1">
        {/* Active Tab */}
        <div className="h-9 px-3 flex items-center gap-2 bg-[#232323] rounded-t-lg border-t border-x border-white/10 text-xs font-medium text-white max-w-[200px] shadow-sm">
          <img src="/icons/explorer.png" alt="" className="w-3.5 h-3.5 object-contain" />
          <span className="truncate flex-1">Juan Projects</span>
          <button className="w-4 h-4 rounded hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white">
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Inactive Tab */}
        <div className="h-8 px-3 flex items-center gap-2 text-white/60 hover:bg-white/5 rounded-t-lg text-xs max-w-[150px] cursor-pointer">
          <Home className="w-3.5 h-3.5 text-cyan-400" />
          <span className="truncate flex-1">Home</span>
        </div>

        {/* New Tab Button */}
        <button
          className="w-7 h-7 mb-1 flex items-center justify-center rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          title="Add new tab (Ctrl+T)"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Modern Address Bar & Search Row */}
      <div className="h-11 border-b border-white/10 px-3 flex items-center gap-2 bg-[#202020]">
        <div className="flex items-center gap-1 text-white/60">
          <button className="p-1.5 hover:bg-white/10 rounded-md cursor-not-allowed opacity-40" title="Back">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-md cursor-not-allowed opacity-40" title="Forward">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentPath("This PC")}
            className="p-1.5 hover:bg-white/10 hover:text-white rounded-md cursor-pointer"
            title="Up to 'This PC'"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:bg-white/10 hover:text-white rounded-md cursor-pointer" title="Refresh">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Breadcrumb Address Bar (satisfies test contract: "This PC > Juan Projects") */}
        <div className="flex-1 bg-[#1a1a1a] hover:bg-[#161616] border border-white/10 rounded-md px-3 py-1.5 text-xs text-white/80 flex items-center gap-2">
          <HardDrive className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate font-medium">{currentPath}</span>
        </div>

        {/* Search Bar */}
        <div className="w-48 sm:w-60 bg-[#1a1a1a] border border-white/10 rounded-md px-2.5 py-1.5 flex items-center gap-2 text-xs">
          <Search className="w-3.5 h-3.5 text-white/40 shrink-0" />
          <input
            type="text"
            placeholder="Search Juan Projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder-white/40 text-xs"
          />
        </div>
      </div>

      {/* 3. Windows 11 Fluent Command Bar */}
      <div className="h-10 border-b border-white/10 px-3 flex items-center gap-1 bg-[#1d1d1d] text-white/80 overflow-x-auto scrollbar-none text-[11px]">
        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-white/10 text-white font-medium cursor-pointer">
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>New</span>
        </button>
        <div className="h-4 w-px bg-white/10 mx-1" />
        <button className="p-1.5 hover:bg-white/10 rounded cursor-pointer text-white/70 hover:text-white" title="Cut">
          <Scissors className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded cursor-pointer text-white/70 hover:text-white" title="Copy">
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded cursor-not-allowed text-white/30" title="Paste" disabled>
          <ClipboardPaste className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded cursor-pointer text-white/70 hover:text-white" title="Rename">
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded cursor-pointer text-white/70 hover:text-white" title="Share">
          <Share2 className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded cursor-pointer text-white/70 hover:text-white" title="Delete">
          <Trash2 className="w-3.5 h-3.5 text-red-400" />
        </button>
        <div className="h-4 w-px bg-white/10 mx-1" />
        <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 text-white/70 hover:text-white cursor-pointer">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Sort</span>
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 text-white/70 hover:text-white cursor-pointer">
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>View</span>
        </button>
      </div>

      {/* 4. Main Body: Left Sidebar + Items */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Pane (satisfies test contract: "Quick Access") */}
        <aside className="w-48 bg-[#181818]/95 border-r border-white/10 p-2 space-y-0.5 text-xs text-white/70 shrink-0 select-none overflow-y-auto">
          <div className="px-2 py-1 font-semibold text-white/40 uppercase tracking-wider text-[10px]">
            Quick Access
          </div>
          <button
            onClick={() => setCurrentPath("This PC > Juan Projects")}
            className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-left cursor-pointer transition-colors ${
              currentPath.includes("Projects") ? "bg-white/10 text-white font-medium" : "hover:bg-white/5 text-white/80"
            }`}
          >
            <Folder className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
            <span>Juan Projects</span>
          </button>
          <button
            onClick={() => setCurrentPath("This PC > Desktop")}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-white/5 text-white/80 text-left cursor-pointer transition-colors"
          >
            <Monitor className="w-4 h-4 text-cyan-400" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setCurrentPath("This PC > Downloads")}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-white/5 text-white/80 text-left cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-green-400" />
            <span>Downloads</span>
          </button>
          <button
            onClick={() => setCurrentPath("This PC > Documents")}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-white/5 text-white/80 text-left cursor-pointer transition-colors"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Documents</span>
          </button>

          <div className="pt-3 px-2 py-1 font-semibold text-white/40 uppercase tracking-wider text-[10px]">
            This PC
          </div>
          <div className="px-2 py-1.5 space-y-1">
            <div className="flex items-center gap-2 text-white/90">
              <HardDrive className="w-4 h-4 text-gray-400" />
              <span>OS (C:)</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full w-[45%]" />
            </div>
            <span className="text-[10px] text-white/40">142 GB free of 256 GB</span>
          </div>
        </aside>

        {/* Content Explorer Items */}
        <main className="flex-1 p-4 overflow-y-auto bg-[#1b1b1b]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onDoubleClick={() => openApp(proj)}
                className="group flex flex-col items-center p-3 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 active:scale-95 cursor-pointer transition-all text-center select-none"
              >
                <div className="w-14 h-14 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <img
                    src={proj.icon}
                    alt={proj.title}
                    className="w-11 h-11 object-contain drop-shadow"
                    draggable={false}
                  />
                </div>
                <span className="text-xs font-medium text-white/90 line-clamp-1 group-hover:text-white">
                  {proj.title}
                </span>
                <span className="text-[10px] text-white/50">{proj.tags?.[0] || "Web Application"}</span>
              </div>
            ))}

            <div className="flex flex-col items-center p-3 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 active:scale-95 cursor-pointer transition-all text-center select-none">
              <div className="w-14 h-14 flex items-center justify-center mb-2">
                <FileCode className="w-11 h-11 text-cyan-400" />
              </div>
              <span className="text-xs font-medium text-white/90">readme.txt</span>
              <span className="text-[10px] text-white/50">Text Document (4 KB)</span>
            </div>
          </div>
        </main>
      </div>

      {/* 5. Status Bar */}
      <div className="h-6 bg-[#161616] border-t border-white/10 px-4 flex items-center text-[11px] text-white/50 justify-between select-none">
        <span>{filteredProjects.length + 1} items</span>
        <span>Windows 11 File System (NTFS)</span>
      </div>
    </div>
  );
}
