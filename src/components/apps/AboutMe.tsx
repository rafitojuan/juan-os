"use client";

import React from "react";
import { Terminal, Github, Globe, Code, Sparkles } from "lucide-react";

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
              <Github className="w-4 h-4 text-white" />
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
