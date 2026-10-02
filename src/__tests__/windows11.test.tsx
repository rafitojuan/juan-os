import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Desktop from "@/components/os/Desktop";
import { getAppIcon } from "@/components/os/StartMenu";
import { SYSTEM_APPS, PROJECTS, DEFAULT_APPS } from "@/config/projects";
import { useOSStore } from "@/store/useOSStore";

describe("Windows 11 Experience & Assets", () => {
  beforeEach(() => {
    useOSStore.setState({
      isLocked: false,
      isStartOpen: false,
      windows: {},
      activeWindowId: null,
      highestZIndex: 10,
    });
  });

  it("configures official Windows 11 system apps with correct asset paths", () => {
    const explorer = SYSTEM_APPS.find((a) => a.id === "file-explorer");
    const settings = SYSTEM_APPS.find((a) => a.id === "settings");
    const terminal = SYSTEM_APPS.find((a) => a.id === "terminal");
    const store = SYSTEM_APPS.find((a) => a.id === "microsoft-store");
    const bin = SYSTEM_APPS.find((a) => a.id === "recycle-bin");

    expect(explorer?.icon).toBe("/icons/explorer.png");
    expect(settings?.icon).toBe("/icons/settings.png");
    expect(terminal?.icon).toBe("/icons/terminal.png");
    expect(store?.icon).toBe("/icons/store.png");
    expect(bin?.icon).toBe("/icons/bin.png");
  });

  it("getAppIcon renders an img element for asset paths and legacy names", () => {
    const { container: directContainer } = render(<div>{getAppIcon("/icons/windows.svg")}</div>);
    const directImg = directContainer.querySelector("img");
    expect(directImg).not.toBeNull();
    expect(directImg?.getAttribute("src")).toBe("/icons/windows.svg");

    const { container: legacyContainer } = render(<div>{getAppIcon("globe")}</div>);
    const legacyImg = legacyContainer.querySelector("img");
    expect(legacyImg).not.toBeNull();
    expect(legacyImg?.getAttribute("src")).toBe("/icons/edge.png");
  });

  it("renders desktop shortcuts including Recycle Bin and File Explorer", () => {
    render(<Desktop />);

    expect(screen.getByText("Recycle Bin")).toBeDefined();
    expect(screen.getByText("File Explorer")).toBeDefined();
    expect(screen.getByText("Terminal")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("opening File Explorer renders file explorer view inside window", () => {
    render(<Desktop />);

    const explorerShortcut = screen.getByText("File Explorer");
    fireEvent.doubleClick(explorerShortcut);

    expect(screen.getByText("This PC > Juan Projects")).toBeDefined();
    expect(screen.getByText("Quick Access")).toBeDefined();
  });

  it("opening Terminal renders interactive command prompt inside window", () => {
    render(<Desktop />);

    const terminalShortcut = screen.getByText("Terminal");
    fireEvent.doubleClick(terminalShortcut);

    expect(screen.getByText(/Windows PowerShell/i)).toBeDefined();
    expect(screen.getByText(/juanOS Terminal/i)).toBeDefined();
  });

  it("opening Settings renders system personalization options", () => {
    render(<Desktop />);

    const settingsShortcut = screen.getByText("Settings");
    fireEvent.doubleClick(settingsShortcut);

    expect(screen.getAllByText("System").length).toBeGreaterThan(0);
    expect(screen.getByText("Personalization")).toBeDefined();
    expect(screen.getByText("About juanOS")).toBeDefined();
  });
});
