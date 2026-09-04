import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectViewer from "@/components/apps/ProjectViewer";

describe("ProjectViewer", () => {
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
});
