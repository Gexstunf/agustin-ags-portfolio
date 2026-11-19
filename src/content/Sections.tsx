import type { ReactNode } from "react";
import { Code2, Search, Compass, Lightbulb } from "lucide-react";
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
          <p className="ags-label">Agustín / perfil personal</p>
          <h2>
            Soy
            <br />
            Agustín.
          </h2>
          <p>
            Desde chico quería programar. De los 15 a los 18 años pasé de la
            curiosidad a crear proyectos en equipo.
          </p>

          <div className="overview-traits">
            <span>Organizado</span>
            <span>En equipo</span>
            <span>En evolución</span>
          </div>
          <button
            className="text-button disciplines"
            onClick={() => open("recorrido")}
          >
            Frontend / Sistemas / 3D / IA
          </button>
        </div>
        <CodeStudio explore={() => open("universo")} />
      </article>
    );
  if (id === "universo")
    return (
      <article className="overview overview-universe">
        <div className="universe-personal">
          <p className="ags-label">Mi universo</p>
          <h2>Tecnología en todas sus formas.</h2>
          <p>
            Empecé con ganas de aprender. Crear proyectos me acercó a
            herramientas que antes no conocía.
          </p>
          <div className="universe-footnote">
            <span>01 Diseñar</span>
            <span>02 Programar</span>
            <span>03 Experimentar</span>
            <span>04 Mejorar</span>
          </div>
        </div>
        <div className="overview-tools">
          {[
            [
              "vscode",
              "Frontend",
              "Interfaces que se convierten en experiencias.",
              "React · HTML · CSS",
              "portal",
            ],
            [
              "postman",
              "Sistemas",
              "La estructura que conecta cada parte.",
              "Datos · API · Postman",
              "sistemas",
            ],
            [
              "blender",
              "3D e interacción",
              "Dar forma, movimiento y comportamiento.",
              "Blender · Unity",
              "3d",
            ],
            [
              "python",
              "Inteligencia artificial",
              "Probar ideas y aprender del resultado.",
              "Python · Modelos",
              "ia",
            ],
          ].map(([icon, name, description, tools, app]) => (
            <button key={icon} onClick={() => open(app as AppId)}>
              <div className="tool-heading">
                <AppIcon icon={icon} />
                <span className="ags-label">{name}</span>
              </div>
              <strong>{description}</strong>
              <span className="tool-stack">{tools}</span>
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
              age: "15–16 años",
              name: "Portal",
              image: "portal",
              text: "Un campus para conectar alumnos y profesores.",
            },
            {
              id: "out-of-reach",
              age: "16–17 años",
              name: "Out of Reach",
              image: "out-of-reach",
              text: "Miedo, humor y amigos en un juego multijugador.",
            },
            {
              id: "3d",
              age: "17–18 años",
              name: "Malvinas",
              image: "malvinas",
              text: "Relato y minimisiones para generar conciencia.",
            },
          ].map((p) => (
            <button key={p.id} onClick={() => open(p.id as AppId)}>
              <img src={`/assets/${p.image}.png`} alt="" />
              <div>
                <span className="project-age">{p.age}</span>
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
          <p className="ags-label">El modelo de datos</p>
          <h2>
            Lo que sostiene
            <br />
            una aplicación.
          </h2>

          <div className="overview-relationships">
            <Note title="Recetas e ingredientes">
              Qué se guarda y cómo se describe cada receta.
            </Note>
            <Note title="Planes y comidas">
              Cómo se organiza la información de las comidas planificadas.
            </Note>
            <Note title="Usuarios y relaciones">
              Las conexiones entre tablas dan estructura al conjunto.
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
        <section className="ags-subwindow">
          <div className="ags-subbar">
            <i />
            Blender — Personaje
          </div>
          <div className="model-story">
            <div className="model-visual">
              {image("soldado", "Modelo 3D de un soldado de Malvinas")}
            </div>
            <div>
              <p className="ags-label">Modelado / 17–18 años</p>
              <h2>Dar forma a una historia.</h2>
              <p>
                Malvinas combina relato y minimisiones para mostrar la situación
                de los soldados argentinos.
              </p>
              <p>
                Participé en la programación de una experiencia que invita a
                reflexionar.
              </p>
            </div>
          </div>
        </section>
        <section className="ags-subwindow">
          <div className="ags-subbar">
            <i />
            Unity — Escena e interacción
          </div>
          <div className="scene-story">
            {image(
              "unity",
              "Referencia del moodboard: escena y herramientas de Unity",
            )}
            <h3>De los objetos a la escena.</h3>
            <p>
              Modelos, escenarios y comportamientos construyen el mundo que el
              jugador recorre.
            </p>
            <span className="overview-hint">
              Unity · referencia del moodboard
            </span>
          </div>
        </section>
      </article>
    );
  if (id === "out-of-reach")
    return (
      <article className="overview overview-multiplayer">
        <section className="ags-subwindow out-original-story">
          <div className="ags-subbar">
            <i />
            Out of Reach / Terror, humor y amigos
          </div>
          <div className="out-original-content">
            <div className="out-original-heading">
              <img src="/assets/out-of-reach.png" alt="Out of Reach" />
              <h2>
                El miedo se mezcla
                <br />
                con la risa.
              </h2>
            </div>
            <p>
              <span className="desktop-copy">
                Un juego multijugador inspirado en R.E.P.O., ambientado en una
                central aeroespacial. Combina monstruos, tensión y situaciones
                cómicas al jugar con amigos.
              </span>
              <span className="mobile-copy">
                Multijugador de miedo y humor en una central aeroespacial.
              </span>
            </p>
            <Note title="Mi aporte al proyecto">
              <span className="desktop-copy">
                Programé la interacción con objetos, los escenarios, la interfaz
                y el multijugador. Trabajé con Unity, C# y Visual Studio 2022.
              </span>
              <span className="mobile-copy">
                Programé objetos, escenarios, interfaz y multijugador con Unity
                y C#.
              </span>
            </Note>
            <button className="primary" onClick={() => open("metodo")}>
              Ver mi método
            </button>
          </div>
        </section>
        <section className="ags-subwindow out-original-notes">
          <div className="ags-subbar">
            <i />
            Notas / Lo que aprendí
          </div>
          <div className="out-original-content">
            <h2>
              De jugar
              <br />a crear.
            </h2>
            <p>
              <span className="desktop-copy">
                Los videojuegos me permitían compartir momentos con amigos e
                imaginar historias. Aprender a programarlos me permitió crear
                esas experiencias.
              </span>
              <span className="mobile-copy">
                De compartir historias con amigos a crear esas experiencias.
              </span>
            </p>
            <Note title="Mi mayor desafío">
              <span className="desktop-copy">
                Comprender Photon: identificar qué objetos y acciones debían
                sincronizarse entre los jugadores.
              </span>
              <span className="mobile-copy">
                Aprendí a sincronizar objetos y acciones con Photon.
              </span>
            </Note>
            <div className="overview-demo">
              <h3>Un objeto. Dos jugadores.</h3>
              <SyncDemo />
            </div>
          </div>
        </section>
      </article>
    );
  if (id === "ia")
    return (
      <article className="overview overview-ai">
        <div className="overview-gallery">
          <section className="ai-study">
            <p className="ags-label">Explorar el modelo</p>
            <h3>De una idea a una prueba.</h3>
            <ReplayEffect label="Repetir recorrido de datos">
              {image(
                "perceptron",
                "Perceptrón: entradas, pesos y salida",
                <NeuralSignals />,
              )}
            </ReplayEffect>
          </section>
          <section className="ai-study">
            <p className="ags-label">Observar los resultados</p>
            <h3>Comparar para entender.</h3>
            {image(
              "validacion",
              "Comparación de precisión de validación de tres modelos",
            )}
          </section>
        </div>
        <p className="overview-hint">
          Referencias del moodboard para entender las entradas, el procesamiento
          y la salida de un modelo. Pulsá las imágenes para ampliar.
        </p>
      </article>
    );
  return (
    <article className="overview overview-method">
      <header>
        <p className="ags-label">Aprender en equipo</p>
        <h2>
          Una idea se convierte
          <br />
          en tareas compartidas.
        </h2>
        <p>
          <span className="desktop-copy">
            En Out of Reach trabajamos por sprints y repartimos las tareas con
            Notion y Trello. Me gusta organizar el trabajo y ayudar a que cada
            integrante dé lo mejor.
          </span>
          <span className="mobile-copy">
            Trabajo por sprints con Notion y Trello. Me gusta organizar y ayudar
            al equipo.
          </span>
        </p>
      </header>
      <div className="overview-board">
        <h3 className="ags-label">Ejemplo visual de un sprint</h3>
        <SprintBoard />
      </div>
      <p className="overview-hint">Arrastrá, mové o completá las tareas.</p>{" "}
      <div className="overview-steps">
        <p className="ags-label">Mi forma de trabajar</p>
        {[
          {
            icon: Search,
            title: "Entender",
            text: "Definir qué queremos lograr y qué necesita el proyecto.",
          },
          {
            icon: Compass,
            title: "Organizar",
            text: "Dividir el trabajo por sprints y definir las tareas de cada integrante.",
          },
          {
            icon: Code2,
            title: "Construir",
            text: "Integrar programación, escenarios, interfaz, objetos y multijugador.",
          },
          {
            icon: Lightbulb,
            title: "Mejorar",
            text: "Buscar ayuda, probar y entender para seguir mejorando.",
          },
        ].map((s) => (
          <section key={s.title}>
            <s.icon size={20} aria-hidden="true" />
            <h3>{s.title}</h3>
            <p>
              <span className="desktop-copy">{s.text}</span>
              <span className="mobile-copy">
                {
                  (
                    {
                      Entender: "Definir el propósito.",
                      Organizar: "Asignar tareas.",
                      Construir: "Programar e integrar.",
                      Mejorar: "Pedir ayuda y probar.",
                    } as Record<string, string>
                  )[s.title]
                }
              </span>
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
