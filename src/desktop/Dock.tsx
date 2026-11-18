import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { apps, type AppId } from "./apps";
import type { DesktopState } from "./windowState";
import { AppIcon } from "../components/AppIcon";
export function Dock({
  state,
  open,
  help,
}: {
  state: DesktopState;
  open: (id: AppId) => void;
  help: () => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  return (
    <motion.nav
      className="dock"
      aria-label="Aplicaciones del portfolio"
      initial={reduced ? false : { y: 70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 27, delay: 0.15 }}
      ref={ref}
      onPointerLeave={() => setHover(null)}
    >
      {apps.map((app, i) => {
        const win = state.windows.find((w) => w.id === app.id);
        const distance = hover === null ? 9 : Math.abs(hover - i);
        const scale = reduced
          ? 1
          : distance === 0
            ? 1.24
            : distance === 1
              ? 1.1
              : 1;
        return (
          <motion.button
            className={`dock-item ${state.active === app.id ? "selected" : ""} ${win?.minimized ? "minimized" : ""}`}
            key={app.id}
            data-app={app.id}
            onClick={() => open(app.id)}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setHover(i);
            }}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            aria-label={app.name}
            aria-current={state.active === app.id ? "page" : undefined}
            animate={{ scale, y: hover === i && !reduced ? -8 : 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
          >
            <span className="dock-tooltip">
              {app.name}
              {win?.minimized ? " · Minimizada" : ""}
            </span>
            <AppIcon icon={app.icon} />
            {win && <span className="running-dot" />}
          </motion.button>
        );
      })}
      <span className="dock-separator" />
      <button
        className="dock-help"
        aria-label="Cómo usar el portfolio"
        onClick={help}
      >
        <span>?</span>
        <span className="dock-tooltip">Cómo recorrerlo</span>
      </button>
    </motion.nav>
  );
}
