"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  Plus,
  X,
  Lock,
  Star,
  Globe,
  MoreHorizontal,
  Folder,
} from "lucide-react";
import { PROJECTS } from "@/config/projects";
import { useOSStore } from "@/store/useOSStore";

interface ProjectViewerProps {
  url?: string;
  title?: string;
}

export default function ProjectViewer({ url: initialUrl, title: initialTitle }: ProjectViewerProps = {}) {
  const {
    browserTabs,
    activeTabId,
    openBrowserTab,
    closeBrowserTab,
    setActiveBrowserTab,
  } = useOSStore();
  const [iframeKey, setIframeKey] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const effectiveTabs =
    browserTabs.length > 0
      ? browserTabs
      : initialUrl
      ? [
          {
            id: "prop-tab",
            title: initialTitle || "Microsoft Edge",
            url: initialUrl,
            icon: "/icons/edge.png",
          },
        ]
      : [];

  const effectiveActiveId =
    activeTabId && effectiveTabs.some((t) => t.id === activeTabId)
      ? activeTabId
      : effectiveTabs[0]?.id || null;

  const activeTab = effectiveTabs.find((t) => t.id === effectiveActiveId);
  const currentUrl = activeTab?.url || initialUrl || "";
  const currentTitle = activeTab?.title || initialTitle || "Microsoft Edge";

  if (effectiveTabs.length === 0 && !initialUrl) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-white/60 p-6 bg-[#202020] h-full select-none">
        <ShieldAlert className="w-12 h-12 mb-2 text-yellow-400" />
        <p className="text-sm">No URL configured for this project.</p>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col h-full bg-[#202020] text-white select-none font-sans overflow-hidden">
      {/* Edge Tab Bar */}
      <div
        data-testid="browser-tab-bar"
        className="h-10 bg-[#181818] flex items-end px-2 pt-1 border-b border-black/40 gap-1 select-none overflow-x-auto scrollbar-none"
      >
        {/* Tab list */}
        {effectiveTabs.map((tab) => {
          const isActive = tab.id === effectiveActiveId;
          return (
            <div
              key={tab.id}
              data-testid={`browser-tab-${tab.id}`}
              onClick={() => setActiveBrowserTab(tab.id)}
              className={`h-9 px-3 flex items-center gap-2 rounded-t-lg text-xs font-medium max-w-[220px] cursor-pointer transition-colors ${
                isActive
                  ? "bg-[#2b2b2b] text-white border-t border-x border-white/10 shadow-sm"
                  : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
              }`}
            >
              <img
                src={tab.icon || "/icons/edge.png"}
                alt=""
                className="w-4 h-4 object-contain shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/icons/edge.png";
                }}
              />
              <span className="truncate flex-1">{tab.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeBrowserTab(tab.id);
                }}
                aria-label="Close tab"
                title="Close tab"
                className="w-4 h-4 rounded hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        {/* New Tab Button */}
        <button
          onClick={() => {
            const unopened = PROJECTS.find((p) => !browserTabs.some((t) => t.id === p.id));
            const toOpen = unopened || PROJECTS[0];
            if (toOpen) {
              openBrowserTab({
                id: toOpen.id,
                title: toOpen.title,
                url: toOpen.url || "",
                icon: toOpen.icon,
              });
            }
          }}
          className="w-7 h-7 mb-1 flex items-center justify-center rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
          title="New tab"
          aria-label="New tab"
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className="flex-1" />

        {/* Edge Action Icons Right */}
        <div className="flex items-center gap-1 mb-1 text-white/60">
          <button
            className="p-1.5 hover:bg-white/10 rounded-md hover:text-white"
            title="Settings and more"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Edge Navigation Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#2b2b2b] border-b border-white/10 text-xs">
        <div className="flex items-center gap-1 text-white/60">
          <button className="p-1.5 hover:bg-white/10 rounded-md cursor-not-allowed opacity-50" title="Back">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-md cursor-not-allowed opacity-50" title="Forward">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            title="Refresh"
            onClick={() => setIframeKey((k) => k + 1)}
            className="p-1.5 hover:bg-white/10 hover:text-white rounded-md cursor-pointer transition-colors active:rotate-180"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Edge Omnibox (Address Bar) */}
        <div className="flex-1 flex items-center bg-[#1c1c1c] hover:bg-[#181818] focus-within:bg-[#181818] px-3 py-1.5 rounded-full border border-white/10 focus-within:border-cyan-400/60 focus-within:ring-1 focus-within:ring-cyan-400/40 transition-all text-xs">
          <Lock className="w-3 h-3 text-green-400 mr-2 shrink-0" />
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="w-full bg-transparent outline-none truncate select-all cursor-text text-white/90 text-xs"
          />
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="ml-2 text-white/40 hover:text-yellow-400 transition-colors cursor-pointer"
            title="Add this page to favorites"
          >
            <Star className={`w-3.5 h-3.5 ${isBookmarked ? "text-yellow-400 fill-yellow-400" : ""}`} />
          </button>
        </div>

        {/* Fallback button (satisfies test contract) */}
        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open external"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white/90 rounded-full text-xs font-medium transition-colors cursor-pointer border border-white/10 shadow-sm"
          title="Open in external browser window"
        >
          <span>Open Web</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Edge Favorites / Bookmarks Bar */}
      <div className="h-7 bg-[#262626] border-b border-white/10 px-3 flex items-center gap-3 text-[11px] text-white/70 overflow-x-auto scrollbar-none">
        <span className="text-white/40 flex items-center gap-1 text-[10px] uppercase font-semibold tracking-wider">
          <Folder className="w-3 h-3 text-yellow-500 fill-yellow-500/20" />
          Favorites
        </span>
        <div className="h-3.5 w-px bg-white/15" />
        {PROJECTS.map((proj) => (
          <button
            key={proj.id}
            onClick={() => {
              if (proj.url) {
                openBrowserTab({
                  id: proj.id,
                  title: proj.title,
                  url: proj.url,
                  icon: proj.icon,
                });
              }
            }}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 transition-colors cursor-pointer truncate max-w-[160px] ${
              currentUrl === proj.url ? "text-cyan-400 font-medium bg-white/5" : "text-white/80"
            }`}
          >
            <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{proj.title}</span>
          </button>
        ))}
      </div>

      {/* Embedded Web Page */}
      <div className="flex-1 relative bg-white">
        {effectiveTabs.map((tab) => (
          <iframe
            key={`${tab.id}-${tab.id === effectiveActiveId ? iframeKey : 0}`}
            src={tab.url}
            title={tab.title}
            className={`w-full h-full border-none ${tab.id === effectiveActiveId ? "block" : "hidden"}`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ))}
    </div>
      </div>
  );
}
