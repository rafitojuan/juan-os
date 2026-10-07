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
});
