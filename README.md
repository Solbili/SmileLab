# Smile Lab Odontología

Sitio de la clínica Smile Lab (General Paz y Nueva Córdoba, Córdoba, Argentina),
construido sobre el handoff de diseño `HANDOFF.md`.

Todo el funnel es externo: WhatsApp + agenda de Dentalink. **No hay formularios propios,
base de datos ni auth.**

## Stack

| Capa | Elección |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript, todo estático (SSG) |
| Estilos | Tailwind CSS v4, tokens del §3 en `@theme` |
| Tipografías | `next/font/google` — Jost (display) + Hanken Grotesk (cuerpo) |
| Imágenes | `next/image`, salvo el masthead (ver abajo) |
| Animación | CSS puro (`@keyframes`), sin librerías |
| Contenido | Datos tipados en `/content/*.ts` |
| Analítica | GA4 + los 3 eventos de conversión del §1 |
| Deploy | Vercel |

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm start          # servir el build
npm run typecheck  # tsc --noEmit
npm run lint
```

### Variables de entorno

```bash
NEXT_PUBLIC_SITE_URL=https://www.consultoriosmilelab.com
NEXT_PUBLIC_GA_ID=G-8D1XH5SJ9H        # opcional: en producción ya se usa este por defecto
```

`NEXT_PUBLIC_SITE_URL` se usa para canonicals, Open Graph, `sitemap.xml` y los `@id`
del JSON-LD. Sin ella cae al default de `content/site.ts` (`https://www.consultoriosmilelab.com`).

GA4 (`G-8D1XH5SJ9H`) se activa solo en el deploy de producción de Vercel
(`NEXT_PUBLIC_VERCEL_ENV=production`); dev y preview quedan limpios. `NEXT_PUBLIC_GA_ID`
lo pisa si hiciera falta otro ID. Las dos son `NEXT_PUBLIC_*`: se inlinean **en build**, no
en runtime — cambiarlas exige redeploy.

## Analítica

No hay checkout: los únicos eventos de conversión son los tres clics que sacan al usuario
hacia el funnel real.

| Evento | Se dispara con |
|---|---|
| `wsp_click` | cualquier link a `wa.me` |
| `agenda_click` | cualquier link a la agenda de Dentalink |
| `sede_maps_click` | cualquier link a Google Maps |

El tracking va **por delegación** en `document` (`components/Analytics.tsx`), no con un
`onClick` por botón: el mismo link aparece en el header, el hero, las cards de sede, el
footer y la barra mobile. Así ninguno queda sin medir, ni los que se agreguen después.
Cada evento manda `link_url`, `link_text` y `page_path`.

## Estructura

```
app/
  layout.tsx              header + footer + barra mobile + clipPath + JSON-LD de Organization
  globals.css             tokens (@theme), escala tipográfica, layout, animaciones
  fonts.ts
  page.tsx                Home
  tratamientos/           índice + [slug] (6)
  pacientes/  sedes/  turnos/  contacto/
  para-informarte/        índice + [slug] (3)
  sitemap.ts  robots.ts  not-found.tsx
components/               Header, Footer, Logo, Button, Cards, Photo, Section,
                          HeroCarousel, ReviewsMarquee, Faq, ToothClip, MobileActionBar
content/                  site, photos, treatments, posts, sedes, reviews, team, home
lib/jsonld.tsx            LocalBusiness/Dentist, Service, Article, FAQPage
public/assets/            fotos recortadas por uso y breakpoint + marca
```

El contenido se edita en `/content`. No hace falta tocar componentes para cambiar copy,
horarios, teléfonos o links.

## Las tres trampas del diseño

Están documentadas en el código, pero conviene saberlas antes de tocar nada:

1. **`§8` — imágenes en contenedores con `aspect-ratio`.** La `<img>` va absoluta
   (`.photo > img` en `globals.css`, y `next/image` con `fill`). Si queda en flujo con
   `height:100%`, las cards de una misma fila terminan con paneles de alto distinto.
2. **`§6` — el `clipPath` del masthead.** Es una silueta de *diente*, distinta del símbolo
   del logo. Vive en el DOM una sola vez (`<ToothClip />` en el layout) porque
   `clip-path: url()` contra un archivo externo no funciona en todos los navegadores.
   El contenedor debe respetar `1/0.92` (desktop) y `1/1.02` (mobile) o se deforma.
