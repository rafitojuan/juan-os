import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ProjectViewer from "@/components/apps/ProjectViewer";
import { useOSStore } from "@/store/useOSStore";

describe("ProjectViewer", () => {
  beforeEach(() => {
    useOSStore.setState({
      browserTabs: [],
      activeTabId: null,
      windows: {},
      activeWindowId: null,
    });
  });
  it("renders navigation bar, iframe, and external link", () => {
    render(
      <ProjectViewer
        url="https://rafitojuan.vercel.app"
        title="Portfolio v2"
      />
    );

    expect(screen.getByDisplayValue("https://rafitojuan.vercel.app")).toBeDefined();
    const externalLink = screen.getByRole("link", { name: /open external/i });
    expect(externalLink.getAttribute("href")).toBe("https://rafitojuan.vercel.app");
    expect(externalLink.getAttribute("target")).toBe("_blank");
    expect(externalLink.getAttribute("rel")).toContain("noopener");
    const iframe = screen.getByTitle("Portfolio v2");
    expect(iframe).toBeDefined();
    expect(iframe.getAttribute("src")).toBe("https://rafitojuan.vercel.app");
  });

  it("renders fallback message when url is undefined", () => {
    render(<ProjectViewer title="No URL Project" />);
    expect(screen.getByText(/No URL configured/i)).toBeDefined();
  });

  it("renders tabs from store, switches active tab, and closes tabs", () => {
    useOSStore.setState({
      browserTabs: [
        { id: "pomore", title: "Pomore Focus", url: "https://pomore.rafitojuan.my.id", icon: "/icons/alarm.png" },
        { id: "portfolio-v2", title: "Portfolio v2", url: "https://portfolio.rafitojuan.my.id", icon: "/icons/edge.png" },
      ],
      activeTabId: "pomore",
      windows: {
        browser: {
          id: "browser",
          title: "Pomore Focus - Microsoft Edge",
          icon: "/icons/edge.png",
          appType: "browser",
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 10,
          position: { x: 48, y: 48 },
          size: { width: 960, height: 600 },
        },
      },
      activeWindowId: "browser",
    });

    render(<ProjectViewer />);

    // Both tabs are rendered in the tab bar
    const pomoreTab = screen.getByTestId("browser-tab-pomore");
    const portfolioTab = screen.getByTestId("browser-tab-portfolio-v2");
    expect(pomoreTab).toBeDefined();
    expect(portfolioTab).toBeDefined();

    // Both iframes exist; active is visible, inactive is hidden
    const pomoreIframe = screen.getByTitle("Pomore Focus");
    const portfolioIframe = screen.getByTitle("Portfolio v2");
    expect(pomoreIframe.classList.contains("block")).toBe(true);
    expect(portfolioIframe.classList.contains("hidden")).toBe(true);

    // Click on the second tab to switch active tab
    fireEvent.click(portfolioTab);
    expect(useOSStore.getState().activeTabId).toBe("portfolio-v2");

    // Close the pomore tab
    const pomoreCloseBtn = within(pomoreTab).getByRole("button", { name: /close tab/i });
    fireEvent.click(pomoreCloseBtn);
    expect(useOSStore.getState().browserTabs).toHaveLength(1);
    expect(useOSStore.getState().browserTabs[0].id).toBe("portfolio-v2");
});
});
