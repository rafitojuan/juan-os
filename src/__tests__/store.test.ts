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
    });
  });

  it("unlocks and locks the OS", () => {
    expect(useOSStore.getState().isLocked).toBe(true);
    useOSStore.getState().unlock();
    expect(useOSStore.getState().isLocked).toBe(false);
    useOSStore.getState().lock();
    expect(useOSStore.getState().isLocked).toBe(true);
  });

  it("opens an application as a new window with proper zIndex", () => {
    const app: AppConfig = {
      id: "test-app",
      title: "Test App",
      icon: "globe",
      appType: "project",
      url: "https://example.com",
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

  it("minimizes, maximizes, and closes a window", () => {
    const app: AppConfig = {
      id: "app-1",
      title: "App 1",
      icon: "globe",
      appType: "project",
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
