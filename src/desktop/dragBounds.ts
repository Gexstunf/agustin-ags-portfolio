export function desktopDragBounds(
  rect: { left: number; top: number; width: number },
  viewport: { width: number; height: number },
) {
  return {
    left: 96 - rect.left - rect.width,
    right: viewport.width - 96 - rect.left,
    top: 38 - rect.top,
    bottom: viewport.height - 88 - rect.top,
  };
}
