import type { ReactNode } from "react";
import {
  Code2,
  Network,
  Layers,
  GraduationCap,
  HeartHandshake,
  Gamepad2,
  Search,
  Compass,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import type { AppId } from "../desktop/apps";
import { AppIcon } from "../components/AppIcon";
import { Media, type MediaItem } from "../components/Media";
import { CodeStudio } from "../components/effects/CodeStudio";
import {
  DataConnections,
  NeuralSignals,
  ReplayEffect,
} from "../components/effects/TechEffects";
import { SyncDemo } from "../components/effects/MultiplayerDemo";
import { SprintBoard } from "../components/effects/SprintBoard";
interface Props {
  id: AppId;
  view: number;
  open: (id: AppId) => void;
  expand: (item: MediaItem) => void;
}
function Tags({ values }: { values: string[] }) {
  return (
    <div className="tags">
      {values.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </div>
  );
}
function Story({
  label,
  title,
  children,
  icon: Icon = Code2,
}: {
  label: string;
  title: string;
  children: ReactNode;
  icon?: typeof Code2;
}) {
  return (
    <article className="reading-page story-page">
      <p className="eyebrow cyan">{label}</p>
      <h2>{title}</h2>
      <div className="story-copy">{children}</div>
      <Icon
        className="story-emblem"
        size={120}
        strokeWidth={0.7}
        aria-hidden="true"
      />
    </article>
  );
}
function ImagePage({
  title,
  src,
  alt,
  caption,
  expand,
  decoration,
  replay,
}: {
  title: string;
  src: string;
  alt: string;
  caption: string;
  expand: Props["expand"];
  decoration?: ReactNode;
  replay?: string;
}) {
  const media = (
    <Media
      src={src}
      alt={alt}
      caption={caption}
      onExpand={expand}
      decoration={decoration}
    />
  );
  return (
    <article className="reading-page image-page">
      <h2>{title}</h2>
      {replay ? <ReplayEffect label={replay}>{media}</ReplayEffect> : media}
    </article>
  );
}
const projects = [
  {
    id: "portal",
    name: "Portal",
    year: "3.º año",
    image: "portal",
    description:
      "Un campus virtual para que alumnos y profesores se conecten y compartan pruebas, prácticas y materiales.",
  },
  {
    id: "out-of-reach",
    name: "Out of Reach",
    year: "4.º año",
    image: "out-of-reach",
    description:
      "Un juego multijugador que combina el miedo a los monstruos con las situaciones cómicas de jugar con amigos.",
  },
  {
    id: "3d",
    name: "Malvinas",
    year: "5.º año",
    image: "malvinas",
    description:
      "Un juego de relato y minimisiones que busca generar conciencia sobre la experiencia de los soldados argentinos.",
  },
] as const;
export function Sections({ id, view, open, expand }: Props) {
  if (id === "inicio") {
    if (view === 1)
      return (
        <div className="reading-page focus-code-page">
          <CodeStudio explore={() => open("universo")} />
        </div>
      );
    return (
      <article className="reading-page intro-page">
        <div className="intro-profile">
          <p className="eyebrow blue">Agustín / perfil personal</p>
          <h2>Soy Agustín.</h2>
          <p className="lead">
            Elegí TIC para aprender a programar. Disfruto crear y organizar
            proyectos en equipo.
          </p>
          <Tags values={["Ordenado", "En equipo", "En evolución"]} />
          <button className="primary" onClick={() => open("recorrido")}>
            Explorar mi recorrido
          </button>
        </div>
        <div className="intro-code-preview">
          <CodeStudio explore={() => open("universo")} />
        </div>
      </article>
    );
  }
  if (id === "universo") {
    if (view === 1)
      return (
        <article className="reading-page tools-page">
          <h2>Herramientas para crear.</h2>
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
                text: "Organizar y conectar la información.",
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
        </article>
      );
    return (
      <article className="reading-page interests-page">
        <h2>Las cosas que me mueven.</h2>
        <p>
          Desde chico quería saber cómo se programan las cosas. En TIC empecé a
          convertir esa curiosidad en proyectos.
        </p>
        <div className="interest-pair">
          <section>
            <HeartHandshake size={24} className="lavender" />
            <h3>Fuera de la pantalla</h3>
            <p>El deporte, los días cálidos y salir con amigos.</p>
          </section>
          <section>
            <Gamepad2 size={24} className="blue" />
            <h3>Historias que inspiran</h3>
            <p>R.E.P.O., Helldivers 2, Counter-Strike y Pacific Rim.</p>
          </section>
        </div>
      </article>
    );
  }
  if (id === "recorrido") {
    if (view === 3)
      return (
        <Story
          label="Mi evolución"
          title="De aprender a crear."
          icon={GraduationCap}
        >
          <p>
            Empecé con ganas de aprender y pocas ideas sobre tecnología. En
            estos tres años aprendí a programar, organizar el trabajo y pensar
            cómo llevar una idea a la vida real.
          </p>
          <div className="future-note">
            <span className="eyebrow lavender">Mi próximo paso</span>
            <h3>Ingeniería Informática</h3>
            <p>Seguir aprendiendo sobre matemática, finanzas y tecnología.</p>
          </div>
        </Story>
      );
    const project = projects[view] ?? projects[0];
    return (
      <article
        className={`reading-page project-focus project-${project.image}`}
      >
        <div className="project-focus-image">
          <img src={`/assets/${project.image}.png`} alt={project.name} />
        </div>
        <div className="project-focus-copy">
          <p className="eyebrow cyan">{project.year}</p>
          <h2>{project.name}</h2>
          <p className="lead">{project.description}</p>
          <button className="primary" onClick={() => open(project.id)}>
            Abrir proyecto
          </button>
        </div>
      </article>
    );
  }
  if (id === "portal") {
    if (view === 2)
      return (
        <ImagePage
          title="La interfaz del proyecto."
          src="/assets/portal.png"
          alt="Interfaz de Portal, campus virtual para la comunidad del colegio"
          caption="Portal · Propuesta de campus virtual para la comunidad del colegio."
          expand={expand}
        />
      );
    if (view === 1)
      return (
        <Story
          label="Portal / mi participación"
          title="Programar y seguir mejorando."
        >
          <p>
            Participé en la programación. La mayoría de las ideas se concretó;
            otras quedaron como propuestas. Cuando podíamos, sumábamos funciones
            y mejoras.
          </p>
          <p className="reflection">
            Si lo retomara hoy, cambiaría la forma de organizarme y las
            herramientas que utilizaría.
          </p>
        </Story>
      );
    return (
      <Story
        label="Portal / 3.º año"
        title="Un campus para conectar personas."
        icon={Network}
      >
        <p>
          La idea nació al ver que el campus del colegio ofrecía pocas
          posibilidades para interactuar.
        </p>
        <p>
          Propusimos un espacio donde alumnos y profesores pudieran conectarse y
          compartir pruebas, prácticas y materiales.
        </p>
      </Story>
    );
  }
  if (id === "sistemas") {
    if (view === 0)
      return (
        <ImagePage
          title="Lo que conecta todo."
          src="/assets/der.png"
          alt="Modelo de datos de recetas, ingredientes, usuarios y planificación de comidas"
          caption="Modelo de recetas y comidas · Proyecto de Frontend Backend. Pulsá la imagen para ampliarla."
          expand={expand}
          decoration={<DataConnections />}
        />
      );
    return (
      <article className="reading-page relations-page">
        <h2>Lo que sostiene una aplicación.</h2>
        <p>
          Este modelo viene de un trabajo de Frontend Backend: diseñar una
          página web que cumpliera determinadas condiciones.
        </p>
        <div className="relation-list">
          {[
            {
              icon: Code2,
              title: "Recetas e ingredientes",
              text: "Qué se guarda y cómo se describe cada receta.",
            },
            {
              icon: Layers,
              title: "Planes y comidas",
              text: "Cómo se organiza la información de las planificaciones.",
            },
            {
              icon: Network,
              title: "Usuarios y relaciones",
              text: "Cómo se conectan las entidades del sistema.",
            },
          ].map((item) => (
            <section key={item.title}>
              <item.icon size={23} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </section>
          ))}
        </div>
      </article>
    );
  }
  if (id === "3d") {
    if (view === 1)
      return (
        <ImagePage
          title="Dar forma a una historia."
          src="/assets/soldado.png"
          alt="Modelo 3D de un soldado del proyecto Malvinas"
          caption="El personaje como parte del mundo visual de Malvinas."
          expand={expand}
        />
      );
    if (view === 2)
      return (
        <ImagePage
          title="De los objetos a la escena."
          src="/assets/unity.png"
          alt="Escena 3D y herramientas del editor Unity"
          caption="Referencia de Unity presente en el moodboard: escenarios, modelos y comportamientos se integran para construir una experiencia."
          expand={expand}
        />
      );
    return (
      <Story
        label="Malvinas / 5.º año"
        title="Programar para generar conciencia."
        icon={Gamepad2}
      >
        <p>
          En Malvinas, el relato y las minimisiones buscan mostrar la situación
          de los soldados argentinos.
        </p>
        <p>
          Participé en la programación de un proyecto con un propósito distinto:
          acompañar una historia que también invita a reflexionar.
        </p>
      </Story>
    );
  }
  if (id === "out-of-reach") {
    if (view === 0)
      return (
        <article className="reading-page project-focus project-out-of-reach">
          <div className="project-focus-image">
            <img
              src="/assets/out-of-reach.png"
              alt="Logotipo de Out of Reach"
            />
          </div>
          <div className="project-focus-copy">
            <p className="eyebrow lavender">Out of Reach / 4.º año</p>
            <h2>El miedo se mezcla con la risa.</h2>
            <p>
              Un juego multijugador inspirado en R.E.P.O., ambientado en una
              central aeroespacial. Combina monstruos, tensión y situaciones
              cómicas al jugar con amigos.
            </p>
          </div>
        </article>
      );
    if (view === 1)
      return (
        <Story label="Mi participación" title="Del código a la experiencia.">
          <p>
            Programé la interacción con objetos, los escenarios, la interfaz y
            el multijugador.
          </p>
          <Tags values={["Unity", "C#", "Visual Studio 2022", "Photon"]} />
          <p>
            Nos organizamos por sprints y repartimos las tareas con Notion y
            Trello.
          </p>
        </Story>
      );
    if (view === 2)
      return (
        <article className="reading-page multiplayer-page">
          <h2>Un objeto. Dos jugadores.</h2>
          <p>
            Probá crear, mover o eliminar un objeto y mirá cómo se replica en la
            otra vista.
          </p>
          <SyncDemo />
        </article>
      );
    if (view === 3)
      return (
        <Story
          label="Mi mayor desafío"
          title="Entender qué debía sincronizarse."
          icon={Network}
        >
          <p>
            Al principio no entendía cómo funcionaba Photon. Aprendí a
            identificar qué objetos y acciones debían mantenerse sincronizados
            entre los jugadores.
          </p>
          <p>
            Aprender a programar videojuegos me permitió empezar a crear las
            experiencias que siempre había disfrutado.
          </p>
        </Story>
      );
    return (
      <Story
        label="Entre pruebas y partidas"
        title="Crear también es compartir."
        icon={Gamepad2}
      >
        <p>
          Los videojuegos siempre fueron una forma de compartir momentos con mis
          amigos y descubrir nuevas historias.
        </p>
        <p>
          A veces el personaje se bugueaba o los objetos desaparecían por el
          multijugador. Esos errores también terminaban en situaciones cómicas.
        </p>
        <button className="primary" onClick={() => open("metodo")}>
          Conocer mi forma de trabajar
        </button>
      </Story>
    );
  }
  if (id === "ia") {
    if (view === 0)
      return (
        <ImagePage
          title="De una idea a una prueba."
          src="/assets/perceptron.png"
          alt="Esquema de un perceptrón con entradas, pesos y salida"
          caption="Referencia del moodboard para comprender las entradas, el procesamiento y la salida de un perceptrón."
          expand={expand}
          decoration={<NeuralSignals />}
          replay="Repetir recorrido de datos"
        />
      );
    if (view === 1)
      return (
        <ImagePage
          title="Comparar para entender."
          src="/assets/validacion.png"
          alt="Gráfico comparativo de precisión de validación de tres modelos"
          caption="El gráfico permite observar cómo cambia la precisión de validación por época."
          expand={expand}
        />
      );
    return (
      <Story
        label="La IA en mi aprendizaje"
        title="Preguntar para entender."
        icon={Sparkles}
      >
        <p>
          Cuando algo no funciona o no entiendo un tema, busco ayuda o recurro a
          la IA para comprenderlo y seguir avanzando.
        </p>
        <p>
          Las imágenes de esta sección forman parte de mis referencias de
          aprendizaje.
        </p>
      </Story>
    );
  }
  if (view === 1)
    return (
      <article className="reading-page sprint-page">
        <h2>Una idea, tareas compartidas.</h2>
        <p className="eyebrow cyan">Ejemplo visual de un sprint</p>
        <SprintBoard />
        <p className="sprint-help">Arrastrá, mové o completá cada tarea.</p>
      </article>
    );
  if (view === 2)
    return (
      <article className="reading-page steps-page">
        <h2>Mi forma de trabajar.</h2>
        <div className="steps-grid">
          {[
            {
              icon: Search,
              title: "Entender",
              text: "Definir el propósito y lo que necesita el proyecto.",
            },
            {
              icon: Compass,
              title: "Organizar",
              text: "Dividir el trabajo en sprints y asignar tareas.",
            },
            {
              icon: Code2,
              title: "Construir",
              text: "Programar e integrar escenarios, objetos e interfaz.",
            },
            {
              icon: Lightbulb,
              title: "Mejorar",
              text: "Pedir ayuda, probar y aprender de cada intento.",
            },
          ].map((item) => (
            <section key={item.title}>
              <item.icon size={23} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </section>
          ))}
        </div>
      </article>
    );
  return (
    <Story
      label="Aprender en equipo"
      title="Aprender también es organizarse."
      icon={Compass}
    >
      <p>
        En Out of Reach trabajamos por sprints y repartimos las tareas con
        Notion y Trello.
      </p>
      <p>
        Me gusta organizar el trabajo y ayudar a que cada integrante dé lo
        mejor.
      </p>
      <Tags values={["Sprints", "Notion", "Trello", "En equipo"]} />
    </Story>
  );
}
