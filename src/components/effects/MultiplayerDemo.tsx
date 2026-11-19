import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Box, Plus, MoveHorizontal, Trash2, Check, Radio } from "lucide-react";
import { useSceneEffects } from "./SceneEffects";
interface SharedObject {
  id: number;
  position: number;
}
const positions = ["12%", "42%", "68%"];
function Player({
  name,
  object,
}: {
  name: string;
  object: SharedObject | null;
}) {
  const reduced = useReducedMotion();
  const running = useSceneEffects();
  const staticMotion = reduced || !running;
  return (
    <div className="replica-player">
      <div className="replica-player-label">
        <Radio size={14} />
        <span>{name}</span>
      </div>
      <div className="replica-arena">
        <div className="arena-grid" />
        <AnimatePresence mode="sync">
          {object && (
            <motion.div
              key={object.id}
              className={`replica-object tone-${object.id % 3}`}
              initial={
                staticMotion ? false : { opacity: 0, scale: 0.4, y: -20 }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                left: positions[object.position],
              }}
              exit={{
                opacity: 0,
                scale: staticMotion ? 1 : 0.4,
                y: staticMotion ? 0 : 15,
              }}
              transition={
                staticMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 280, damping: 23 }
              }
              aria-label={`Objeto ${object.id}, posición ${object.position + 1}`}
            >
              <Box size={34} strokeWidth={1.5} />
              <span>#{String(object.id).padStart(2, "0")}</span>
            </motion.div>
          )}
        </AnimatePresence>
        {!object && <span className="arena-empty">Sin objetos</span>}
      </div>
      <p className="replica-object-state">
        {object
          ? `Objeto ${String(object.id).padStart(2, "0")} · posición ${object.position + 1}`
          : "Escenario vacío"}
      </p>
    </div>
  );
}
export function SyncDemo() {
  const enabled = useSceneEffects();
  const [local, setLocal] = useState<SharedObject | null>({
    id: 1,
    position: 0,
  });
  const [remote, setRemote] = useState<SharedObject | null>(null);
  const [nextId, setNextId] = useState(2);
  useEffect(() => {
    const timer = setTimeout(() => setRemote(local), enabled ? 550 : 0);
    return () => clearTimeout(timer);
  }, [local, enabled]);
  const pending =
    local?.id !== remote?.id || local?.position !== remote?.position;
  return (
    <section
      className="replication-demo"
      aria-label="Simulación visual de sincronización multijugador"
    >
      <div className="replication-header">
        <span className="mono lavender">
          Ejemplo visual / estado compartido
        </span>
        <span
          className={`replication-status ${pending ? "pending" : ""}`}
          role="status"
        >
          {pending ? <Radio size={13} /> : <Check size={13} />}{" "}
          {pending ? "Sincronizando" : "Sincronizado"}
        </span>
      </div>
      <div className="replication-players">
        <Player name="Jugador 1" object={local} />
        <div className="replication-wire" aria-hidden="true">
          <span className={pending && enabled ? "packet-moving" : ""} />
        </div>
        <Player name="Jugador 2" object={remote} />
      </div>
      <div className="replication-actions">
        <button
          disabled={pending}
          onClick={() => {
            setLocal({ id: nextId, position: 0 });
            setNextId((n) => n + 1);
          }}
        >
          <Plus size={16} />
          {local ? "Crear otro" : "Crear objeto"}
        </button>
        <button
          disabled={!local || pending}
          onClick={() =>
            setLocal((prev) =>
              prev ? { ...prev, position: (prev.position + 1) % 3 } : null,
            )
          }
        >
          <MoveHorizontal size={16} />
          Mover
        </button>
        <button disabled={!local || pending} onClick={() => setLocal(null)}>
          <Trash2 size={15} />
          Eliminar
        </button>
      </div>
    </section>
  );
}
