import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LockScreen from "@/components/os/LockScreen";
import { useOSStore } from "@/store/useOSStore";

describe("LockScreen", () => {
  beforeEach(() => {
    useOSStore.setState({
      isLocked: true,
      isStartOpen: false,
      windows: {},
      activeWindowId: null,
      highestZIndex: 10,
    });
  });

  it("renders clock, date, and data-testid='lock-screen' when isLocked: true", () => {
    render(<LockScreen />);

    expect(screen.getByTestId("lock-screen")).toBeDefined();
    // Clock container or time display
    expect(screen.getByTestId("lock-clock")).toBeDefined();
    expect(screen.getByTestId("lock-date")).toBeDefined();
  });

  it("reveals 'USER' and 'Sign in' button on click", () => {
    render(<LockScreen />);

    expect(screen.queryByText("USER")).toBeNull();
    expect(screen.queryByRole("button", { name: /sign in/i })).toBeNull();

    fireEvent.click(screen.getByTestId("lock-screen"));

    expect(screen.getByText("USER")).toBeDefined();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDefined();
  });

  it("calls unlock() when clicking 'Sign in'", () => {
    render(<LockScreen />);

    fireEvent.click(screen.getByTestId("lock-screen"));

    const signInBtn = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInBtn);

    expect(useOSStore.getState().isLocked).toBe(false);
  });

  it("renders null when isLocked: false", () => {
    useOSStore.setState({ isLocked: false });
    const { container } = render(<LockScreen />);
    expect(container.firstChild).toBeNull();
  });
});
