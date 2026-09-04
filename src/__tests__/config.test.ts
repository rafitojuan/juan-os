import { describe, it, expect } from "vitest";
import { PROJECTS, DEFAULT_APPS } from "@/config/projects";

describe("OS Config", () => {
  it("has valid project definitions with id and urls", () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
    PROJECTS.forEach((p) => {
      expect(p.id).toBeDefined();
      expect(p.title).toBeDefined();
      expect(p.url).toMatch(/^https?:\/\//);
    });
  });

  it("contains about-me app in default apps", () => {
    const aboutApp = DEFAULT_APPS.find((a) => a.id === "about-me");
    expect(aboutApp).toBeDefined();
  });
});
