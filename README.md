# AI Documentary Strategy Lab · Río editorial

Demo mobile-first en React, Motion y SVG. Las decisiones y sus niveles de certeza se guardan en el navegador.

## Ejecutar

Requiere Node.js 18 o posterior.

```sh
npm ci
npm run dev
```

Para abrirla en un teléfono conectado a la misma red, usá la URL `Network` que imprime Vite. Para generar la versión estática, ejecutá `npm run build`. El resultado queda en `dist/`.

Para regenerar el HTML autónomo, ejecutá `npm run build:demo` y abrí `dist/rio-editorial.html` en el navegador. Para probar el guardado en el teléfono, usá la URL de red del servidor Vite.

## GitHub Pages

En **Settings → Pages → Build and deployment**, seleccioná **GitHub Actions** como fuente. El flujo de `.github/workflows/pages.yml` compila y publica con cada cambio en `main`. La compilación usa la ruta del sitio que devuelve GitHub Pages.

## Código

- `src/content.js` contiene las preguntas, alternativas, conexiones y fichas de investigación trasladadas del HTML v0.2.
- `src/Decision.jsx` contiene las tarjetas, los controles, las ramas y las cápsulas.
- `src/DecisionCamera.jsx` anima la tarjeta hasta ocupar la pantalla y permite volver con la flecha, Escape o un gesto de scroll hacia afuera desde un extremo.
- `src/graphics.jsx` dibuja las conexiones SVG a partir de las posiciones reales de los nodos.
- `src/main.jsx` reúne el recorrido, el mapa panorámico y la persistencia.
- `src/styles.css` define el diseño desde móvil y las variantes de escritorio.

Las tres ramas narrativas ajustan el slider de la misma decisión. El botón «Guardar decisión» conserva el enfoque y su certeza.
