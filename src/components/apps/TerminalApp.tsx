"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Plus, X } from "lucide-react";
import { PROJECTS } from "@/config/projects";

export default function TerminalApp() {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: "welcome",
      output:
        "juanOS Terminal [Version 11.0.26100]\n(c) Rafito Juan. All rights reserved.\nType 'help' to view available commands.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current && typeof bottomRef.current.scrollIntoView === "function") {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output = "";
    switch (cmd) {
      case "help":
        output =
          "Available commands:\n  help        - Show this manual\n  whoami      - Information about Rafito Juan\n  projects    - List portfolio projects\n  neofetch    - Show system summary\n  clear       - Clear terminal history";
        break;
      case "whoami":
        output =
          "Rafito Juan - Software Engineer & Web Developer\nStack: React, TypeScript, Next.js, Node.js, Go, Python\nGitHub: github.com/rafitojuan";
        break;
      case "projects":
        output = PROJECTS.map((p) => `• ${p.title} (${p.tags?.join(", ")}) -> ${p.url}`).join("\n");
        break;
      case "neofetch":
        output = `
   █████████   █████████   juan@juanOS-11
   █████████   █████████   --------------
   █████████   █████████   OS: juanOS 11 Pro x86_64
                           Host: Web Browser Virtual Surface
   █████████   █████████   Kernel: Next.js 16.3.4
   █████████   █████████   Uptime: Active session
   █████████   █████████   Shell: powershell 7.4
                           Terminal: Windows Terminal Fluent
`;
        break;
      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;
      default:
        output = `'${cmd}' is not recognized as an internal or external command. Type 'help' for options.`;
    }

    setHistory((prev) => [...prev, { command: inputVal, output }]);
    setInputVal("");
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0c0c] text-[#cccccc] font-mono text-xs select-text">
      {/* Tab bar */}
      <div className="h-8 bg-[#1f1f1f] flex items-center px-2 gap-1 border-b border-white/5 select-none">
        <div className="flex items-center gap-2 bg-[#0c0c0c] px-3 py-1.5 rounded-t text-white text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Windows PowerShell</span>
          <X className="w-3 h-3 hover:text-red-400 cursor-pointer ml-1" />
        </div>
        <button className="p-1 hover:bg-white/10 rounded text-white/50 hover:text-white" title="New Tab">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-1.5 text-white/90">
              <span className="text-cyan-400">PS C:\Users\juan&gt;</span>
              <span>{h.command}</span>
            </div>
            <pre className="text-white/70 whitespace-pre-wrap leading-relaxed font-mono">{h.output}</pre>
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center gap-1.5 text-white/90 pt-1">
          <span className="text-cyan-400 shrink-0">PS C:\Users\juan&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none font-mono"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
