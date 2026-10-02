"use client";

import React from "react";
import { Download, ExternalLink, Star } from "lucide-react";
import { PROJECTS } from "@/config/projects";
import { useOSStore } from "@/store/useOSStore";

export default function StoreApp() {
  const { openApp } = useOSStore();

  return (
    <div className="flex flex-col h-full bg-[#1c1c1c] text-white/90 font-sans select-none overflow-y-auto">
      {/* Banner */}
      <div className="relative h-44 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 flex flex-col justify-end text-white">
        <span className="text-xs uppercase tracking-wider font-semibold opacity-80">Featured Portfolio</span>
        <h1 className="text-2xl font-bold">Featured Projects & Tools</h1>
        <p className="text-xs opacity-90 mt-1">Explore applications built by Rafito Juan</p>
      </div>

      {/* Grid of Apps */}
      <div className="p-6 space-y-4">
        <h2 className="text-base font-semibold text-white">Top Free Apps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <img src={proj.icon} alt={proj.title} className="w-12 h-12 object-contain rounded-lg drop-shadow" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-white truncate">{proj.title}</h3>
                  <p className="text-xs text-white/60 line-clamp-2 mt-0.5">{proj.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-yellow-400 text-xs">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    <span className="font-medium text-white/80">5.0</span>
                    <span className="text-white/40 text-[10px] ml-1">Featured</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-cyan-400 font-medium">Free</span>
                <button
                  onClick={() => openApp(proj)}
                  className="px-4 py-1.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3 h-3" />
                  <span>Open App</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
