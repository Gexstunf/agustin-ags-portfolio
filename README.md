# Agustín · Portfolio TIC

Portfolio interactivo en React y TypeScript basado en las pantallas AGS del archivo Figma `s0IXQjYYUDGeR41Fu7nXRZ`. Diseñado como un escritorio inspirado en macOS: ventanas, dock, menús y contenido sobre tres años de aprendizaje en TIC.

## Desarrollo

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

La versión de producción se genera en `dist/`. Es una aplicación estática: no necesita servidor de datos ni claves privadas. Los enlaces de cada sección usan el fragmento de la URL, por ejemplo `/#/out-of-reach`, y funcionan con hosting estático.

## Organización

- `src/desktop/apps.ts`: secciones, títulos y aplicaciones del dock.
- `src/desktop/windowState.ts`: estado y acciones de las ventanas, con pruebas de apertura, cierre, minimización y restauración.
- `src/desktop/Desktop.tsx`: navegación, historial y composición del escritorio.
- `src/desktop/AppWindow.tsx`: ventana arrastrable, controles y transiciones.
- `src/desktop/Dock.tsx` y `MenuBar.tsx`: navegación y controles del escritorio.
- `src/content/Sections.tsx`: contenido de las nueve secciones, dividido en componentes.
- `src/components`: iconos, imágenes ampliables, búsqueda y ayuda.
- `src/styles`: estilos organizados en capas y adaptación a pantallas pequeñas.
- `public/assets`: imágenes e iconos originales exportados de Figma y guardados localmente.
- `.openai/hosting.json`: identidad y salida estática del sitio publicado.

## Interacciones

Las ventanas se abren desde el dock; se pueden cerrar, minimizar, restaurar y ampliar. En computadora se arrastran desde su barra superior. La minimización conserva el estado del contenido durante la sesión. El dock indica las ventanas abiertas y minimizadas.

La búsqueda se abre con Ctrl/⌘ + K. Alt + 1 a 9 abre las secciones. Las imágenes tienen un visor con zoom y se cierra con Escape. Las tareas del tablero de Método son una demostración interactiva, no un registro histórico del proyecto.

En celular se muestra la ventana activa a un ancho legible. Los diálogos usan el comportamiento nativo de foco y teclado. Las animaciones respetan `prefers-reduced-motion`.

## Referencia y contenido

Los recursos proceden de AGS y del moodboard del mismo archivo. Las pantallas de otros alumnos no se utilizan. El inicio, el recorrido y el contenido de los proyectos incorporan la información aportada por Agustín. Los diagramas de IA se presentan como referencias del moodboard, sin atribuir experimentos no confirmados.

Las imágenes 3D actuales son las imágenes de Figma. Un visor 3D interactivo requiere los archivos de los modelos; no se incluye un modelo de muestra ajeno para sustituirlos.

## Verificación

`npm test` comprueba el ciclo de vida de las ventanas y la validación de rutas. `npm run build` ejecuta TypeScript y genera la versión optimizada. La revisión en navegador incluye apertura y restauración de ventanas, ampliación de imágenes, zoom, búsqueda y una vista móvil de 390 px.
