import { useEffect, useRef, useState } from "react";
import { Search, X, ZoomIn, ZoomOut, Command } from "lucide-react";
import { apps, type AppId } from "../desktop/apps";
import type { MediaItem } from "./Media";
import { AppIcon } from "./AppIcon";
interface Props {
  kind: "search" | "help" | MediaItem;
  close: () => void;
  open: (id: AppId) => void;
}
export function Overlay({ kind, close, open }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    dialog?.querySelector("input")?.focus();
    return () => dialog?.close();
  }, []);
  const media = typeof kind === "object" ? kind : null;
  return (
    <dialog
      ref={ref}
      className={`overlay ${media ? "lightbox" : kind === "search" ? "command-dialog" : "help-dialog"}`}
      aria-label={
        media
          ? media.alt
          : kind === "search"
            ? "Buscar una sección"
            : "Cómo recorrer este portfolio"
      }
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="overlay-inner">
        <header>
          <span>
            {media
              ? "Vista ampliada"
              : kind === "search"
                ? "Buscar en mi espacio"
                : "Bienvenido a mi espacio"}
          </span>
          <div className="overlay-actions">
            {media && (
              <>
                <button
                  aria-label="Reducir imagen"
                  disabled={zoom === 1}
                  onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
                >
                  <ZoomOut size={19} />
                </button>
                <span className="mono">{zoom * 100}%</span>
                <button
                  aria-label="Ampliar imagen"
                  disabled={zoom === 3}
                  onClick={() => setZoom((z) => Math.min(3, z + 0.5))}
                >
                  <ZoomIn size={19} />
                </button>
              </>
            )}
            <button onClick={close} aria-label="Cerrar vista">
              <X size={21} />
            </button>
          </div>
        </header>
        {media ? (
          <>
            <div className="zoom-canvas">
              <img
                src={media.src}
                alt={media.alt}
                style={{ width: `${zoom * 100}%`, maxWidth: "none" }}
              />
            </div>
            <p className="lightbox-caption">{media.caption ?? media.alt}</p>
          </>
        ) : kind === "search" ? (
          <>
            <label className="search-input">
              <Search size={22} />
              <input
                autoFocus
                placeholder="¿Qué querés explorar?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd>Esc</kbd>
            </label>
            <div className="command-results">
              {apps
                .filter((a) =>
                  `${a.name} ${a.title}`
                    .toLocaleLowerCase("es")
                    .includes(query.toLocaleLowerCase("es")),
                )
                .map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      open(a.id);
                      close();
                    }}
                  >
                    <AppIcon icon={a.icon} />
                    <span>{a.name}</span>
                    <span className="subtle">Abrir</span>
                  </button>
                ))}
              {!apps.some((a) =>
                `${a.name} ${a.title}`
                  .toLocaleLowerCase("es")
                  .includes(query.toLocaleLowerCase("es")),
              ) && (
                <p className="empty-search">
                  No encontré esa sección. Probá con «proyectos», «Portal» o
                  «método».
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="help-content">
            <h2>
              Un escritorio.
              <br />
              Mi recorrido en TIC.
            </h2>
            <p>
              Abrí las secciones desde el dock o explorá los tres proyectos de
              mi recorrido.
            </p>
            <div className="help-controls">
              <span className="traffic red" />
              <p>
                <strong>Cerrar</strong> una ventana. Podés volver a abrirla
                desde el dock.
              </p>
              <span className="traffic yellow" />
              <p>
                <strong>Minimizar</strong> y recuperar la ventana desde su
                icono.
              </p>
              <span className="traffic green" />
              <p>
                <strong>Ampliar</strong> la ventana para ver mejor su contenido.
              </p>
            </div>
            <p>
              En computadora, arrastrá la barra de una ventana para moverla.
              Pulsá una imagen para ampliarla.
            </p>
            <p className="shortcut-note">
              <Command size={16} /> Ctrl / ⌘ + K para buscar una sección.
            </p>
            <button
              className="primary"
              onClick={() => {
                open("recorrido");
                close();
              }}
            >
              Empezar por mi recorrido
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
