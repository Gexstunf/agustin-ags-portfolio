import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

const EffectsContext = createContext(false);
export function useSceneEffects() {
  return useContext(EffectsContext);
}
export function SceneEffects({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const running = enabled && !reduced && visible;
  return (
    <EffectsContext.Provider value={running}>
      <div className="scene-effects" data-effects={running ? "on" : "off"}>
        {children}
      </div>
    </EffectsContext.Provider>
  );
}
