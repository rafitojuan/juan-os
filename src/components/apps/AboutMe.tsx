"use client";

import React, { useState } from "react";
import { Plus, X, Settings as SettingsIcon, Globe, Sparkles } from "lucide-react";

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="flex flex-col h-full bg-[#1f1f1f] text-white/90 select-none font-sans overflow-hidden">
      {/* Windows 11 Notepad Tab Bar */}
      <div className="h-10 bg-[#181818] flex items-end px-2 pt-1 border-b border-black/40 gap-1">
        {/* Active Notepad Tab */}
        <div className="h-9 px-3 flex items-center gap-2 bg-[#282828] rounded-t-lg border-t border-x border-white/10 text-xs font-normal text-white max-w-[240px] shadow-sm">
          <img src="/icons/notepad.png" alt="" className="w-3.5 h-3.5 object-contain" />
          <span className="truncate flex-1">About_Rafito_Juan.txt</span>
          <span className="text-[10px] text-white/40">•</span>
          <button className="w-4 h-4 rounded hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white">
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* New Tab Button */}
        <button
          className="w-7 h-7 mb-1 flex items-center justify-center rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          title="New tab (Ctrl+N)"
        >
          <Plus className="w-4 h-4" />
        </button>

        <div className="flex-1" />

        <button
          className="p-1.5 mb-1 hover:bg-white/10 rounded-md text-white/60 hover:text-white"
          title="Notepad Settings"
        >
          <SettingsIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Notepad Menu Bar */}
      <div className="h-8 bg-[#202020] border-b border-white/5 px-3 flex items-center gap-4 text-xs text-white/80">
        <span className="hover:text-white hover:bg-white/5 px-2 py-0.5 rounded cursor-pointer transition-colors">
          File
        </span>
        <span className="hover:text-white hover:bg-white/5 px-2 py-0.5 rounded cursor-pointer transition-colors">
          Edit
        </span>
        <span className="hover:text-white hover:bg-white/5 px-2 py-0.5 rounded cursor-pointer transition-colors">
          View
        </span>
      </div>

      {/* Notepad Text Content Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#1c1c1c] text-white/90 select-text font-mono text-xs leading-relaxed">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header (satisfies heading test contract) */}
          <div className="pb-4 border-b border-white/10 select-none">
            <h1 className="text-xl font-bold font-sans text-white flex items-center gap-2">
              Rafito Juan <Sparkles className="w-4 h-4 text-yellow-400" />
            </h1>
            <p className="text-xs text-cyan-400 font-sans mt-0.5">
              Fullstack Software Engineer & Web Developer
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-white/50 text-[11px]"># SUMMARY / BIO</div>
            <p className="text-white/80 font-sans text-sm leading-relaxed">
              Software Engineer passionate about crafting high-performance web applications,
              intuitive Windows-inspired user interfaces, and scalable backend microservices.
              Creator of <strong>juanOS</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-white/50 text-[11px]"># TECHNICAL SKILLS & STACK</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-white/5 border border-white/5">
                <span className="text-cyan-400 font-semibold">Languages:</span>
                <p className="text-white/80 mt-1">TypeScript, JavaScript, Go, Python, SQL</p>
              </div>
              <div className="p-2.5 rounded bg-white/5 border border-white/5">
                <span className="text-purple-400 font-semibold">Frontend:</span>
                <p className="text-white/80 mt-1">React 19, Next.js 16, Svelte, Tailwind CSS v4</p>
              </div>
              <div className="p-2.5 rounded bg-white/5 border border-white/5">
                <span className="text-green-400 font-semibold">Backend:</span>
                <p className="text-white/80 mt-1">Node.js, Express, PostgreSQL, Redis, REST/GraphQL</p>
              </div>
              <div className="p-2.5 rounded bg-white/5 border border-white/5">
                <span className="text-blue-400 font-semibold">DevOps & Tools:</span>
                <p className="text-white/80 mt-1">Docker, Git, Linux, CI/CD, Vite, Turbopack</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-white/50 text-[11px]"># CONTACT & REPOSITORIES</div>
            <div className="flex flex-wrap gap-3 pt-1 font-sans">
              <a
                href="https://github.com/rafitojuan"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs transition-colors select-none"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>github.com/rafitojuan</span>
              </a>
              <a
                href="https://rafitojuan.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs transition-colors select-none"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>rafitojuan.vercel.app</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Windows 11 Notepad Status Bar */}
      <div className="h-6 bg-[#181818] border-t border-white/5 px-4 flex items-center justify-between text-[11px] text-white/50 select-none">
        <div className="flex items-center gap-6">
          <span>Ln 42, Col 1</span>
          <span>100%</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Windows (CRLF)</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
