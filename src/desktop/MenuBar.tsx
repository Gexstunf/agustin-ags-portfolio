import { useEffect, useRef, useState } from "react";
import { BatteryFull, Wifi, Search, PanelTop, Check } from "lucide-react";
import { apps, type AppId, type AppDefinition } from "./apps";
export function MenuBar({
  active,
  open,
  search,
  help,
  close,
  minimize,
  maximize,
}: {
  active: AppDefinition | undefined;
  open: (id: AppId) => void;
  search: () => void;
  help: () => void;
  close: () => void;
  minimize: () => void;
  maximize: () => void;
}) {
  const [clock, setClock] = useState(new Date());
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      ref.current?.querySelectorAll("details[open]").forEach((detail) => {
        if (!detail.contains(event.target as Node))
          detail.removeAttribute("open");
      });
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  function select(fn: () => void) {
    ref.current
      ?.querySelectorAll("details[open]")
      .forEach((d) => d.removeAttribute("open"));
    fn();
  }
  return (
    <header className="menu-bar" ref={ref}>
      <button
        className="brand-mark"
        onClick={() => open("inicio")}
        aria-label="Volver al inicio"
      >
        A<span />
      </button>
      <strong className="active-app">{active?.app ?? "Agustín"}</strong>
      <details className="menu-dropdown">
        <summary>Archivo</summary>
        <div className="menu-popover">
          {apps.map((app) => (
            <button key={app.id} onClick={() => select(() => open(app.id))}>
              <span>{app.name}</span>
              {active?.id === app.id && <Check size={15} />}
            </button>
          ))}
        </div>
      </details>
      <details className="menu-dropdown view-menu">
        <summary>Visualización</summary>
        <div className="menu-popover">
          <button disabled={!active} onClick={() => select(maximize)}>
            Ampliar / restaurar ventana
          </button>
          <button onClick={() => select(search)}>
            Buscar una sección <kbd>⌘ K</kbd>
          </button>
        </div>
      </details>
      <details className="menu-dropdown window-menu">
        <summary>Ventana</summary>
        <div className="menu-popover">
          <button disabled={!active} onClick={() => select(minimize)}>
            Minimizar ventana
          </button>
          <button disabled={!active} onClick={() => select(close)}>
            Cerrar ventana
          </button>
          <button onClick={() => select(() => open("recorrido"))}>
            Mostrar mi recorrido
          </button>
        </div>
      </details>
      <button className="menu-help" onClick={help}>
        Ayuda
      </button>
      <div className="menu-system">
        <button
          className="menu-search"
          onClick={search}
          aria-label="Buscar una sección"
        >
          <Search size={16} />
        </button>
        <Wifi size={16} className="system-decoration" aria-hidden="true" />
        <BatteryFull
          size={20}
          className="system-decoration"
          aria-hidden="true"
        />
        <span className="desktop-label">Portfolio TIC</span>
        <time dateTime={clock.toISOString()}>
          {new Intl.DateTimeFormat("es-AR", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }).format(clock)}
        </time>
        <PanelTop size={15} aria-hidden="true" className="system-decoration" />
      </div>
    </header>
  );
}
