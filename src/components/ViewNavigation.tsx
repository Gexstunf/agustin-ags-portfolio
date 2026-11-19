import { ChevronLeft, ChevronRight } from "lucide-react";
export function ViewNavigation({
  labels,
  index,
  onChange,
  name,
}: {
  labels: string[];
  index: number;
  onChange: (index: number) => void;
  name: string;
}) {
  return (
    <nav className="view-navigation" aria-label={`Vistas de ${name}`}>
      <div className="view-buttons">
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => onChange(i)}
            aria-current={i === index ? "page" : undefined}
          >
            {label}
          </button>
        ))}
      </div>
      <label className="view-select">
        <span className="sr-only">Vista de {name}</span>
        <select
          value={index}
          onChange={(e) => onChange(Number(e.target.value))}
        >
          {labels.map((label, i) => (
            <option key={label} value={i}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <div className="view-pagination">
        <button
          aria-label="Vista anterior"
          disabled={index === 0}
          onClick={() => onChange(index - 1)}
        >
          <ChevronLeft size={16} />
        </button>
        <span className="mono" aria-live="polite">
          {index + 1} / {labels.length}
        </span>
        <button
          aria-label="Vista siguiente"
          disabled={index === labels.length - 1}
          onClick={() => onChange(index + 1)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
