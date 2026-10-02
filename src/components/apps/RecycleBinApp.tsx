"use client";

import React, { useState } from "react";
import {
  Trash2,
  RotateCcw,
  SlidersHorizontal,
  LayoutGrid,
  FileText,
  Folder,
  Archive,
  HardDrive,
  Search,
  X,
} from "lucide-react";

export default function RecycleBinApp() {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "node_modules (999 GB)",
      location: "C:\\Users\\juan\\dev",
      type: "File folder",
      size: "999.4 GB",
      date: "Today, 10:14 AM",
      icon: "folder",
    },
    {
      id: "2",
      name: "bug_fix_final_final_v2.txt",
      location: "C:\\Users\\juan\\Desktop",
      type: "Text Document",
      size: "4 KB",
      date: "Yesterday, 4:20 PM",
      icon: "file",
    },
    {
      id: "3",
      name: "old_portfolio_v1_backup.zip",
      location: "C:\\Users\\juan\\Downloads",
      type: "Compressed Archive",
      size: "14.2 MB",
      date: "Sep 24, 2026",
      icon: "archive",
    },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEmpty = () => {
    setItems([]);
    setSelectedId(null);
  };

  const handleRestore = () => {
    if (selectedId) {
      setItems((prev) => prev.filter((i) => i.id !== selectedId));
      setSelectedId(null);
    } else {
      setItems([]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#191919] text-white/90 text-xs select-none font-sans overflow-hidden">
      {/* 1. File Explorer Tab for Recycle Bin */}
      <div className="h-10 bg-[#141414] flex items-end px-2 pt-1 border-b border-black/40 gap-1">
        <div className="h-9 px-3 flex items-center gap-2 bg-[#232323] rounded-t-lg border-t border-x border-white/10 text-xs font-medium text-white max-w-[200px] shadow-sm">
          <img src="/icons/bin.png" alt="" className="w-3.5 h-3.5 object-contain" />
          <span className="truncate flex-1">Recycle Bin</span>
          <button className="w-4 h-4 rounded hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Address Bar */}
      <div className="h-11 border-b border-white/10 px-3 flex items-center gap-2 bg-[#202020]">
        <div className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-1.5 text-xs text-white/80 flex items-center gap-2">
          <img src="/icons/bin.png" alt="" className="w-3.5 h-3.5 object-contain" />
          <span className="font-medium text-white/90">Recycle Bin</span>
        </div>

        <div className="w-48 sm:w-56 bg-[#1a1a1a] border border-white/10 rounded-md px-2.5 py-1.5 flex items-center gap-2 text-xs">
          <Search className="w-3.5 h-3.5 text-white/40 shrink-0" />
          <input
            type="text"
            placeholder="Search Recycle Bin"
            className="w-full bg-transparent text-white outline-none placeholder-white/40 text-xs"
          />
        </div>
      </div>

      {/* 3. Command Bar (Recycle Bin Tools) */}
      <div className="h-10 border-b border-white/10 px-3 flex items-center gap-2 bg-[#1d1d1d] text-white/80 text-[11px]">
        <button
          onClick={handleEmpty}
          disabled={items.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none text-white font-medium cursor-pointer transition-colors active:scale-95"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-400" />
          <span>Empty Recycle Bin</span>
        </button>

        <button
          onClick={handleRestore}
          disabled={items.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none text-white/80 hover:text-white cursor-pointer transition-colors active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>{selectedId ? "Restore selected item" : "Restore all items"}</span>
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

      {/* 4. Table Details View */}
      <div className="flex-1 p-3 overflow-y-auto bg-[#1b1b1b]">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/40 gap-3 py-12">
            <Trash2 className="w-16 h-16 stroke-[1.2] opacity-40" />
            <div className="text-center">
              <p className="text-sm font-medium text-white/60">This folder is empty.</p>
              <p className="text-xs text-white/40 mt-0.5">Items deleted from juanOS will appear here.</p>
            </div>
          </div>
        ) : (
          <div className="min-w-[500px]">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 px-3 py-1.5 border-b border-white/10 text-[11px] font-semibold text-white/50">
              <span className="col-span-5">Name</span>
              <span className="col-span-3">Original Location</span>
              <span className="col-span-2">Date deleted</span>
              <span className="col-span-2 text-right">Size</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/5 pt-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                  className={`grid grid-cols-12 gap-2 px-3 py-2 items-center rounded-md cursor-pointer text-xs transition-colors ${
                    selectedId === item.id
                      ? "bg-cyan-500/20 text-white border border-cyan-500/40"
                      : "hover:bg-white/5 text-white/90"
                  }`}
                >
                  <div className="col-span-5 flex items-center gap-2.5 truncate">
                    {item.icon === "folder" ? (
                      <Folder className="w-4 h-4 text-yellow-400 shrink-0 fill-yellow-400/20" />
                    ) : item.icon === "archive" ? (
                      <Archive className="w-4 h-4 text-purple-400 shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                    )}
                    <span className="truncate font-medium">{item.name}</span>
                  </div>

                  <span className="col-span-3 truncate text-white/50 text-[11px]">{item.location}</span>
                  <span className="col-span-2 truncate text-white/50 text-[11px]">{item.date}</span>
                  <span className="col-span-2 text-right text-white/60 font-mono text-[11px]">{item.size}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Status Bar */}
      <div className="h-6 bg-[#161616] border-t border-white/10 px-4 flex items-center justify-between text-[11px] text-white/50">
        <span>{items.length} items</span>
        <span>{selectedId ? "1 item selected" : ""}</span>
      </div>
    </div>
  );
}
