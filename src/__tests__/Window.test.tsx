import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Window from "@/components/os/Window";
import { useOSStore } from "@/store/useOSStore";
import { WindowState } from "@/types/os";

describe("Window Component", () => {
  const mockWindow: WindowState = {
    id: "win-test",
    title: "Test Window",
    icon: "globe",
    appType: "about",
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 15,
    position: { x: 100, y: 100 },
    size: { width: 500, height: 400 },
  };

  beforeEach(() => {
    useOSStore.setState({
      windows: { [mockWindow.id]: { ...mockWindow } },
      activeWindowId: mockWindow.id,
      highestZIndex: 15,
    });
  });

  it("renders title, content, minimize, maximize, and close buttons", () => {
    render(
      <Window window={mockWindow}>
        <div>Window Inner Content</div>
      </Window>
    );

    expect(screen.getByText("Test Window")).toBeDefined();
    expect(screen.getByText("Window Inner Content")).toBeDefined();

    const minBtn = screen.getByLabelText("Minimize");
    const maxBtn = screen.getByLabelText("Maximize");
    const closeBtn = screen.getByLabelText("Close");

    expect(minBtn).toBeDefined();
    expect(maxBtn).toBeDefined();
    expect(closeBtn).toBeDefined();
  });

  it("clicking minimize button sets isMinimized to true in useOSStore", () => {
    render(
      <Window window={mockWindow}>
        <div>Window Inner Content</div>
      </Window>
    );

    const minBtn = screen.getByLabelText("Minimize");
    fireEvent.click(minBtn);

    expect(useOSStore.getState().windows["win-test"].isMinimized).toBe(true);
  });

  it("clicking close button sets isOpen to false in useOSStore", () => {
    render(
      <Window window={mockWindow}>
        <div>Window Inner Content</div>
      </Window>
    );

    const closeBtn = screen.getByLabelText("Close");
    fireEvent.click(closeBtn);

    expect(useOSStore.getState().windows["win-test"].isOpen).toBe(false);
  });
});
