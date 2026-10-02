"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { PROJECTS } from "@/config/projects";

export default function TerminalApp() {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: "",
      output:
        "Windows PowerShell\nCopyright (C) Microsoft Corporation. All rights reserved.\n\nInstall the latest PowerShell for new features and improvements! https://aka.ms/PSWindows\n\njuanOS Terminal [Version 11.0.26100.1742]\nType 'help' to view available commands.",
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
          "Available commands:\n  help        - List all commands\n  whoami      - Display developer profile\n  projects    - List portfolio applications\n  neofetch    - Show system summary and specifications\n  ls, dir     - List workspace contents\n  clear, cls  - Clear terminal screen";
        break;
      case "whoami":
        output =
          "User: rafitojuan (Rafito Juan)\nRole: Fullstack Software Engineer\nGitHub: https://github.com/rafitojuan\nPortfolio: https://rafitojuan.vercel.app";
        break;
      case "projects":
        output = PROJECTS.map((p) => `• ${p.title} (${p.tags?.join(", ") || "Web App"})\n  URL: ${p.url}`).join("\n\n");
        break;
      case "ls":
      case "dir":
        output = `
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         10/02/2026  9:00 PM                Projects
d-----         10/02/2026  9:15 PM                Desktop
d-----         10/02/2026  9:20 PM                Documents
-a----         10/02/2026  9:30 PM           4096 readme.txt
-a----         10/02/2026  9:35 PM        1048576 juanOS.exe
`;
        break;
      case "neofetch":
        output = `
   █████████   █████████   juan@juanOS-11
   █████████   █████████   --------------
   █████████   █████████   OS: Windows 11 Pro (juanOS Web Engine)
                           Host: Next.js 16.3.4 (Turbopack)
   █████████   █████████   Kernel: React 19.2.8 Client Virtual Machine
   █████████   █████████   Uptime: Active session
                           Shell: PowerShell 7.4.2
                           Resolution: 100vw x 100vh
                           Theme: Windows 11 Bloom Dark
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
    <div className="flex flex-col h-full bg-[#0c0c0c] text-[#cccccc] font-mono text-xs select-text overflow-hidden">
      {/* 1. Windows Terminal Tabs Header */}
      <div className="h-9 bg-[#171717] flex items-end px-2 pt-1 border-b border-black/40 gap-1 select-none">
        {/* Active Tab */}
        <div className="h-8 px-3 flex items-center gap-2 bg-[#0c0c0c] rounded-t-md border-t border-x border-white/10 text-[11px] font-medium text-white max-w-[200px] shadow-sm">
          <img src="/icons/terminal.png" alt="" className="w-3.5 h-3.5 object-contain" />
          <span className="truncate flex-1">Windows PowerShell</span>
          <button className="w-3.5 h-3.5 rounded hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white">
            <X className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Plus & Profile Dropdown */}
        <div className="flex items-center mb-1">
          <button
            className="w-6 h-6 flex items-center justify-center rounded-l hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            title="Open new tab"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            className="w-4 h-6 flex items-center justify-center rounded-r hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            title="Open new tab options"
          >
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Terminal Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#0c0c0c]">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            {h.command && (
              <div className="flex items-center gap-1.5 text-white/90">
                <span className="text-cyan-400 font-semibold">PS C:\Users\juan&gt;</span>
                <span>{h.command}</span>
              </div>
            )}
            <pre className="text-white/80 whitespace-pre-wrap leading-relaxed font-mono text-[11px]">
              {h.output}
            </pre>
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center gap-1.5 text-white/90 pt-1">
          <span className="text-cyan-400 font-semibold shrink-0">PS C:\Users\juan&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none font-mono text-xs"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
