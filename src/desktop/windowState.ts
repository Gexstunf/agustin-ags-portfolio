import type { AppId } from "./apps";
export interface WindowState {
  id: AppId;
  minimized: boolean;
  maximized: boolean;
  order: number;
}
export interface DesktopState {
  windows: WindowState[];
  active: AppId | null;
  sequence: number;
}
export type WindowAction = {
  type: "open" | "focus" | "close" | "minimize" | "maximize";
  id: AppId;
};
export function createDesktop(initial: AppId | null): DesktopState {
  return {
    windows: initial
      ? [{ id: initial, minimized: false, maximized: false, order: 1 }]
      : [],
    active: initial,
    sequence: 1,
  };
}
export function windowReducer(
  state: DesktopState,
  action: WindowAction,
): DesktopState {
  const target = state.windows.find((w) => w.id === action.id);
  if (action.type === "open" || action.type === "focus") {
    if (action.type === "focus" && !target) return state;
    const sequence = state.sequence + 1;
    return {
      sequence,
      active: action.id,
      windows: target
        ? state.windows.map((w) =>
            w.id === action.id
              ? { ...w, minimized: false, order: sequence }
              : w,
          )
        : [
            ...state.windows,
            {
              id: action.id,
              minimized: false,
              maximized: false,
              order: sequence,
            },
          ],
    };
  }
  if (!target) return state;
  if (action.type === "maximize")
    return {
      ...state,
      windows: state.windows.map((w) =>
        w.id === action.id ? { ...w, maximized: !w.maximized } : w,
      ),
    };
  const windows =
    action.type === "close"
      ? state.windows.filter((w) => w.id !== action.id)
      : state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w,
        );
  const active =
    state.active === action.id
      ? (windows
          .filter((w) => !w.minimized)
          .sort((a, b) => b.order - a.order)[0]?.id ?? null)
      : state.active;
  return { ...state, windows, active };
}
