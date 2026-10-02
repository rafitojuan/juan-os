"use client";

import React, { useState } from "react";
import { Trash2, RotateCcw, AlertCircle, FileText, Folder } from "lucide-react";

export default function RecycleBinApp() {
  const [items, setItems] = useState([
    { id: "1", name: "node_modules (999 GB)", type: "System Folder", size: "999.4 GB", date: "Today" },
    { id: "2", name: "bug_fix_final_final_v2.txt", type: "Text Document", size: "4 KB", date: "Yesterday" },
    { id: "3", name: "old_portfolio_v1_backup.zip", type: "Compressed Archive", size: "14.2 MB", date: "Sep 2025" },
  ]);

  const handleEmpty = () => {
    setItems([]);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white/90 text-sm select-none font-sans">
      {/* Ribbon */}
      <div className="h-10 border-b border-white/10 px-3 flex items-center justify-between bg-[#252525]/80">
        <div className="flex items-center gap-2">
          <button
            onClick={handleEmpty}
            disabled={items.length === 0}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 disabled:opacity-40 disabled:pointer-events-none text-xs text-white font-medium cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span>Empty Recycle Bin</span>
          </button>
        </div>

        <span className="text-xs text-white/50">{items.length} items</span>
      </div>

      {/* Item list */}
      <div className="flex-1 p-4 overflow-y-auto">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/40 gap-2">
            <Trash2 className="w-12 h-12 stroke-[1.5]" />
            <p className="text-xs">Recycle Bin is empty</p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-2.5 px-3 flex items-center justify-between hover:bg-white/5 rounded transition-colors text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium text-white/90">{item.name}</span>
                </div>
                <div className="flex items-center gap-6 text-white/50 text-[11px]">
                  <span>{item.type}</span>
                  <span>{item.size}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
