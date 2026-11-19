import type { ReactNode } from "react";
import {
  Code2,
  Gamepad2,
  HeartHandshake,
  Search,
  Compass,
  Lightbulb,
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
  open: (id: AppId) => void;
  expand: (item: MediaItem) => void;
}
function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="overview-note">
      <h3>{title}</h3>
      <p>{children}</p>
    </section>
  );
}
export function Sections({ id, open, expand }: Props) {
  const image = (src: string, alt: string, decoration?: ReactNode) => (
    <Media
      src={`/assets/${src}.png`}
      alt={alt}
      onExpand={expand}
      decoration={decoration}
    />
  );
  if (id === "inicio")
    return (
      <article className="overview overview-home">
        <div className="overview-copy">
          <h2>Soy Agustín.</h2>
          <p>
            Elegí TIC para aprender a programar. En tres años pasé de la
            curiosidad a crear proyectos en equipo.
          </p>
          <p>
            Me gusta imaginar, diseñar, programar y organizar. Siempre busco
            mejorar.
          </p>
          <div className="overview-traits">
            <span>Organizado</span>
            <span>En equipo</span>
            <span>En evolución</span>
          </div>
          <button className="primary" onClick={() => open("recorrido")}>
            Explorar mi recorrido
          </button>
        </div>
        <CodeStudio explore={() => open("universo")} />
      </article>
    );
  if (id === "universo")
    return (
      <article className="overview overview-universe">
        <header>
          <h2>Curiosidad dentro y fuera de la pantalla.</h2>
          <p>
            La tecnología me permite crear las historias y experiencias que
            antes solo imaginaba.
          </p>
        </header>
        <div className="overview-interests">
          <Note title="Fuera de la pantalla">
            <HeartHandshake aria-hidden="true" size={20} /> El deporte, los días
            cálidos y salir con amigos.
          </Note>
          <Note title="Mis referencias">
            <Gamepad2 aria-hidden="true" size={20} /> R.E.P.O., Helldivers 2,
            Counter-Strike y Pacific Rim.
          </Note>
        </div>
        <div className="overview-tools">
          {[
            ["vscode", "Programación", "portal"],
            ["postman", "Sistemas", "sistemas"],
            ["blender", "Mundos 3D", "3d"],
            ["python", "Exploración e IA", "ia"],
          ].map(([icon, name, app]) => (
            <button key={icon} onClick={() => open(app as AppId)}>
              <AppIcon icon={icon} />
              <span>{name}</span>
            </button>
          ))}
        </div>
      </article>
    );
  if (id === "recorrido")
    return (
      <article className="overview overview-journey">
        <header>
          <h2>De aprender a crear.</h2>
          <p>
            Empecé con ganas de aprender. Los proyectos me enseñaron a
            programar, organizarme y llevar ideas a la vida real.
          </p>
        </header>
        <div className="overview-projects">
          {[
            {
              id: "portal",
              year: "3.º año",
              name: "Portal",
              image: "portal",
              text: "Un campus para conectar alumnos y profesores.",
            },
            {
              id: "out-of-reach",
              year: "4.º año",
              name: "Out of Reach",
              image: "out-of-reach",
              text: "Miedo, humor y amigos en un juego multijugador.",
            },
            {
              id: "3d",
              year: "5.º año",
              name: "Malvinas",
              image: "malvinas",
              text: "Relato y minimisiones para generar conciencia.",
            },
          ].map((p) => (
            <button key={p.id} onClick={() => open(p.id as AppId)}>
              <img src={`/assets/${p.image}.png`} alt="" />
              <div>
                <span className="project-year">{p.year}</span>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </div>
            </button>
          ))}
        </div>
        <Note title="Ingeniería Informática · lo que viene">
          Seguir aprendiendo sobre matemática, finanzas y tecnología.
        </Note>
      </article>
    );
  if (id === "portal")
    return (
      <article className="overview overview-split overview-portal">
        <div className="overview-copy">
          <h2>Un campus para conectar.</h2>
          <p>
            El campus del colegio tenía pocas opciones para interactuar.
            Propusimos un espacio donde alumnos y profesores pudieran compartir
            pruebas, prácticas y materiales.
          </p>
          <Note title="Mi aporte">
            Participé en la programación. Concretamos la mayoría de las ideas y
            sumamos mejoras cuando podíamos.
          </Note>
          <Note title="Lo que cambiaría hoy">
            La organización del trabajo y las herramientas que utilizaría.
          </Note>
        </div>
        {image(
          "portal",
          "Interfaz de Portal, campus virtual para la comunidad del colegio",
        )}
      </article>
    );
  if (id === "sistemas")
    return (
      <article className="overview overview-split overview-systems">
        <div className="overview-copy">
          <h2>La estructura detrás de una aplicación.</h2>
          <p>
            Un modelo de recetas y comidas del proyecto de Frontend Backend:
            diseñar una web con determinadas condiciones.
          </p>
          <div className="overview-relationships">
            <Note title="Recetas e ingredientes">
              Qué se guarda y cómo se describe.
            </Note>
            <Note title="Planes y comidas">
              Cómo se organiza la planificación.
            </Note>
            <Note title="Usuarios y relaciones">
              Cómo se conectan las entidades.
            </Note>
          </div>
          <p className="overview-hint">
            Pulsá el modelo para verlo en detalle.
          </p>
        </div>
        {image(
          "der",
          "Modelo de datos de recetas, ingredientes, usuarios y planificación de comidas",
          <DataConnections />,
        )}
      </article>
    );
  if (id === "3d")
    return (
      <article className="overview overview-malvinas">
        <header>
          <h2>Programar para generar conciencia.</h2>
          <p>
            Malvinas combina un relato y minimisiones para mostrar la situación
            de los soldados argentinos. Participé en la programación: esta vez,
            crear también era invitar a reflexionar.
          </p>
        </header>
        <div className="overview-gallery">
          {image("soldado", "Modelo 3D de un soldado de Malvinas")}
          {image(
            "unity",
            "Referencia del moodboard: escena y herramientas de Unity",
          )}
        </div>
        <div className="overview-image-labels">
          <span>Personaje de Malvinas</span>
          <span>Unity · referencia del moodboard</span>
        </div>
        <p>
          Los modelos, los escenarios y sus comportamientos construyen el mundo
          que el jugador recorre.
        </p>
      </article>
    );
  if (id === "out-of-reach")
    return (
      <article className="overview overview-multiplayer">
        <div className="overview-game-story">
          <div className="overview-game-intro">
            <img src="/assets/out-of-reach.png" alt="Out of Reach" />
            <p>
              Un juego inspirado en R.E.P.O.: monstruos, miedo y humor con
              amigos en una central aeroespacial.
            </p>
          </div>
          <div className="overview-game-notes">
            <Note title="Mi aporte">
              Programación e interacción con objetos, interfaz, escenarios y
              multijugador. Unity, C#, Visual Studio y Photon.
            </Note>
            <Note title="Lo que aprendí">
              Entender qué debía sincronizarse. Nos organizamos por sprints con
              Notion y Trello; los bugs también terminaron en risas.
            </Note>
          </div>
        </div>
        <div className="overview-demo">
          <h2>Un objeto. Dos jugadores.</h2>
          <p>Probá cómo se replica cada cambio.</p>
          <SyncDemo />
        </div>
      </article>
    );
  if (id === "ia")
    return (
      <article className="overview overview-ai">
        <header>
          <h2>Preguntar, probar y entender.</h2>
          <p>
            Cuando algo no funciona o no entiendo un tema, busco ayuda o recurro
            a la IA para comprenderlo y seguir avanzando.
          </p>
        </header>
        <div className="overview-gallery">
          <ReplayEffect label="Repetir recorrido de datos">
            {image(
              "perceptron",
              "Perceptrón: entradas, pesos y salida",
              <NeuralSignals />,
            )}
          </ReplayEffect>
          {image(
            "validacion",
            "Comparación de precisión de validación de tres modelos",
          )}
        </div>
        <p className="overview-hint">
          Referencias de mi moodboard: cómo se procesa una entrada y cómo se
          compara la precisión de los modelos.
        </p>
      </article>
    );
  return (
    <article className="overview overview-method">
      <header>
        <h2>Organizar para crear.</h2>
        <p>
          Trabajo por sprints con Notion y Trello. Me gusta organizar y ayudar a
          que el equipo dé lo mejor.
        </p>
      </header>
      <div className="overview-steps">
        {[
          { icon: Search, title: "Entender", text: "Definir el propósito." },
          {
            icon: Compass,
            title: "Organizar",
            text: "Asignar las tareas.",
          },
          { icon: Code2, title: "Construir", text: "Programar e integrar." },
          { icon: Lightbulb, title: "Mejorar", text: "Pedir ayuda y probar." },
        ].map((s) => (
          <section key={s.title}>
            <s.icon size={20} aria-hidden="true" />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </section>
        ))}
      </div>
      <div className="overview-board">
        <h3>Sprint · ejemplo interactivo</h3>
        <SprintBoard />
      </div>
      <p className="overview-hint">Arrastrá, mové o completá las tareas.</p>
    </article>
  );
}
