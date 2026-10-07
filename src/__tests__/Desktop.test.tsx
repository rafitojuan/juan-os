import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Desktop from "@/components/os/Desktop";
import { useOSStore } from "@/store/useOSStore";
import { DEFAULT_APPS, PROJECTS } from "@/config/projects";

describe("Desktop Component", () => {
  beforeEach(() => {
    useOSStore.setState({
      isLocked: false,
      isStartOpen: false,
      windows: {},
      activeWindowId: null,
      highestZIndex: 10,
      browserTabs: [],
      activeTabId: null,
    });
  });

  it("renders desktop shortcuts for default apps and projects", () => {
    render(<Desktop />);

    expect(screen.getByText("About Rafito Juan")).toBeDefined();
    PROJECTS.forEach((p) => {
      expect(screen.getByText(p.title)).toBeDefined();
    });
  });

  it("double clicking a shortcut opens window in useOSStore", () => {
    render(<Desktop />);

    const shortcut = screen.getByText("About Rafito Juan");
    fireEvent.doubleClick(shortcut);

    const state = useOSStore.getState();
    expect(state.windows["about-me"]).toBeDefined();
    expect(state.windows["about-me"].isOpen).toBe(true);

    // Verify window is rendered
    expect(screen.getByRole("heading", { name: /rafito juan/i })).toBeDefined();
  });

  it("renders Taskbar with Start button and pinned apps", () => {
    render(<Desktop />);

    const startBtn = screen.getByRole("button", { name: /start/i });
    expect(startBtn).toBeDefined();

    // Verify pinned apps exist on taskbar
    expect(screen.getByTitle("File Explorer")).toBeDefined();
    expect(screen.getByTitle("Settings")).toBeDefined();
    expect(screen.getByTitle("Microsoft Store")).toBeDefined();

    // Verify other apps are not on taskbar when closed
    expect(screen.queryByTitle("Terminal")).toBeNull();
    expect(screen.queryByTitle("About Rafito Juan")).toBeNull();
    PROJECTS.forEach((p) => {
      expect(screen.queryByTitle(p.title)).toBeNull();
    });
  });

  it("clicking Start button toggles StartMenu", () => {
    render(<Desktop />);

    const startBtn = screen.getByRole("button", { name: /start/i });
    expect(screen.queryByTestId("start-menu")).toBeNull();

    fireEvent.click(startBtn);
    expect(screen.getByTestId("start-menu")).toBeDefined();
    expect(screen.getByPlaceholderText(/type here to search/i)).toBeDefined();

    // Clicking empty desktop surface closes StartMenu
    const desktopSurface = screen.getByTestId("desktop-surface");
    fireEvent.click(desktopSurface);
    expect(screen.queryByTestId("start-menu")).toBeNull();
  });

  it("clicking lock button in StartMenu locks OS", () => {
    useOSStore.setState({ isStartOpen: true });
    render(<Desktop />);

    const lockBtn = screen.getByRole("button", { name: /lock/i });
    fireEvent.click(lockBtn);

    expect(useOSStore.getState().isLocked).toBe(true);
  });

  it("double-clicking project shortcuts opens browser window with tabs", () => {
    render(<Desktop />);

    const pomoreShortcut = screen.getByTestId("desktop-shortcut-pomore");
    fireEvent.doubleClick(pomoreShortcut);

    let state = useOSStore.getState();
    expect(state.windows["browser"]).toBeDefined();
    expect(state.windows["browser"].isOpen).toBe(true);
    expect(state.windows["pomore"]).toBeUndefined();
    expect(state.browserTabs).toHaveLength(1);
    expect(state.browserTabs[0].id).toBe("pomore");

    // Double-click another project shortcut
    const portfolioShortcut = screen.getByTestId("desktop-shortcut-portfolio-v2");
    fireEvent.doubleClick(portfolioShortcut);

    state = useOSStore.getState();
    expect(state.windows["portfolio-v2"]).toBeUndefined();
    expect(state.browserTabs).toHaveLength(2);
    expect(state.browserTabs[1].id).toBe("portfolio-v2");
    expect(state.activeTabId).toBe("portfolio-v2");

    // Verify browser window is rendered with tab bar
    expect(screen.getByTestId("browser-tab-bar")).toBeDefined();
    expect(screen.getByTestId("browser-tab-pomore")).toBeDefined();
    expect(screen.getByTestId("browser-tab-portfolio-v2")).toBeDefined();
  });
});
