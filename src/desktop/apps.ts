export const apps = [
  {
    id: "inicio",
    name: "Sobre mí",
    app: "Agustín",
    title: "Mi espacio. Mi manera de crear.",
    subtitle: "Un retrato personal a través de la tecnología.",
    window: "Finder — Acerca de Agustín",
    icon: "home",
  },
  {
    id: "universo",
    name: "Mi universo",
    app: "Finder",
    title: "Las cosas que me mueven.",
    subtitle: "Ideas, herramientas e historias que forman parte de mi mundo.",
    window: "Finder — Mi universo",
    icon: "finder",
  },
  {
    id: "recorrido",
    name: "Mi recorrido",
    app: "Safari",
    title: "De aprender a crear.",
    subtitle:
      "Tres años en TIC: ideas, herramientas y proyectos que cambiaron mi forma de crear.",
    window: "Mi recorrido / 3.º a 5.º año",
    icon: "safari",
  },
  {
    id: "portal",
    name: "Portal",
    app: "Visual Studio Code",
    title: "Una idea que conecta personas.",
    subtitle:
      "Frontend / una necesidad del colegio se convierte en un proyecto.",
    window: "Portal — Un campus para conectar",
    icon: "vscode",
  },
  {
    id: "sistemas",
    name: "Sistemas",
    app: "Postman",
    title: "Lo que conecta todo.",
    subtitle: "Sistemas / de una idea a la estructura de una aplicación.",
    window: "Sistemas — Modelo de datos",
    icon: "postman",
  },
  {
    id: "3d",
    name: "3D y Malvinas",
    app: "Blender",
    title: "Ideas que toman forma.",
    subtitle: "3D / escenarios, objetos e historias que se pueden recorrer.",
    window: "Malvinas — Construir una historia",
    icon: "blender",
  },
  {
    id: "out-of-reach",
    name: "Out of Reach",
    app: "Unity",
    title: "El miedo se mezcla con la risa.",
    subtitle:
      "Out of Reach / aprender a crear experiencias para jugar con otros.",
    window: "Out of Reach — Mi proyecto más personal",
    icon: "unity",
  },
  {
    id: "ia",
    name: "Inteligencia artificial",
    app: "Python",
    title: "Aprender también es experimentar.",
    subtitle: "IA / una mirada al funcionamiento de los modelos.",
    window: "IA — Explorar y comprender",
    icon: "python",
  },
  {
    id: "metodo",
    name: "Mi método",
    app: "Terminal",
    title: "Aprender también es organizarse.",
    subtitle: "Método / del trabajo por sprints a una forma propia de crear.",
    window: "Mi método / De la idea al trabajo en equipo",
    icon: "terminal",
  },
] as const;
export type AppId = (typeof apps)[number]["id"];
export type AppDefinition = (typeof apps)[number];
export function isAppId(value: string): value is AppId {
  return apps.some((app) => app.id === value);
}
export function routeFromHash(hash: string): AppId | null {
  try {
    const key = decodeURIComponent(hash.replace(/^#\/?/, ""));
    return isAppId(key) ? key : null;
  } catch {
    return null;
  }
}