3. **`§7.1` / `§7.2` — los loops.** La última foto del carrusel repite la primera y la
   marquesina duplica la lista de reseñas, para que ningún loop salte. Ambos calculan sus
   tiempos a partir de la cantidad real de elementos (`HeroCarousel` emite sus propios
   keyframes; la marquesina usa `--n`), así que sumar o sacar fotos y reseñas no los rompe.

## Decisiones que se apartan del handoff

- **El logo es el del cliente, no el del handoff.** §6 describe un diamante violeta
  (`#7d8ac8` / `#b3bce7`); el archivo que mandó el estudio es una gema teal sobre silueta
  de diente (`#327180` / `#afd1d3`), la misma marca que está instalada físicamente en las
  dos sedes —se la ve en el mostrador de la foto de portada, ahí en violeta—. Los dos
  `path` de `components/Logo.tsx` salen de un calco medido sobre ese archivo: IoU 99,7 %
  la silueta y 97,9 % la gema contra el raster, con desvíos de ±1px a 646px de ancho. El
  `viewBox` es `0 0 100 98.48` porque la caja del original mide 646 × 636, no un cuadrado.
  Va sin el «SMILE LAB» interno, que a tamaño de header queda bajo 8px. Los tokens son
  `--color-brand` y `--color-brand-light` en `globals.css`.

- **Masthead con `<picture>` en vez de `next/image`.** El recorte desktop (1160×1067) y el
  mobile (760×775) son encuadres distintos, y `next/image` no hace art direction. Con
  `<source media>` el navegador baja un solo archivo. Los JPEG ya vienen a calidad 82 y al
  tamaño exacto de uso. El resto de las imágenes sí pasa por `next/image`.
- **Separador `/` de los metadatos: `#5d7075` en vez de `#a8c2c4`.** El valor del diseño da
  1.88:1 sobre blanco y el checklist §12 pide ≥4.5:1 en todo texto. Ningún teal claro llega
  al mínimo. Para volver al valor original, cambiar `--color-slash` en `globals.css`.
- **Se agregó lo que §7.4 y §7.5 marcaban como pendiente:** `:focus-visible` en todo
  elemento interactivo, `aria-expanded` en el menú y en el FAQ, cierre con `Esc`, foco
  atrapado y bloqueo de scroll del body.
- **El mobile conserva todas las secciones del desktop.** El mockup mobile omite pilares,
  «Tu experiencia», «Para informarte» y el panel de Equipo. Se interpretó como un mockup
  abreviado y no como una directiva: servir contenido distinto por viewport perjudica el
  SEO, y §2 dice «entre 390 y 1024 todo apila en una columna» — apila, no desaparece.
  Si el cliente prefiere la home mobile corta, es sacar esas cuatro secciones de
  `app/page.tsx`.

## Pendiente antes de publicar

- [x] ~~Reseñas reales~~ — hechas. Las 36 de `content/reviews.ts` son reseñas reales de
      Google, transcriptas textualmente (sin editar ni corregir). Se muestran nombre,
      puntaje, texto y antigüedad, con atribución a Google.
- [ ] **Fotos de los autores.** Hoy no se muestran: solo se pueden obtener por la API de
      Places. Los Knowledge Graph IDs de las sedes ya están identificados —
      `/g/11fr2zkskc` (General Paz) y `/g/11xt3hyvvx` (Nueva Córdoba)— así que con una
      `GOOGLE_PLACES_API_KEY` se conecta y además las mantiene actualizadas solas.
      NO usar fotos de stock: poner la cara de un modelo junto al nombre de una persona
      real es tergiversarla, y las licencias de stock prohíben implicar que el modelo fue
      paciente.
Dos reseñas quedaron deliberadamente afuera: las de Wendi Romina Oroná y valentina
cortese, que en la captura estaban cortadas con «… Más». Se descartan en vez de publicarse
truncadas — una reseña cortada a mitad de frase se lee como un error, y completarla a ojo
sería inventar. Si más adelante se conecta la API de Places entran solas y completas.
- [x] ~~Fotos propias~~ — hechas. De las 8 imágenes de stock quedan **2**: blanqueamiento y
      odontopediatría, los únicos tratamientos sin foto propia. El resto se sirve desde
      `/public/assets`. No se usó una foto clínica propia para esos dos: la única candidata
      para blanqueamiento era en realidad un cementado de brackets, y etiquetarla mal en un
      sitio de salud es un error, no un detalle estético.
