import { create } from "zustand";
import { AppConfig, WindowState, BrowserTab } from "@/types/os";

interface OSStoreState {
  isLocked: boolean;
  isStartOpen: boolean;
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  highestZIndex: number;
  browserTabs: BrowserTab[];
  activeTabId: string | null;

  unlock: () => void;
  lock: () => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  openApp: (app: AppConfig) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  toggleMaximizeApp: (id: string) => void;
  focusApp: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  openBrowserTab: (tab: { id?: string; title: string; url: string; icon?: string }) => void;
  closeBrowserTab: (tabId: string) => void;
  setActiveBrowserTab: (tabId: string) => void;
}
export const useOSStore = create<OSStoreState>((set, get) => ({
  isLocked: true,
  isStartOpen: false,
  windows: {},
  activeWindowId: null,
  highestZIndex: 10,
  browserTabs: [],
  activeTabId: null,
  unlock: () => set({ isLocked: false, isStartOpen: false }),
  lock: () => set({ isLocked: true, isStartOpen: false }),
  toggleStartMenu: () => set((state) => ({ isStartOpen: !state.isStartOpen })),
  closeStartMenu: () => set({ isStartOpen: false }),

  openApp: (app: AppConfig) => {
    const { windows, highestZIndex, browserTabs } = get();

    if (app.appType === "project" || app.appType === "browser") {
      if (app.id === "browser" && browserTabs.length > 0 && windows["browser"]?.isOpen) {
        get().focusApp("browser");
        return;
      }
      get().openBrowserTab({
        id: app.id,
        title: app.title,
        url: app.url || "",
        icon: app.icon,
      });
      return;
    }

    const existing = windows[app.id];
    const newZ = highestZIndex + 1;

    if (existing && existing.isOpen) {
      if (existing.isMinimized) {
        set({
          windows: {
            ...windows,
            [app.id]: { ...existing, isMinimized: false, zIndex: newZ },
          },
          activeWindowId: app.id,
          highestZIndex: newZ,
          isStartOpen: false,
        });
      } else {
        set({
          windows: {
            ...windows,
            [app.id]: { ...existing, zIndex: newZ },
          },
          activeWindowId: app.id,
          highestZIndex: newZ,
          isStartOpen: false,
        });
      }
      return;
    }

    const count = Object.values(windows).filter((w) => w.isOpen).length;
    const offset = (count % 8) * 32 + 48;
    const defaultW = app.defaultSize?.width ?? 840;
    const defaultH = app.defaultSize?.height ?? 560;

    const newWindow: WindowState = {
      id: app.id,
      title: app.title,
      icon: app.icon,
      appType: app.appType,
      url: app.url,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZ,
      position: { x: offset, y: offset },
      size: { width: defaultW, height: defaultH },
    };

    set({
      windows: { ...windows, [app.id]: newWindow },
      activeWindowId: app.id,
      highestZIndex: newZ,
      isStartOpen: false,
    });
  },

  openBrowserTab: (tab: { id?: string; title: string; url: string; icon?: string }) => {
    const { browserTabs, windows, highestZIndex } = get();
    const tabId = tab.id || (tab.url ? tab.url : "default");
    const existing = browserTabs.find((t) => t.id === tabId);
    let updatedTabs: BrowserTab[];

    if (existing) {
      updatedTabs = browserTabs;
    } else {
      updatedTabs = [
        ...browserTabs,
        {
          id: tabId,
          title: tab.title,
          url: tab.url,
          icon: tab.icon || "/icons/edge.png",
        },
      ];
    }

    const newZ = highestZIndex + 1;
    const browserWin = windows["browser"];
    const updatedWindows = { ...windows };

    if (browserWin && browserWin.isOpen) {
      updatedWindows["browser"] = {
        ...browserWin,
        isMinimized: false,
        zIndex: newZ,
        title: `${tab.title} - Microsoft Edge`,
      };
    } else {
      updatedWindows["browser"] = {
        id: "browser",
        title: `${tab.title} - Microsoft Edge`,
        icon: "/icons/edge.png",
        appType: "browser",
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: newZ,
        position: { x: 48, y: 48 },
        size: { width: 960, height: 600 },
      };
    }

    set({
      browserTabs: updatedTabs,
      activeTabId: tabId,
      windows: updatedWindows,
      activeWindowId: "browser",
      highestZIndex: newZ,
      isStartOpen: false,
    });
  },

  closeBrowserTab: (tabId: string) => {
    const { browserTabs, activeTabId, windows } = get();
    const idx = browserTabs.findIndex((t) => t.id === tabId);
    if (idx === -1) return;

    const remaining = browserTabs.filter((t) => t.id !== tabId);

    if (remaining.length === 0) {
      const browserWin = windows["browser"];
      set({
        browserTabs: [],
        activeTabId: null,
        windows: {
          ...windows,
          ...(browserWin
            ? { browser: { ...browserWin, isOpen: false, isMinimized: false } }
            : {}),
        },
        activeWindowId: get().activeWindowId === "browser" ? null : get().activeWindowId,
      });
      return;
    }

    if (activeTabId === tabId) {
      const nextIdx = Math.min(idx, remaining.length - 1);
      const nextTab = remaining[nextIdx];
      const browserWin = windows["browser"];
      set({
        browserTabs: remaining,
        activeTabId: nextTab.id,
        windows: {
          ...windows,
          ...(browserWin
            ? { browser: { ...browserWin, title: `${nextTab.title} - Microsoft Edge` } }
            : {}),
        },
      });
    } else {
      set({
        browserTabs: remaining,
      });
    }
  },

  setActiveBrowserTab: (tabId: string) => {
    const { browserTabs, windows, highestZIndex } = get();
    const targetTab = browserTabs.find((t) => t.id === tabId);
    if (!targetTab) return;

    const newZ = highestZIndex + 1;
    const browserWin = windows["browser"];

    set({
      activeTabId: tabId,
      windows: {
        ...windows,
        ...(browserWin
          ? {
              browser: {
                ...browserWin,
                isMinimized: false,
                zIndex: newZ,
                title: `${targetTab.title} - Microsoft Edge`,
              },
            }
          : {}),
      },
      activeWindowId: "browser",
      highestZIndex: newZ,
    });
  },

  closeApp: (id: string) => {
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;
      const isBrowser = id === "browser";
      return {
        windows: {
          ...state.windows,
          [id]: { ...win, isOpen: false, isMinimized: false },
        },
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        ...(isBrowser ? { browserTabs: [], activeTabId: null } : {}),
      };
    });
  },

  minimizeApp: (id: string) => {
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...win, isMinimized: true },
        },
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
      };
    });
  },

  toggleMaximizeApp: (id: string) => {
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;

      if (!win.isMaximized) {
        return {
          windows: {
            ...state.windows,
            [id]: {
              ...win,
              isMaximized: true,
              prevPosition: win.position,
              prevSize: win.size,
            },
          },
        };
      } else {
        return {
          windows: {
            ...state.windows,
            [id]: {
              ...win,
              isMaximized: false,
              position: win.prevPosition || { x: 60, y: 60 },
              size: win.prevSize || { width: 840, height: 560 },
            },
          },
        };
      }
    });
  },

  focusApp: (id: string) => {
    const { windows, highestZIndex, activeWindowId } = get();
    if (activeWindowId === id) return;
    const win = windows[id];
    if (!win) return;
    const newZ = highestZIndex + 1;
    set({
      windows: {
        ...windows,
        [id]: { ...win, isMinimized: false, zIndex: newZ },
      },
      activeWindowId: id,
      highestZIndex: newZ,
    });
  },

  updateWindowPosition: (id: string, position: { x: number; y: number }) => {
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...win, position },
        },
      };
    });
  },

  updateWindowSize: (id: string, size: { width: number; height: number }) => {
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...win, size },
        },
      };
    });
  },
}));
