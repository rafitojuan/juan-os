"use client";

import React from "react";
import { Terminal, Globe, Code, Sparkles } from "lucide-react";

export default function AboutMe() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#1e1e1e] text-white/90 p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            RJ
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Rafito Juan <Sparkles className="w-5 h-5 text-yellow-400" />
            </h1>
            <p className="text-sm text-cyan-400">Fullstack Developer & Creative Builder</p>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-white/95 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" /> Introduction
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Welcome to <strong>juanOS</strong> — my interactive Windows 11 simulator portfolio.
            I design and engineer performant web applications, modern UI/UX experiences, and robust
            cloud microservices.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-white/95 flex items-center gap-2">
            <Code className="w-4 h-4 text-cyan-400" /> Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Svelte",
              "Tailwind CSS",
              "Node.js",
              "Docker",
              "PostgreSQL",
              "Zustand",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/85 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h2 className="text-base font-semibold text-white/95">Connect & Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <a
              href="https://github.com/rafitojuan"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <svg className="w-4 h-4 text-white fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>github.com/rafitojuan</span>
            </a>
            <a
              href="https://rafitojuan.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>rafitojuan.vercel.app</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