- [ ] **Faltan fotos de** blanqueamiento y de odontopediatría (no hay ninguna con niños).
- [ ] **Confirmar el listado de profesionales** de `content/team.ts`. En el export de
      Dentalink conviven profesionales reales con registros de demo (los de matrícula
      `MP 12.345 / 23.456 / 34.567` son correlativos y quedaron apartados en
      `teamPendingReview`).
- [x] URL del sitio y GA4 (`G-8D1XH5SJ9H`) con default en el código.

## QA

El checklist del §12 está verificado sobre el build de producción:

- 9 rutas × desktop/mobile sin errores de consola, imágenes rotas ni scroll horizontal
- Sin desbordes ni gutters rotos en 12 anchos (320 → 1920)
- Contraste ≥4.5:1 en todo el texto de las 9 rutas, en ambos viewports
- Todo link y botón ≥44px de alto en mobile
- Menú mobile: `aria-expanded`, `Esc`, foco atrapado, scroll bloqueado, cierra al navegar
- FAQ operable por teclado, una abierta a la vez
- `prefers-reduced-motion` corta carrusel y marquesina
- `rel="noopener noreferrer"` en todos los `target="_blank"`; iframes con `title` y `loading="lazy"`
- LCP: primera foto del carrusel `eager` + `fetchPriority="high"`, las otras cinco `lazy`
- Radios, paddings, hover, tamaños de logo y hamburguesa medidos contra §5/§6/§7 en ambos
  breakpoints (el mobile baja un escalón: cards 18px, paneles 22px, mapa 14px)
- Los tres eventos de conversión disparan con el destino correcto y los links internos no

## SEO y búsqueda con IA

El objetivo es doble: posicionar en «odontólogo Córdoba» / «dentista Nueva Córdoba», y que
un asistente con IA pueda responder «¿dónde hago una endodoncia en Córdoba?» citando este
sitio. Lo segundo se juega en datos estructurados y texto extraíble, no en keywords.

| Qué | Dónde |
|---|---|
| `Dentist` por sede, con `hasOfferCatalog` de los 6 tratamientos, `medicalSpecialty`, `areaServed`, horarios y `ReserveAction` | `lib/jsonld.tsx` |
| `MedicalProcedure` por tratamiento, con `howPerformed` armado desde los pasos | idem |
| `Article` con `articleBody`, `FAQPage` con las 8 preguntas, `BreadcrumbList` en las rutas de detalle | idem |
| `robots.txt` que nombra uno por uno a GPTBot, ClaudeBot, PerplexityBot, Google-Extended y compañía | `app/robots.ts` |
| `sitemap.xml` con las imágenes asociadas a cada página | `app/sitemap.ts` |
| `/llms.txt` generado desde `/content`, con NAP, tratamientos y FAQ en texto plano | `app/llms.txt/route.ts` |
| `alt` únicos y descriptivos en toda imagen | `content/photos.ts`, `content/treatments.ts`, `content/posts.ts` |

Dos advertencias para quien toque esto:

- **No bloquear `Google-Extended`.** No afecta aparecer en Google: gobierna si Gemini puede
  usar el contenido. Bloquearlo deja a la clínica fuera de esas respuestas.
- La adopción de `/llms.txt` todavía es despareja. Se publica porque cuesta nada y se genera
  desde el contenido, así que no puede quedar desactualizado; no reemplaza al HTML ni al JSON-LD.

## Por qué no hay JSON-LD de `Review`

Las reseñas son reales, pero **no** se emite structured data de `Review` ni
`AggregateRating`. Google prohíbe marcar como datos estructurados propios las reseñas
tomadas de sitios de terceros — incluido el propio Google. Hacerlo es *self-serving review
markup* y puede costar una acción manual. El flag está en `content/reviews.ts`
(`EMIT_REVIEW_SCHEMA`).
