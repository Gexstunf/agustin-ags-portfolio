import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { Check, GripVertical, ChevronRight } from "lucide-react";
const columns = ["Por hacer", "En curso", "Para revisar"];
interface Task {
  id: string;
  name: string;
  column: number;
}
function columnAtPoint(point: PanInfo["point"]) {
  for (const el of document.querySelectorAll<HTMLElement>(
    "[data-sprint-column]",
  )) {
    const r = el.getBoundingClientRect();
    if (
      point.x >= r.left &&
      point.x <= r.right &&
      point.y >= r.top &&
      point.y <= r.bottom
    )
      return Number(el.dataset.sprintColumn);
  }
  return null;
}
export function AnimatedTaskCard({
  task,
  checked,
  toggle,
  move,
  highlight,
}: {
  task: Task;
  checked: boolean;
  toggle: () => void;
  move: (id: string, column: number) => void;
  highlight: (column: number | null) => void;
}) {
  const controls = useDragControls();
  const reduced = useReducedMotion();
  const [dragging, setDragging] = useState(false);
  return (
    <motion.div
      layout={!reduced}
      className={`sprint-task ${checked ? "done" : ""} ${dragging ? "dragging" : ""}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: reduced ? 0 : 0.18 }}
      drag
      dragListener={false}
      dragControls={controls}
      dragSnapToOrigin
      dragMomentum={false}
      onDragStart={() => setDragging(true)}
      onDrag={(_, info) => highlight(columnAtPoint(info.point))}
      onDragEnd={(_, info) => {
        setDragging(false);
        highlight(null);
        const column = columnAtPoint(info.point);
        if (column !== null && column !== task.column) move(task.id, column);
      }}
    >
      <button
        className="task-drag-handle"
        aria-label={`Arrastrar ${task.name}`}
        tabIndex={-1}
        onPointerDown={(e) => controls.start(e)}
      >
        <GripVertical size={13} />
      </button>
      <button className="task-toggle" aria-pressed={checked} onClick={toggle}>
        <span className="task-check">
          <AnimatePresence>
            {checked && (
              <motion.span
                initial={{ scale: 0.3 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check size={12} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        {task.name}
      </button>
      <button
        className="move-task"
        aria-label={`Mover ${task.name} a ${columns[(task.column + 1) % 3]}`}
        title={`Mover a ${columns[(task.column + 1) % 3]}`}
        onClick={() => move(task.id, (task.column + 1) % 3)}
      >
        <ChevronRight size={13} />
      </button>
    </motion.div>
  );
}
