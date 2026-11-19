import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { FolderOpen } from "lucide-react";
import { apps, routeFromHash, type AppId } from "./apps";
import { createDesktop, windowReducer, type WindowAction } from "./windowState";
import { AppWindow } from "./AppWindow";
import { Dock } from "./Dock";
import { MenuBar } from "./MenuBar";
import { Overlay } from "../components/Overlay";
import type { MediaItem } from "../components/Media";
export function Desktop() {
  const [state, dispatch] = useReducer(
    windowReducer,
    routeFromHash(location.hash) ?? "inicio",
    createDesktop,
  );
  const [overlay, setOverlay] = useState<"search" | "help" | MediaItem | null>(
    null,
  );
  const bounds = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const reduced = useReducedMotion();
  const active = apps.find((a) => a.id === state.active);
  const navigate = useCallback((id: AppId) => {
    dispatch({ type: "open", id });
    const hash = `#/${id}`;
    if (location.hash !== hash) history.pushState(null, "", hash);
  }, []);
  const action = useCallback((type: WindowAction["type"], id: AppId) => {
    const next = windowReducer(stateRef.current, { type, id });
    dispatch({ type, id });
    if (next.active !== stateRef.current.active) {
      history.pushState(
        null,
        "",
        next.active ? `#/${next.active}` : "#/escritorio",
      );
    }
  }, []);
  useEffect(() => {
    const update = () => {
      const id = routeFromHash(location.hash);
      if (id || !location.hash) dispatch({ type: "open", id: id ?? "inicio" });
      else if (location.hash === "#/escritorio") {
        for (const win of stateRef.current.windows)
          dispatch({ type: "minimize", id: win.id });
      }
    };
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);
  useEffect(() => {
    document.title = active
      ? `${active.name} · Agustín`
      : "Agustín · Portfolio personal";
  }, [active]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOverlay((prev) => (prev === null ? "search" : null));
      }
      if (e.altKey && /^[1-9]$/.test(e.key)) {
        e.preventDefault();
        navigate(apps[Number(e.key) - 1].id);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [navigate]);
  return (
    <MotionConfig reducedMotion="user">
      <div className="desktop">
        <div className="wallpaper" aria-hidden="true" />
        <a href="#portfolio-windows" className="skip-link">
          Ir al contenido
        </a>
        <MenuBar
          active={active}
          open={navigate}
          search={() => setOverlay("search")}
          help={() => setOverlay("help")}
          close={() => active && action("close", active.id)}
          minimize={() => active && action("minimize", active.id)}
          maximize={() => active && action("maximize", active.id)}
        />
        <main className="desktop-main">
          <div className="page-heading">
            <p className="owner mono">Agustín Geonas Stunf</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active?.id ?? "escritorio"}
                initial={reduced ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
              >
                <h1>{active?.title ?? "Mi espacio. Mi manera de crear."}</h1>
                <p className="page-subtitle">
                  {active?.subtitle ??
                    "Elegí una aplicación del dock para seguir explorando."}
                </p>
              </motion.div>
            </AnimatePresence>
            <span className="section-position mono">
              {String(
                apps.findIndex((a) => a.id === state.active) + 1,
              ).padStart(2, "0")}{" "}
              / 09
            </span>
          </div>
          <div className="window-stage" id="portfolio-windows" ref={bounds}>
            <div className="desktop-empty">
              <button onClick={() => navigate("recorrido")}>
                <FolderOpen size={50} strokeWidth={1.2} />
                <span>Mi recorrido</span>
              </button>
              <p>Todo empieza con ganas de aprender.</p>
            </div>
            <AnimatePresence initial={!reduced}>
              {state.windows.map((win) => (
                <AppWindow
                  key={win.id}
                  state={win}
                  app={apps.find((a) => a.id === win.id)!}
                  active={state.active === win.id}
                  action={action}
                  open={navigate}
                  expand={setOverlay}
                  bounds={bounds}
                />
              ))}
            </AnimatePresence>
          </div>
          <footer className="desktop-footer">
            <span className="mono">Tecnología · Diseño · Exploración</span>
            <Dock
              state={state}
              open={navigate}
              help={() => setOverlay("help")}
            />
            <button
              className="footer-next"
              onClick={() =>
                navigate(
                  apps[
                    (apps.findIndex((a) => a.id === state.active) + 1) %
                      apps.length
                  ].id,
                )
              }
            >
              Siguiente /{" "}
              {
                apps[
                  (apps.findIndex((a) => a.id === state.active) + 1) %
                    apps.length
                ].name
              }
            </button>
          </footer>
        </main>
        <div className="sr-only" role="status" aria-live="polite">
          {active ? `Sección ${active.name}` : "Escritorio"}
        </div>
        {overlay && (
          <Overlay
            kind={overlay}
            close={() => setOverlay(null)}
            open={navigate}
          />
        )}
      </div>
    </MotionConfig>
  );
}
