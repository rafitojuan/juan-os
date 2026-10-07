import { describe, it, expect, beforeEach } from "vitest";
import { useOSStore } from "@/store/useOSStore";
import { AppConfig } from "@/types/os";

describe("OS Store", () => {
  beforeEach(() => {
    useOSStore.setState({
      isLocked: true,
      isStartOpen: false,
      windows: {},
      activeWindowId: null,
      highestZIndex: 10,
      browserTabs: [],
      activeTabId: null,
    });
  });

  it("unlocks and locks the OS", () => {
    expect(useOSStore.getState().isLocked).toBe(true);
    useOSStore.getState().unlock();
    expect(useOSStore.getState().isLocked).toBe(false);
    useOSStore.getState().lock();
    expect(useOSStore.getState().isLocked).toBe(true);
  });

  it("opens a non-project application as a new window with proper zIndex", () => {
    const app: AppConfig = {
      id: "test-app",
      title: "Test App",
      icon: "notepad",
      appType: "about",
      defaultSize: { width: 800, height: 600 },
    };

    useOSStore.getState().openApp(app);
    const state = useOSStore.getState();
    const win = state.windows["test-app"];

    expect(win).toBeDefined();
    expect(win.isOpen).toBe(true);
    expect(win.isMinimized).toBe(false);
    expect(state.activeWindowId).toBe("test-app");
    expect(win.zIndex).toBe(11);
  });

  it("consolidates project apps into a single browser window with tabs", () => {
    const pomore: AppConfig = {
      id: "pomore",
      title: "Pomore Focus",
      icon: "/icons/alarm.png",
      appType: "project",
      url: "https://pomore.rafitojuan.my.id",
    };
    const portfolio: AppConfig = {
      id: "portfolio-v2",
      title: "Portfolio v2",
      icon: "/icons/edge.png",
      appType: "project",
      url: "https://portfolio.rafitojuan.my.id",
    };

    // Open first project -> creates browser window
    useOSStore.getState().openApp(pomore);
    let state = useOSStore.getState();

    expect(state.windows["pomore"]).toBeUndefined();
    expect(state.windows["browser"]).toBeDefined();
    expect(state.windows["browser"].isOpen).toBe(true);
    expect(state.windows["browser"].title).toBe("Pomore Focus - Microsoft Edge");
    expect(state.activeWindowId).toBe("browser");
    expect(state.browserTabs).toHaveLength(1);
    expect(state.browserTabs[0].id).toBe("pomore");
    expect(state.browserTabs[0].url).toBe("https://pomore.rafitojuan.my.id");
    expect(state.activeTabId).toBe("pomore");

    // Open second project -> reuses browser window, adds tab, updates active tab
    useOSStore.getState().openApp(portfolio);
    state = useOSStore.getState();

    expect(state.windows["portfolio-v2"]).toBeUndefined();
    expect(state.windows["browser"]).toBeDefined();
    expect(state.browserTabs).toHaveLength(2);
    expect(state.browserTabs[1].id).toBe("portfolio-v2");
    expect(state.activeTabId).toBe("portfolio-v2");
    expect(state.windows["browser"].title).toBe("Portfolio v2 - Microsoft Edge");

    // Switch active tab
    useOSStore.getState().setActiveBrowserTab("pomore");
    state = useOSStore.getState();
    expect(state.activeTabId).toBe("pomore");
    expect(state.windows["browser"].title).toBe("Pomore Focus - Microsoft Edge");

    // Close one tab -> 1 tab remains, browser stays open
    useOSStore.getState().closeBrowserTab("pomore");
    state = useOSStore.getState();
    expect(state.browserTabs).toHaveLength(1);
    expect(state.browserTabs[0].id).toBe("portfolio-v2");
    expect(state.activeTabId).toBe("portfolio-v2");
    expect(state.windows["browser"].isOpen).toBe(true);

    // Close last tab -> browser closes and resets
    useOSStore.getState().closeBrowserTab("portfolio-v2");
    state = useOSStore.getState();
    expect(state.browserTabs).toHaveLength(0);
    expect(state.activeTabId).toBeNull();
    expect(state.windows["browser"].isOpen).toBe(false);
    expect(state.activeWindowId).toBeNull();
  });
  it("minimizes, maximizes, and closes a window", () => {
    const app: AppConfig = {
      id: "app-1",
      title: "App 1",
      icon: "globe",
      appType: "about",
    };

    useOSStore.getState().openApp(app);
    useOSStore.getState().minimizeApp("app-1");
    expect(useOSStore.getState().windows["app-1"].isMinimized).toBe(true);

    useOSStore.getState().toggleMaximizeApp("app-1");
    expect(useOSStore.getState().windows["app-1"].isMaximized).toBe(true);

    useOSStore.getState().closeApp("app-1");
    expect(useOSStore.getState().windows["app-1"].isOpen).toBe(false);
  });
});
