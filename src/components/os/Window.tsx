"use client";

import React, { useRef } from "react";
import { WindowState } from "@/types/os";
import { useOSStore } from "@/store/useOSStore";
import { Minus, Square, Copy, X } from "lucide-react";
import { getAppIcon } from "./StartMenu";

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export default function Window({ window: win, children }: WindowProps) {
  const {
    focusApp,
    closeApp,
    minimizeApp,
    toggleMaximizeApp,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useOSStore();

  const isFocused = activeWindowId === win.id;
  const windowRef = useRef<HTMLDivElement>(null);

  if (!win.isOpen || win.isMinimized) return null;

  const handleTitlePointerDown = (e: React.PointerEvent) => {
    if (win.isMaximized || e.button !== 0) return;
    focusApp(win.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = win.position.x;
    const startPosY = win.position.y;

    const onPointerMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      const newX = Math.max(0, startPosX + dx);
      const newY = Math.max(0, startPosY + dy);
      updateWindowPosition(win.id, { x: newX, y: newY });
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handleResizePointerDown = (e: React.PointerEvent, direction: "se") => {
    e.stopPropagation();
    focusApp(win.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = win.size.width;
    const startH = win.size.height;

    const onPointerMove = (ev: PointerEvent) => {
      if (direction === "se") {
        const newW = Math.max(420, startW + (ev.clientX - startX));
        const newH = Math.max(300, startH + (ev.clientY - startY));
        updateWindowSize(win.id, { width: newW, height: newH });
      }
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      ref={windowRef}
      onPointerDown={() => focusApp(win.id)}
      className={`absolute flex flex-col rounded-lg overflow-hidden transition-shadow duration-200 border ${
        isFocused
          ? "shadow-2xl border-white/30 ring-1 ring-white/20"
          : "shadow-lg border-white/15 opacity-95"
      } ${win.isMaximized ? "inset-0 !w-full !h-[calc(100vh-48px)] rounded-none border-none" : ""}`}
      style={{
        zIndex: win.zIndex,
        left: win.isMaximized ? 0 : win.position.x,
        top: win.isMaximized ? 0 : win.position.y,
        width: win.isMaximized ? "100vw" : win.size.width,
        height: win.isMaximized ? "calc(100vh - 48px)" : win.size.height,
        backgroundColor: "rgba(32, 32, 32, 0.85)",
        backdropFilter: "blur(30px)",
      }}
    >
      {/* Title bar */}
      <div
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={() => toggleMaximizeApp(win.id)}
        className="h-9 px-3 flex items-center justify-between select-none bg-white/5 border-b border-white/10 cursor-default"
      >
        <div className="flex items-center gap-2 text-xs font-normal text-white/90 truncate">
          <div className="w-4 h-4 flex items-center justify-center shrink-0">
            {getAppIcon(win.icon, "w-4 h-4")}
          </div>
          <span className="truncate">{win.title}</span>
        </div>

        {/* Windows Controls */}
        <div className="flex items-center h-full -mr-3">
          <button
            aria-label="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              minimizeApp(win.id);
            }}
            className="w-11 h-full flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            aria-label="Maximize"
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximizeApp(win.id);
            }}
            className="w-11 h-full flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            {win.isMaximized ? (
              <Copy className="w-3 h-3 rotate-180" />
            ) : (
              <Square className="w-3 h-3" />
            )}
          </button>
          <button
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              closeApp(win.id);
            }}
            className="w-11 h-full flex items-center justify-center hover:bg-red-600 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative flex flex-col">{children}</div>

      {/* Resize handle bottom right */}
      {!win.isMaximized && (
        <div
          onPointerDown={(e) => handleResizePointerDown(e, "se")}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20"
        />
      )}
    </div>
  );
}
