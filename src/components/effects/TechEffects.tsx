import { useState } from "react";
import { RotateCcw } from "lucide-react";

export function DataConnections() {
  return (
    <svg className="diagram-signals" viewBox="0 0 1095 766" aria-hidden="true">
      <g fill="none" strokeWidth="2">
        <path
          className="signal-base"
          d="M340 333H458Q478 333 478 353V426H554M690 252V170Q690 150 711 150H760M676 462V582H471Q450 582 450 603V666H340"
        />
        <path
          className="signal-travel"
          d="M340 333H458Q478 333 478 353V426H554M690 252V170Q690 150 711 150H760M676 462V582H471Q450 582 450 603V666H340"
        />
      </g>
      <g className="signal-nodes" fill="#82ddd4">
        {[
          [340, 333],
          [554, 426],
          [760, 150],
          [340, 666],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="4"
            style={{ animationDelay: `${i * 0.28}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
export function NeuralSignals() {
  return (
    <svg
      className="diagram-signals neural-signals"
      viewBox="0 0 657 380"
      aria-hidden="true"
    >
      <g fill="none" stroke="#375bd2" strokeWidth="2.3">
        {[
          "M61 46L278 178L420 178L572 178",
          "M61 118L278 178L420 178L572 178",
          "M61 200L278 178L420 178L572 178",
          "M61 320L278 178L420 178L572 178",
        ].map((d, i) => (
          <path
            className="neural-travel"
            key={d}
            d={d}
            style={{ animationDelay: `${i * 0.24}s` }}
          />
        ))}
      </g>
      <circle
        className="neural-output"
        cx="580"
        cy="178"
        r="9"
        fill="none"
        stroke="#375bd2"
        strokeWidth="2"
      />
    </svg>
  );
}
export function ReplayEffect({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [iteration, setIteration] = useState(0);
  return (
    <div className="replay-effect">
      <div key={iteration} className="effect-canvas">
        {children}
      </div>
      <button
        className="effect-replay"
        onClick={() => setIteration((i) => i + 1)}
      >
        <RotateCcw size={13} />
        {label}
      </button>
    </div>
  );
}
