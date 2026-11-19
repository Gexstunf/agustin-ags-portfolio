import { useState, type DragEvent } from "react";
import { AnimatePresence } from "motion/react";
import { AnimatedTaskCard } from "./AnimatedTaskCard";
const columns = ["Por hacer", "En curso", "Para revisar"];
const initial = [
  { id: "interfaz", name: "Interfaz", column: 0 },
  { id: "objetos", name: "Objetos", column: 0 },
  { id: "escenarios", name: "Escenarios", column: 1 },
  { id: "programacion", name: "Programación", column: 1 },
  { id: "multijugador", name: "Multijugador", column: 2 },
  { id: "pruebas", name: "Pruebas", column: 2 },
];
export function SprintBoard() {
  const [tasks, setTasks] = useState(initial);
  const [checked, setChecked] = useState<string[]>([]);
  const [over, setOver] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  function move(id: string, column: number) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, column } : task)),
    );
    const task = tasks.find((t) => t.id === id);
    setAnnouncement(`${task?.name} se movió a ${columns[column]}`);
    setOver(null);
  }
  function drop(e: DragEvent, column: number) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (initial.some((task) => task.id === id)) move(id, column);
  }
  return (
    <>
      <div className="sprint-board interactive-sprint">
        {columns.map((title, column) => (
          <section
            className={over === column ? "drop-active" : ""}
            key={title}
            data-sprint-column={column}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(column);
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node))
                setOver(null);
            }}
            onDrop={(e) => drop(e, column)}
          >
            <h3>
              {title}
              <span>{tasks.filter((t) => t.column === column).length}</span>
            </h3>
            <div className="sprint-task-list">
              <AnimatePresence initial={false}>
                {tasks
                  .filter((task) => task.column === column)
                  .map((task) => (
                    <AnimatedTaskCard
                      key={task.id}
                      task={task}
                      checked={checked.includes(task.id)}
                      toggle={() =>
                        setChecked((prev) =>
                          prev.includes(task.id)
                            ? prev.filter((t) => t !== task.id)
                            : [...prev, task.id],
                        )
                      }
                      move={move}
                      highlight={setOver}
                    />
                  ))}
              </AnimatePresence>
            </div>
          </section>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </>
  );
}
