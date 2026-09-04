import { create } from "zustand";
import { AppConfig, WindowState } from "@/types/os";

interface OSStoreState {
  isLocked: boolean;
  isStartOpen: boolean;
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  highestZIndex: number;

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
}

export const useOSStore = create<OSStoreState>((set, get) => ({
  isLocked: true,
  isStartOpen: false,
  windows: {},
  activeWindowId: null,
  highestZIndex: 10,

  unlock: () => set({ isLocked: false, isStartOpen: false }),
  lock: () => set({ isLocked: true, isStartOpen: false }),
  toggleStartMenu: () => set((state) => ({ isStartOpen: !state.isStartOpen })),
  closeStartMenu: () => set({ isStartOpen: false }),

  openApp: (app: AppConfig) => {
    const { windows, highestZIndex } = get();
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

  closeApp: (id: string) => {
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...win, isOpen: false, isMinimized: false },
        },
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
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
