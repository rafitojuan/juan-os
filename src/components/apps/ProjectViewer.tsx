"use client";

import React, { useState } from "react";
import { RefreshCw, ExternalLink, ShieldAlert, ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectViewerProps {
  url?: string;
  title: string;
}

export default function ProjectViewer({ url, title }: ProjectViewerProps) {
  const [iframeKey, setIframeKey] = useState(0);

  if (!url) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-white/60 p-6">
        <ShieldAlert className="w-12 h-12 mb-2 text-yellow-400" />
        <p>No URL configured for this project.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] text-white select-none">
      {/* Mini Browser Toolbar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2b2b2b] border-b border-white/10 text-xs">
        <div className="flex items-center gap-1 text-white/50">
          <button className="p-1 hover:bg-white/10 rounded cursor-not-allowed">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded cursor-not-allowed">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            title="Reload Frame"
            onClick={() => setIframeKey((k) => k + 1)}
            className="p-1 hover:bg-white/10 hover:text-white rounded"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address bar */}
        <div className="flex-1 flex items-center bg-[#1e1e1e] px-3 py-1 rounded-full border border-white/10 text-white/80 text-xs">
          <span className="text-white/40 mr-1.5">🔒</span>
          <input
            type="text"
            readOnly
            value={url}
            className="w-full bg-transparent outline-none truncate select-all cursor-text text-white/90"
          />
        </div>

        {/* Fallback button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open external"
          className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white/90 rounded text-xs transition-colors"
          title="Open in new browser tab"
        >
          <span>Open Web</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Embedded web frame */}
      <div className="flex-1 relative bg-white">
        <iframe
          key={iframeKey}
          src={url}
          title={title}
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
