"use client";

import React, { useState } from "react";
import { Monitor, Palette, Info, HardDrive, Shield, Check } from "lucide-react";

export default function SettingsApp() {
  const [activeTab, setActiveTab] = useState<"system" | "personalization" | "about">("system");
  const [currentWallpaper, setCurrentWallpaper] = useState("windows-11-bloom.jpg");

  return (
    <div className="flex h-full bg-[#202020] text-white/90 text-sm font-sans select-none">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1a1a1a]/95 border-r border-white/10 p-3 space-y-1">
        <div className="flex items-center gap-3 px-2 py-3 mb-2 border-b border-white/10">
          <div className="w-9 h-9 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-sm text-white shadow">
            RJ
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-xs text-white">Rafito Juan</span>
            <span className="text-[11px] text-white/50">Local Administrator</span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("system")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            activeTab === "system" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
          }`}
        >
          <Monitor className="w-4 h-4 text-cyan-400" />
          <span>System</span>
        </button>

        <button
          onClick={() => setActiveTab("personalization")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            activeTab === "personalization" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
          }`}
        >
          <Palette className="w-4 h-4 text-purple-400" />
          <span>Personalization</span>
        </button>

        <button
          onClick={() => setActiveTab("about")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            activeTab === "about" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
          }`}
        >
          <Info className="w-4 h-4 text-blue-400" />
          <span>About juanOS</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "system" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">System</h2>
              <p className="text-xs text-white/50">Display, sound, notifications, and power</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Monitor className="w-4 h-4" />
                  <span>Display</span>
                </div>
                <p className="text-xs text-white/70">Resolution: Responsive Web Canvas (100vw x 100vh)</p>
                <p className="text-xs text-white/70">Refresh Rate: 60Hz / ProMotion</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                  <HardDrive className="w-4 h-4" />
                  <span>Storage</span>
                </div>
                <p className="text-xs text-white/70">Local Cache: Active</p>
                <p className="text-xs text-white/70">Framework: Next.js + React 19 + Tailwind v4</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "personalization" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Personalization</h2>
              <p className="text-xs text-white/50">Background wallpaper and visual themes</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium text-white/80">Select Desktop Wallpaper</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: "windows-11-bloom.jpg", name: "Windows 11 Bloom Dark", path: "/wallpapers/windows-11-bloom.jpg" },
                  { id: "windows-11-bloom-light.jpg", name: "Windows 11 Bloom Light", path: "/wallpapers/windows-11-bloom-light.jpg" },
                  { id: "windows-11-lock.jpg", name: "Windows 11 Flow / Lock", path: "/wallpapers/windows-11-lock.jpg" },
                ].map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => {
                      setCurrentWallpaper(wp.id);
                      const desktop = document.querySelector('[data-testid="desktop-surface"]') as HTMLElement | null;
                      if (desktop) {
                        desktop.style.backgroundImage = `url('${wp.path}')`;
                      }
                    }}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer group text-left ${
                      currentWallpaper === wp.id ? "border-cyan-400 shadow-lg ring-2 ring-cyan-400/20" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img src={wp.path} alt={wp.name} className="w-full h-24 object-cover group-hover:scale-105 transition-transform" />
                    <div className="p-2 bg-[#181818]/90 text-[11px] font-medium text-white/90 truncate flex items-center justify-between">
                      <span className="truncate">{wp.name}</span>
                      {currentWallpaper === wp.id && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">About juanOS</h2>
              <p className="text-xs text-white/50">Device and Windows specifications</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <img src="/icons/windows.svg" alt="Windows 11" className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-sm text-white">juanOS 11 Pro</h3>
                  <p className="text-xs text-white/50">Personal Portfolio Edition</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 text-xs space-y-1.5 text-white/80">
                <div className="flex justify-between"><span className="text-white/50">Author</span><span>Rafito Juan</span></div>
                <div className="flex justify-between"><span className="text-white/50">Version</span><span>24H2 (OS Build 26100.1742)</span></div>
                <div className="flex justify-between"><span className="text-white/50">Experience</span><span>Windows Feature Experience Pack</span></div>
                <div className="flex justify-between"><span className="text-white/50">Stack</span><span>Next.js 16 + React 19 + TailwindCSS v4</span></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
