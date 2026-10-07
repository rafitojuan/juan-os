"use client";

import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useOSStore } from "@/store/useOSStore";

export default function LockScreen() {
  const { isLocked, unlock } = useOSStore();
  const [showAuth, setShowAuth] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isLocked) return null;

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const timeStr = `${hours}:${minutes}`;
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section
      data-testid="lock-screen"
      onClick={() => setShowAuth(true)}
      aria-label="Lock screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between py-16 text-white select-none transition-all duration-500 bg-cover bg-center ${
        showAuth ? "backdrop-blur-xl bg-black/40" : ""
      }`}
      style={{
        backgroundImage: "url('/wallpapers/windows-11-lock.jpg')",
      }}
    >
      <div className={`flex flex-col items-center gap-2 pt-8 transition-all duration-300 ${showAuth ? "-translate-y-2 scale-95 opacity-90" : ""}`}>
        <h1 data-testid="lock-clock" className="text-7xl md:text-8xl font-light tracking-tight">
          {timeStr}
        </h1>
        <p data-testid="lock-date" className="text-lg md:text-xl font-normal text-white/80">
          {dateStr}
        </p>
      </div>

      {showAuth ? (
        <div className="flex flex-col items-center gap-4 animate-fluent-open">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 shadow-lg">
            <User className="h-12 w-12 text-white/90" />
          </div>
          <span className="text-2xl font-semibold tracking-wide">Rafito Juan</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              unlock();
            }}
            className="mt-2 rounded-md border border-white/30 bg-white/20 px-8 py-2 text-sm font-medium backdrop-blur transition-all duration-200 hover:bg-white/30 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            Sign in
          </button>
        </div>
      ) : (
        <p className="text-sm font-light text-white/60 animate-pulse">
          Click anywhere to unlock
        </p>
      )}

      <div className="h-6" />
    </section>
  );
}
