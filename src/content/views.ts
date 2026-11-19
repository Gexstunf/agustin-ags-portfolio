import type { AppId } from "../desktop/apps";
export const sectionViews: Record<AppId, string[]> = {
  inicio: ["Sobre mí", "Código"],
  universo: ["Intereses", "Herramientas"],
  recorrido: ["Portal", "Out of Reach", "Malvinas", "Mi evolución"],
  portal: ["La idea", "Mi aporte", "Interfaz"],
  sistemas: ["Modelo", "Relaciones"],
  "3d": ["Malvinas", "Personaje", "Escena"],
  "out-of-reach": [
    "El juego",
    "Mi aporte",
    "Multijugador",
    "Aprendizaje",
    "Entre amigos",
  ],
  ia: ["Perceptrón", "Validación", "Cómo la uso"],
  metodo: ["Mi método", "Sprint", "Pasos"],
};
