import { useState } from "react";
import {
  Check,
  Code2,
  Gamepad2,
  HeartHandshake,
  Lightbulb,
  Network,
  FolderOpen,
  GraduationCap,
  Compass,
  Search,
  Layers,
  Sparkles,
} from "lucide-react";
import type { AppId } from "../desktop/apps";
import { AppIcon } from "../components/AppIcon";
import { Media, type MediaItem } from "../components/Media";
interface Props {
  id: AppId;
  open: (id: AppId) => void;
  expand: (media: MediaItem) => void;
}
const projects = [
  {
    id: "portal",
    name: "Portal",
    year: "3.º año",
    image: "portal",
    description: "Un campus para conectar alumnos y profesores.",
  },
  {
    id: "out-of-reach",
    name: "Out of Reach",
    year: "4.º año",
    image: "out-of-reach",
    description: "Terror y humor para jugar con amigos.",
  },
  {
    id: "3d",
    name: "Malvinas",
    year: "5.º año",
    image: "malvinas",
    description: "Minimisiones y relato sobre los soldados.",
  },
] as const;
function Tags({ values }: { values: string[] }) {
  return (
    <div className="tags">
      {values.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </div>
  );
}
function Home({ open }: Pick<Props, "open">) {
  return (
    <div className="home-layout">
      <div className="home-identity">
        <p className="eyebrow blue">Agustín / perfil personal</p>
        <h2 className="home-name">
          Soy
          <br />
          Agustín.
        </h2>
        <p className="lead">
          Elegí TIC para aprender a programar. Disfruto crear y organizar
          proyectos en equipo.
        </p>
        <Tags values={["Ordenado", "En equipo", "En evolución"]} />
        <p className="mono subtle disciplines">Frontend / Sistemas / 3D / IA</p>
        <button className="primary" onClick={() => open("recorrido")}>
          Explorar mi recorrido
        </button>
      </div>
      <button
        className="workspace-art"
        onClick={() => open("universo")}
        aria-label="Explorar mi universo"
      >
        <img
          className="workspace-original"
          src="/assets/workspace.svg"
          alt="Ventana de programación de mi espacio AGS"
        />
        <span className="art-hint">Conocé mi universo</span>
      </button>
    </div>
  );
}
function Universe({ open }: Pick<Props, "open">) {
  return (
    <div className="universe-layout">
      <div className="universe-intro">
        <p className="eyebrow cyan">Mi universo</p>
        <h2>
          La curiosidad
          <br />
          como punto
          <br />
          de partida.
        </h2>
        <p className="lead">
          Desde chico quería saber cómo se programan las cosas. En TIC empecé a
          convertir esa curiosidad en proyectos.
        </p>
        <button className="text-button" onClick={() => open("recorrido")}>
          Conocer mis proyectos
        </button>
      </div>
      <div className="universe-panels">
        <section className="panel">
          <p className="eyebrow blue">Herramientas para crear</p>
          <div className="tool-grid">
            {[
              {
                icon: "vscode",
                name: "Programación",
                text: "Del código a una idea que funciona.",
                id: "portal",
              },
              {
                icon: "postman",
                name: "Sistemas",
                text: "Entender cómo se organiza la información.",
                id: "sistemas",
              },
              {
                icon: "blender",
                name: "Mundos 3D",
                text: "Escenarios, objetos y nuevas historias.",
                id: "3d",
              },
              {
                icon: "python",
                name: "Exploración",
                text: "Preguntar, observar y comprender.",
                id: "ia",
              },
            ].map((tool) => (
              <button key={tool.icon} onClick={() => open(tool.id as AppId)}>
                <AppIcon icon={tool.icon} />
                <strong>{tool.name}</strong>
                <span>{tool.text}</span>
              </button>
            ))}
          </div>
        </section>
        <div className="personal-grid">
          <section className="panel">
            <HeartHandshake className="lavender" size={23} />
            <h3>Fuera de la pantalla</h3>
            <p>
              El deporte, los días cálidos y salir con amigos también forman
              parte de quién soy.
            </p>
          </section>
          <section className="panel">
            <Gamepad2 className="blue" size={23} />
            <h3>Historias que inspiran</h3>
            <p>
              R.E.P.O., Helldivers 2, Counter-Strike y Pacific Rim: mundos para
              imaginar y compartir.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
function Journey({ open }: Pick<Props, "open">) {
  return (
    <div className="journey">
      <div className="project-grid">
        {projects.map((project) => (
          <button
            className="project-card"
            key={project.id}
            onClick={() => open(project.id)}
          >
            <div className={`project-image ${project.image}`}>
              <img src={`/assets/${project.image}.png`} alt={project.name} />
              <span className="project-reveal">
                <FolderOpen size={18} /> Abrir proyecto
              </span>
            </div>
            <div className="project-copy">
              <p className="year">{project.year}</p>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="journey-summary">
        <p>
          Empecé con ganas de aprender y pocas ideas sobre tecnología. A lo
          largo de estos tres años aprendí a programar, trabajar en equipo y
          pensar cómo llevar una idea a la vida real.
        </p>
        <div className="next-step">
          <GraduationCap size={24} />
          <div>
            <span className="eyebrow lavender">Mi próximo paso</span>
            <h3>Ingeniería Informática</h3>
            <p>Seguir aprendiendo sobre matemática, finanzas y tecnología.</p>
          </div>
        </div>
        <button className="primary" onClick={() => open("out-of-reach")}>
          El proyecto que más me representa
        </button>
      </div>
    </div>
  );
}
function Portal({ expand, open }: Pick<Props, "expand" | "open">) {
  return (
    <div className="project-layout">
      <section className="panel project-story">
        <p className="eyebrow blue">Portal / 3.º año</p>
        <h2>
          Un campus para
          <br />
          conectar personas.
        </h2>
        <p className="lead">
          La idea nació al ver que el campus del colegio ofrecía pocas
          posibilidades para interactuar.
        </p>
        <h3>Compartir y aprender juntos</h3>
        <p>
          Propusimos un espacio donde alumnos y profesores pudieran conectarse y
          compartir pruebas, prácticas y materiales.
        </p>
        <h3>Mi participación</h3>
        <p>
          Participé en la programación. La mayoría de las ideas se concretó;
          otras quedaron como propuestas. Cuando podíamos, sumábamos funciones y
          mejoras.
        </p>
        <p className="reflection">
          Si lo retomara hoy, cambiaría la forma de organizarme y las
          herramientas que utilizaría.
        </p>
      </section>
      <div className="project-evidence">
        <p className="eyebrow blue">La interfaz del proyecto</p>
        <Media
          src="/assets/portal.png"
          alt="Interfaz de Portal, campus virtual para la comunidad del colegio"
          caption="Portal · Propuesta de campus virtual para la comunidad del colegio."
          onExpand={expand}
        />
        <div className="evidence-note">
          <Network size={20} />
          <p>Una necesidad del colegio se convirtió en una idea de proyecto.</p>
        </div>
        <button className="text-button" onClick={() => open("recorrido")}>
          Volver al recorrido
        </button>
      </div>
    </div>
  );
}
function Systems({ expand }: Pick<Props, "expand">) {
  return (
    <div className="systems-layout">
      <div className="data-evidence">
        <p className="eyebrow cyan">La estructura de una aplicación</p>
        <Media
          src="/assets/der.png"
          alt="Modelo de datos de recetas, ingredientes, usuarios y planificación de comidas"
          caption="Modelo de recetas y comidas · Proyecto de Frontend Backend."
          onExpand={expand}
        />
      </div>
      <section className="panel systems-story">
        <p className="eyebrow lavender">El modelo de datos</p>
        <h2>
          Lo que sostiene
          <br />
          una aplicación.
        </h2>
        <p>
          Este modelo viene de un trabajo de Frontend Backend: diseñar una
          página web que cumpliera determinadas condiciones.
        </p>
        <div className="data-points">
          <div>
            <Code2 size={21} />
            <h3>Recetas e ingredientes</h3>
            <p>Qué se guarda y cómo se describe cada receta.</p>
          </div>
          <div>
            <Layers size={21} />
            <h3>Planes y comidas</h3>
            <p>
              Cómo se organiza la información de las distintas planificaciones.
            </p>
          </div>
          <div>
            <Network size={21} />
            <h3>Usuarios y relaciones</h3>
            <p>Cómo se conectan entre sí las entidades del sistema.</p>
          </div>
        </div>
        <p className="reflection">
          Detrás de una interfaz, también hay decisiones sobre cómo organizar la
          información.
        </p>
      </section>
    </div>
  );
}
function ThreeD({ expand }: Pick<Props, "expand">) {
  return (
    <div className="three-layout">
      <section className="panel character-panel">
        <p className="eyebrow cyan">Modelado y relato</p>
        <div className="character-content">
          <img
            src="/assets/soldado.png"
            alt="Modelo 3D de un soldado del proyecto Malvinas"
          />
          <div>
            <h2>
              Dar forma
              <br />a una historia.
            </h2>
            <p>
              En Malvinas, el relato y las minimisiones buscan mostrar la
              situación de los soldados argentinos.
            </p>
            <p>
              Participé en la programación de un proyecto que también tiene el
              propósito de generar conciencia.
            </p>
          </div>
        </div>
        <p className="mono cyan">Malvinas / Programación y conciencia</p>
      </section>
      <section className="scene-panel">
        <p className="eyebrow blue">Escena e interacción</p>
        <Media
          src="/assets/unity.png"
          alt="Escena 3D y herramientas del editor Unity"
          caption="Referencia del proceso de integración en Unity, presente en el moodboard."
          onExpand={expand}
        />
        <h3>De los objetos a la escena.</h3>
        <p>
          Los modelos se integran con escenarios y comportamientos para
          construir una experiencia interactiva.
        </p>
      </section>
    </div>
  );
}
function OutOfReach({ expand, open }: Pick<Props, "expand" | "open">) {
  return (
    <div className="out-layout">
      <section className="out-story">
        <p className="eyebrow lavender">Out of Reach / 4.º año</p>
        <h2>
          El miedo se mezcla
          <br />
          con la risa.
        </h2>
        <p className="lead">
          Un juego multijugador inspirado en R.E.P.O., ambientado en una central
          aeroespacial. Combina monstruos, tensión y situaciones cómicas al
          jugar con amigos.
        </p>
        <h3>Mi participación</h3>
        <p>
          Programé la interacción con objetos, los escenarios, la interfaz y el
          multijugador.
        </p>
        <Tags values={["Unity", "C#", "Visual Studio 2022", "Photon"]} />
        <h3>Por qué me representa</h3>
        <p>
          Los videojuegos siempre fueron una forma de compartir momentos con mis
          amigos y descubrir nuevas historias. Aprender a programarlos me
          permitió empezar a crear esas experiencias.
        </p>
        <button className="primary" onClick={() => open("metodo")}>
          Conocer mi forma de trabajar
        </button>
      </section>
      <div className="out-details">
        <Media
          src="/assets/out-of-reach.png"
          alt="Logotipo de Out of Reach"
          onExpand={expand}
          className="out-logo"
        />
        <section className="panel">
          <p className="eyebrow lavender">Mi mayor desafío</p>
          <h3>Entender qué debía sincronizarse.</h3>
          <p>
            Al principio no entendía cómo funcionaba Photon. Aprendí a
            identificar qué objetos y acciones debían mantenerse sincronizados
            entre los jugadores.
          </p>
        </section>
        <section className="anecdote">
          <span className="mono cyan">Entre pruebas y partidas</span>
          <p>
            A veces el personaje se bugueaba o los objetos desaparecían por el
            multijugador. Esos errores también terminaban en situaciones
            cómicas.
          </p>
        </section>
      </div>
    </div>
  );
}
function AI({ expand }: Pick<Props, "expand">) {
  return (
    <div className="ai-layout">
      <section className="panel">
        <p className="eyebrow lavender">Explorar el modelo</p>
        <h2>De una idea a una prueba.</h2>
        <Media
          src="/assets/perceptron.png"
          alt="Esquema de un perceptrón con entradas, pesos y salida"
          caption="Esquema del perceptrón incluido en el moodboard como referencia para entender sus entradas, procesamiento y salida."
          onExpand={expand}
        />
      </section>
      <section className="panel">
        <p className="eyebrow blue">Observar los resultados</p>
        <h2>Comparar para entender.</h2>
        <Media
          src="/assets/validacion.png"
          alt="Gráfico comparativo de precisión de validación de tres modelos"
          caption="Resultados, distintas curvas y una comparación. El gráfico permite observar cómo cambia la precisión de validación por época."
          onExpand={expand}
        />
      </section>
      <aside className="ai-footnote">
        <Sparkles size={21} />
        <p>
          Cuando necesito ayuda para entender algo, también recurro a la IA.
          Estas imágenes forman parte de mis referencias de aprendizaje.
        </p>
      </aside>
    </div>
  );
}
const initialSprint = [
  { title: "Por hacer", tasks: ["Interfaz", "Objetos"] },
  { title: "En curso", tasks: ["Escenarios", "Programación"] },
  { title: "Para revisar", tasks: ["Multijugador", "Pruebas"] },
];
function Method() {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <div className="method-layout">
      <section className="sprint-area">
        <p className="eyebrow cyan">Aprender en equipo</p>
        <h2>
          Una idea se convierte
          <br />
          en tareas compartidas.
        </h2>
        <p className="lead">
          En Out of Reach trabajamos por sprints y repartimos las tareas con
          Notion y Trello. Me gusta organizar el trabajo y ayudar a que cada
          integrante dé lo mejor.
        </p>
        <p className="mono cyan sprint-caption">Ejemplo visual de un sprint</p>
        <div className="sprint-board">
          {initialSprint.map((column) => (
            <section key={column.title}>
              <h3>{column.title}</h3>
              {column.tasks.map((task) => (
                <button
                  key={task}
                  className={checked.includes(task) ? "done" : ""}
                  onClick={() =>
                    setChecked((prev) =>
                      prev.includes(task)
                        ? prev.filter((t) => t !== task)
                        : [...prev, task],
                    )
                  }
                  aria-pressed={checked.includes(task)}
                >
                  <span className="task-check">
                    {checked.includes(task) && <Check size={12} />}
                  </span>
                  {task}
                </button>
              ))}
            </section>
          ))}
        </div>
        <p className="subtle sprint-note">
          Probá marcar una tarea. Es una forma de hacer visible el trabajo y
          coordinar al equipo.
        </p>
      </section>
      <section className="panel method-steps">
        <p className="eyebrow blue">Mi forma de trabajar</p>
        {[
          {
            icon: Search,
            name: "Entender",
            text: "Definir qué queremos lograr y qué necesita el proyecto.",
          },
          {
            icon: Compass,
            name: "Organizar",
            text: "Dividir el trabajo por sprints y definir las tareas de cada integrante.",
          },
          {
            icon: Code2,
            name: "Construir",
            text: "Trabajar sobre programación, escenarios, interfaz, objetos y multijugador.",
          },
          {
            icon: Lightbulb,
            name: "Mejorar",
            text: "Cuando algo no funciona, busco ayuda o recurro a la IA para entenderlo y seguir mejorando.",
          },
        ].map((step, i) => (
          <div className="method-step" key={step.name}>
            <span className="step-number">0{i + 1}</span>
            <div>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
export function Sections({ id, open, expand }: Props) {
  switch (id) {
    case "inicio":
      return <Home open={open} />;
    case "universo":
      return <Universe open={open} />;
    case "recorrido":
      return <Journey open={open} />;
    case "portal":
      return <Portal expand={expand} open={open} />;
    case "sistemas":
      return <Systems expand={expand} />;
    case "3d":
      return <ThreeD expand={expand} />;
    case "out-of-reach":
      return <OutOfReach expand={expand} open={open} />;
    case "ia":
      return <AI expand={expand} />;
    case "metodo":
      return <Method />;
  }
}
