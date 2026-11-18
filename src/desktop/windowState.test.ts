import { describe, it, expect } from "vitest";
import { createDesktop, windowReducer } from "./windowState";
import { routeFromHash } from "./apps";
describe("Desktop window lifecycle", () => {
  it("restores a minimized window without creating duplicates", () => {
    let s = createDesktop("inicio");
    s = windowReducer(s, { type: "open", id: "portal" });
    s = windowReducer(s, { type: "minimize", id: "portal" });
    expect(s.active).toBe("inicio");
    s = windowReducer(s, { type: "open", id: "portal" });
    expect(s.windows).toHaveLength(2);
    expect(s.windows.find((w) => w.id === "portal")?.minimized).toBe(false);
    expect(s.active).toBe("portal");
  });
  it("focuses the last visible window after closing the active one", () => {
    let s = createDesktop("inicio");
    s = windowReducer(s, { type: "open", id: "metodo" });
    s = windowReducer(s, { type: "close", id: "metodo" });
    expect(s.active).toBe("inicio");
    s = windowReducer(s, { type: "close", id: "inicio" });
    expect(s.active).toBeNull();
    expect(s.windows).toHaveLength(0);
  });
  it("does not focus a minimized window when another window closes", () => {
    let s = createDesktop("inicio");
    s = windowReducer(s, { type: "minimize", id: "inicio" });
    s = windowReducer(s, { type: "open", id: "portal" });
    s = windowReducer(s, { type: "close", id: "portal" });
    expect(s.active).toBeNull();
  });
  it("preserves maximize state while minimizing and restoring", () => {
    let s = createDesktop("inicio");
    s = windowReducer(s, { type: "maximize", id: "inicio" });
    s = windowReducer(s, { type: "minimize", id: "inicio" });
    s = windowReducer(s, { type: "open", id: "inicio" });
    expect(s.windows[0].maximized).toBe(true);
  });
  it("validates direct links", () => {
    expect(routeFromHash("#/out-of-reach")).toBe("out-of-reach");
    expect(routeFromHash("#invalid")).toBeNull();
  });
});
