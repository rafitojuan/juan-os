"use client";

import React, { useState } from "react";
import {
  Monitor,
  Palette,
  Info,
  HardDrive,
  Check,
  Search,
  ChevronRight,
  Volume2,
  Bell,
  Battery,
  ShieldCheck,
  RefreshCw,
  AppWindow,
  User,
  Copy as CopyIcon,
  Sparkles,
} from "lucide-react";

export default function SettingsApp() {
  const [activeTab, setActiveTab] = useState<
    "system" | "personalization" | "apps" | "about"
  >("system");
  const [currentWallpaper, setCurrentWallpaper] = useState("windows-11-bloom.jpg");
  const [copied, setCopied] = useState(false);
  const [nightLight, setNightLight] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const handleCopySpecs = () => {
    navigator.clipboard?.writeText(
      "juanOS 11 Pro\nVersion: 24H2\nOS Build: 26100.1742\nDevice: Rafito Juan Web Workstation"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full bg-[#202020] text-white/90 text-xs font-sans select-none overflow-hidden">
      {/* 1. Left Sidebar */}
      <aside className="w-60 bg-[#181818]/95 border-r border-white/10 p-3 flex flex-col justify-between shrink-0 select-none">
        <div className="space-y-3">
          {/* User Card */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-sm text-white shadow">
              RJ
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-xs text-white truncate">Rafito Juan</span>
              <span className="text-[11px] text-white/50 truncate">Local Administrator</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex items-center bg-[#252525] border border-white/10 rounded-lg px-2.5 py-1.5 gap-2 text-xs">
            <Search className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <input
              type="text"
              placeholder="Find a setting"
              className="w-full bg-transparent text-white outline-none placeholder-white/40 text-xs"
            />
          </div>

          {/* Navigation Items (satisfies test contract: "System", "Personalization", "About juanOS") */}
          <nav className="space-y-0.5 pt-1">
            <button
              onClick={() => setActiveTab("system")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                activeTab === "system" ? "bg-white/10 text-white shadow-sm" : "text-white/70 hover:bg-white/5"
              }`}
            >
              <Monitor className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>System</span>
            </button>

            <button
              onClick={() => setActiveTab("personalization")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                activeTab === "personalization" ? "bg-white/10 text-white shadow-sm" : "text-white/70 hover:bg-white/5"
              }`}
            >
              <Palette className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Personalization</span>
            </button>

            <button
              onClick={() => setActiveTab("apps")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                activeTab === "apps" ? "bg-white/10 text-white shadow-sm" : "text-white/70 hover:bg-white/5"
              }`}
            >
              <AppWindow className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Apps</span>
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                activeTab === "about" ? "bg-white/10 text-white shadow-sm" : "text-white/70 hover:bg-white/5"
              }`}
            >
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>About juanOS</span>
            </button>
          </nav>
        </div>

        {/* Windows Update footer pill */}
        <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-[11px] text-white/70">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Windows Update</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">Up to date</span>
        </div>
      </aside>

      {/* 2. Main Content View */}
      <main className="flex-1 p-6 overflow-y-auto bg-[#1f1f1f]">
        {/* System Tab */}
        {activeTab === "system" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">System</h2>
              <p className="text-xs text-white/50 mt-0.5">Display, sound, notifications, power, and storage</p>
            </div>

            {/* Quick Hero Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-900/40 via-blue-900/30 to-transparent border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="w-10 h-10 text-cyan-400" />
                <div>
                  <h3 className="font-semibold text-sm text-white">Virtual Desktop Canvas</h3>
                  <p className="text-xs text-white/60">Connected to 1920x1080 Interactive Display</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-white/10 text-xs font-medium text-cyan-300">Active</span>
            </div>

            {/* Fluent Expander Cards */}
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h4 className="font-medium text-xs text-white">Display & Night light</h4>
                    <p className="text-[11px] text-white/50">Warm colors help reduce eye strain</p>
                  </div>
                </div>
                <button
                  onClick={() => setNightLight(!nightLight)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                    nightLight ? "bg-cyan-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.5 ${
                      nightLight ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-green-400" />
                  <div>
                    <h4 className="font-medium text-xs text-white">Sound Output</h4>
                    <p className="text-[11px] text-white/50">Internal Stereo Synthesizer (100% Volume)</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <HardDrive className="w-5 h-5 text-purple-400" />
                  <div>
                    <h4 className="font-medium text-xs text-white">Storage & Cache</h4>
                    <p className="text-[11px] text-white/50">Next.js Standalone Bundle Cache • 142 GB Free</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/10 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <div>
                    <h4 className="font-medium text-xs text-white">Fluent Motion & Animation Effects</h4>
                    <p className="text-[11px] text-white/50">Enable smooth window pop-in and icon press spring</p>
                  </div>
                </div>
                <button
                  onClick={() => setAnimationsEnabled(!animationsEnabled)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                    animationsEnabled ? "bg-cyan-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.5 ${
                      animationsEnabled ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Personalization Tab */}
        {activeTab === "personalization" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Personalization</h2>
              <p className="text-xs text-white/50 mt-0.5">Desktop wallpaper, theme colors, and visual styles</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-white/90">Select a theme to apply</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "windows-11-bloom.jpg",
                    name: "Windows 11 Bloom Dark",
                    path: "/wallpapers/windows-11-bloom.jpg",
                    desc: "Default Dark Flow",
                  },
                  {
                    id: "windows-11-bloom-light.jpg",
                    name: "Windows 11 Bloom Light",
                    path: "/wallpapers/windows-11-bloom-light.jpg",
                    desc: "Fluent Light Ambient",
                  },
                  {
                    id: "windows-11-lock.jpg",
                    name: "Windows 11 Flow / Lock",
                    path: "/wallpapers/windows-11-lock.jpg",
                    desc: "Lockscreen Abstract",
                  },
                ].map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => {
                      setCurrentWallpaper(wp.id);
                      const desktop = document.querySelector(
                        '[data-testid="desktop-surface"]'
                      ) as HTMLElement | null;
                      if (desktop) {
                        desktop.style.backgroundImage = `url('${wp.path}')`;
                      }
                    }}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer group text-left ${
                      currentWallpaper === wp.id
                        ? "border-cyan-400 shadow-xl ring-2 ring-cyan-400/20"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img
                      src={wp.path}
                      alt={wp.name}
                      className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-2.5 bg-[#181818]/95 border-t border-white/5 flex items-center justify-between">
                      <div className="min-w-0">
                        <span className="font-medium text-white/90 text-xs block truncate">{wp.name}</span>
                        <span className="text-[10px] text-white/50 block truncate">{wp.desc}</span>
                      </div>
                      {currentWallpaper === wp.id && (
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Apps Tab */}
        {activeTab === "apps" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Installed Applications</h2>
              <p className="text-xs text-white/50 mt-0.5">Manage built-in OS tools and installed portfolio apps</p>
            </div>

            <div className="divide-y divide-white/10 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
              {[
                { name: "Portfolio v2", icon: "/icons/edge.png", size: "2.4 MB", type: "Web Project" },
                { name: "Juan AI Assistant", icon: "/icons/copilot.svg", size: "4.8 MB", type: "Interactive AI" },
                { name: "Pomore Focus", icon: "/icons/alarm.png", size: "1.9 MB", type: "Productivity Tool" },
                { name: "File Explorer", icon: "/icons/explorer.png", size: "12.4 MB", type: "System Shell" },
                { name: "Windows Terminal", icon: "/icons/terminal.png", size: "8.1 MB", type: "System Tool" },
              ].map((app) => (
                <div key={app.name} className="p-3.5 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={app.icon} alt="" className="w-8 h-8 object-contain" />
                    <div>
                      <h4 className="font-medium text-xs text-white">{app.name}</h4>
                      <p className="text-[11px] text-white/50">{app.type}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-white/40 font-mono">{app.size}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Tab (satisfies test contract: "About juanOS") */}
        {activeTab === "about" && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">About juanOS</h2>
              <p className="text-xs text-white/50 mt-0.5">Device specifications and Windows 11 edition info</p>
            </div>

            {/* Windows Edition Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <img src="/icons/windows.svg" alt="Windows 11" className="w-10 h-10 object-contain drop-shadow" />
                  <div>
                    <h3 className="font-semibold text-sm text-white">juanOS 11 Pro</h3>
                    <p className="text-xs text-white/50">Personal Portfolio Edition</p>
                  </div>
                </div>
                <button
                  onClick={handleCopySpecs}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium cursor-pointer transition-colors active:scale-95"
                >
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              <div className="border-t border-white/10 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs text-white/80">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Developer</span>
                  <span className="font-medium">Rafito Juan</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Edition</span>
                  <span className="font-medium">Windows 11 Pro 64-bit</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Version</span>
                  <span className="font-medium">24H2</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">OS Build</span>
                  <span className="font-medium">26100.1742</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Experience</span>
                  <span className="font-medium">Windows Feature Pack 1000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Tech Engine</span>
                  <span className="font-medium">Next.js 16 + React 19 + Tailwind v4</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
