"use client";

import React, { useState } from "react";
import {
  Search,
  Home,
  LayoutGrid,
  Gamepad2,
  FolderDown,
  Star,
  Download,
  Check,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { PROJECTS } from "@/config/projects";
import { useOSStore } from "@/store/useOSStore";

export default function StoreApp() {
  const { openApp } = useOSStore();
  const [activeTab, setActiveTab] = useState<"home" | "apps" | "library">("home");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = searchQuery.trim()
    ? PROJECTS.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : PROJECTS;

  return (
    <div className="flex h-full bg-[#1b1b1b] text-white/90 font-sans text-xs select-none overflow-hidden">
      {/* 1. Left Navigation Rail */}
      <aside className="w-16 sm:w-44 bg-[#141414] border-r border-white/10 p-2 flex flex-col justify-between shrink-0">
        <div className="space-y-1">
          <div className="hidden sm:flex items-center gap-2 px-3 py-3 mb-2">
            <img src="/icons/store.png" alt="" className="w-5 h-5 object-contain" />
            <span className="font-semibold text-xs text-white">Microsoft Store</span>
          </div>

          <button
            onClick={() => setActiveTab("home")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              activeTab === "home" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:bg-white/5"
            }`}
          >
            <Home className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            onClick={() => setActiveTab("apps")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              activeTab === "apps" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:bg-white/5"
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="hidden sm:inline">Apps</span>
          </button>

          <button
            onClick={() => setActiveTab("library")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              activeTab === "library" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:bg-white/5"
            }`}
          >
            <FolderDown className="w-4 h-4 text-green-400 shrink-0" />
            <span className="hidden sm:inline">Library</span>
          </button>
        </div>

        <div className="hidden sm:flex flex-col gap-1 p-2 rounded-lg bg-white/5 text-[10px] text-white/50">
          <span className="text-white/80 font-medium">juanOS Store v2.4</span>
          <span>Verified developer profile</span>
        </div>
      </aside>

      {/* 2. Main Store Body */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#1f1f1f]">
        {/* Top Search Bar */}
        <div className="h-12 bg-[#181818] border-b border-white/10 px-6 flex items-center justify-between shrink-0">
          <div className="w-72 max-w-full relative flex items-center bg-[#282828] border border-white/10 rounded-full px-3 py-1.5 focus-within:border-cyan-400 text-xs">
            <Search className="w-3.5 h-3.5 text-white/40 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search apps, games, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white outline-none placeholder-white/40 text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-[10px] text-white">
              RJ
            </div>
          </div>
        </div>

        {/* Scrollable Catalog */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Spotlight Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-8 flex flex-col justify-end min-h-[160px] text-white shadow-xl border border-white/10">
            <div className="relative z-10 max-w-xl">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold mb-2">
                Featured Portfolio Apps
              </span>
              <h1 className="text-2xl font-bold">Engineered by Rafito Juan</h1>
              <p className="text-xs text-white/80 mt-1">
                Explore interactive full-stack web applications, timers, and intelligent assistants.
              </p>
            </div>
          </div>

          {/* Apps Section */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white">Top Recommended Apps</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={proj.icon}
                      alt={proj.title}
                      className="w-14 h-14 object-contain rounded-xl drop-shadow"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-white truncate">{proj.title}</h3>
                      <p className="text-xs text-white/50 line-clamp-2 mt-0.5">{proj.description}</p>
                      <div className="flex items-center gap-1.5 mt-2 text-yellow-400 text-xs">
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        <span className="font-semibold text-white/90">4.9</span>
                        <span className="text-white/40 text-[10px] ml-1">
                          {proj.tags?.join(" • ") || "Web App"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-medium">Free</span>
                    <button
                      onClick={() => openApp(proj)}
                      className="px-4 py-1.5 rounded-full bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Get / Open</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
