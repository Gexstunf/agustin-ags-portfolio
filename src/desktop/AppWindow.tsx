import { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import type { AppDefinition, AppId } from "./apps";
import type { WindowState } from "./windowState";
import { Sections } from "../content/Sections";
import type { MediaItem } from "../components/Media";
import { SceneEffects } from "../components/effects/SceneEffects";
import { Pause, Play } from "lucide-react";
interface Props {
  app: AppDefinition;
  state: WindowState;
  active: boolean;
  action: (
    type: "focus" | "close" | "minimize" | "maximize",
    id: AppId,
  ) => void;
  open: (id: AppId) => void;
  expand: (item: MediaItem) => void;
  bounds: RefObject<HTMLDivElement | null>;
}
export function AppWindow({
  app,
  state,
  active,
  action,
  open,
  expand,
  bounds,
}: Props) {
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduced = useReducedMotion();
  const [effectsPaused, setEffectsPaused] = useState(false);
  const [mobile, setMobile] = useState(
    () => matchMedia("(max-width: 760px)").matches,
  );
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = matchMedia("(max-width: 760px)");
    const update = () => setMobile(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (active) scroll.current?.focus({ preventScroll: true });
  }, [active]);
  const dockButton = document.querySelector(`[data-app="${app.id}"]`);
  const dockRect = dockButton?.getBoundingClientRect();
  const stageRect = bounds.current?.getBoundingClientRect();
  const origin =
    dockRect && stageRect
      ? `${dockRect.left + dockRect.width / 2 - stageRect.left}px ${dockRect.top + dockRect.height / 2 - stageRect.top}px`
      : "50% 110%";
  return (
    <motion.section
      className={`app-window ${state.maximized ? "maximized" : ""} ${active ? "is-active" : "is-inactive"}`}
      style={{
        zIndex: state.order,
        transformOrigin: origin,
        x,
        y,
        pointerEvents: state.minimized ? "none" : "auto",
      }}
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.82, filter: "blur(5px)" }
      }
      animate={
        state.minimized
          ? {
              opacity: 0,
              scale: reduced ? 1 : 0.12,
              filter: "blur(3px)",
              transitionEnd: { display: "none" },
            }
          : { display: "flex", opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      exit={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.94, filter: "blur(4px)" }
      }
      transition={{
        type: "spring",
        stiffness: 330,
        damping: 32,
        mass: 0.85,
        filter: { duration: 0.18 },
      }}
      drag={!mobile && !state.maximized}
      dragListener={false}
      dragControls={controls}
      dragConstraints={{ left: -180, right: 180, top: -20, bottom: 80 }}
      dragElastic={0.08}
      dragMomentum={false}
      onPointerDownCapture={() => {
        if (!active) action("focus", app.id);
      }}
      aria-label={app.window}
      data-window={app.id}
      aria-hidden={!active && mobile ? true : undefined}
      inert={state.minimized || (!active && mobile)}
    >
      <header
        className="window-titlebar"
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          controls.start(e);
        }}
        onDoubleClick={() => action("maximize", app.id)}
      >
        <div className="window-controls">
          <button
            className="traffic red"
            aria-label={`Cerrar ${app.name}`}
            onClick={() => action("close", app.id)}
          >
            <span>×</span>
          </button>
          <button
            className="traffic yellow"
            aria-label={`Minimizar ${app.name}`}
            onClick={() => action("minimize", app.id)}
          >
            <span>−</span>
          </button>
          <button
            className="traffic green"
            aria-label={`${state.maximized ? "Restaurar" : "Ampliar"} ${app.name}`}
            onClick={() => action("maximize", app.id)}
          >
            <span>↗</span>
          </button>
        </div>
        <span className="window-title">{app.window}</span>
        <span className="window-shortname mono">AGS</span>
        <button
          className="effects-toggle"
          aria-label={
            effectsPaused
              ? "Activar efectos visuales"
              : "Pausar efectos visuales"
          }
          title={
            effectsPaused
              ? "Activar efectos visuales"
              : "Pausar efectos visuales"
          }
          onClick={() => setEffectsPaused((paused) => !paused)}
          aria-pressed={!effectsPaused}
        >
          {effectsPaused ? <Play size={13} /> : <Pause size={13} />}
        </button>
      </header>
      <div
        className={`window-content content-${app.id}`}
        tabIndex={-1}
        ref={scroll}
        inert={!active}
      >
        <SceneEffects enabled={active && !state.minimized && !effectsPaused}>
          <Sections id={app.id} open={open} expand={expand} />
        </SceneEffects>
      </div>
    </motion.section>
  );
}
