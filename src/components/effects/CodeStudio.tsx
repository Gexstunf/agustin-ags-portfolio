import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useSceneEffects } from "./SceneEffects";

const sample = `const agustin = {
  curiosidad: true,
  crear: ["código", "diseño"],
  trabajar: "en equipo",
  futuro: "Seguir aprendiendo"
};`;
function Syntax({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/("[^"\n]*"|\b(?:const|true|function|return)\b)/g)
        .map((token, i) => (
          <span
            key={i}
            className={
              token.startsWith('"')
                ? "code-string"
                : /^(const|true|function|return)$/.test(token)
                  ? "code-keyword"
                  : undefined
            }
          >
            {token}
          </span>
        ))}
    </>
  );
}
export function CodeStudio({ explore }: { explore: () => void }) {
  const enabled = useSceneEffects();
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled || count >= sample.length) return;
    const timer = setTimeout(
      () => setCount((n) => Math.min(sample.length, n + 2)),
      28,
    );
    return () => clearTimeout(timer);
  }, [enabled, count]);
  const display = reduced ? sample : sample.slice(0, count);
  return (
    <section
      className="code-studio"
      aria-label="Ejemplo visual de código sobre Agustín"
    >
      <div className="code-window">
        <div className="code-title">
          <i />
          <i />
          <i />
          <span>ags / mi-espacio.ts</span>
          <button
            onClick={() => setCount(0)}
            aria-label="Repetir escritura del código"
            title="Repetir escritura"
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="live-code-body" aria-hidden="true">
          <div className="code-lines">
            {Array.from({ length: sample.split("\n").length }, (_, i) => (
              <span
                key={i}
                className={
                  i === display.split("\n").length - 1
                    ? "code-current-line"
                    : undefined
                }
              >
                {i + 1}
              </span>
            ))}
          </div>
          <pre>
            <code>
              <Syntax text={display} />
              <span className="typing-cursor" />
            </code>
          </pre>
        </div>
        <div className="typing-progress" aria-hidden="true">
          <span
            style={{ width: `${(reduced ? 1 : count / sample.length) * 100}%` }}
          />
        </div>
        <div className="code-status mono">
          <span>TypeScript</span>
          <span>
            {count >= sample.length || !enabled
              ? "Listo para seguir creando"
              : "Escribiendo…"}
          </span>
        </div>
      </div>
      <div className="code-studio-footer">
        <p className="mono">Pensar / construir / explorar</p>
        <button className="text-button" onClick={explore}>
          Conocé mi universo
        </button>
      </div>
    </section>
  );
}
