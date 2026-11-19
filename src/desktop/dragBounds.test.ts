import { describe, it, expect } from "vitest";
import { desktopDragBounds } from "./dragBounds";
describe("Desktop-wide dragging", () => {
  it("lets a window reach both edges while retaining a visible title bar", () => {
    const r = { left: 180, top: 220, width: 1000 };
    const b = desktopDragBounds(r, { width: 1366, height: 900 });
    expect(r.left + b.left + r.width).toBe(96);
    expect(r.left + b.right).toBe(1270);
    expect(r.top + b.top).toBe(38);
    expect(r.top + b.bottom).toBe(812);
  });
  it("expands the range with the viewport instead of using a fixed small region", () => {
    const r = { left: 100, top: 180, width: 900 };
    expect(
      desktopDragBounds(r, { width: 1920, height: 1080 }).right,
    ).toBeGreaterThan(desktopDragBounds(r, { width: 1280, height: 800 }).right);
  });
});
