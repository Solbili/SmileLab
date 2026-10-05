# Prompt para Claude Design — Sistema de diseño de anuncios Smile Lab

> Copiá todo lo que está debajo de la línea y pegalo en Claude Design.
> Adjuntá además: el logo (`Gemini_Generated_Image_davj4gdavj4gdavj.jpg`) y 6–10 fotos
> propias de las clínicas. Claude Design no tiene acceso al repositorio ni al sitio.

---

Necesito un **sistema de diseño para anuncios de Meta (Facebook/Instagram) y Google Ads** de
una clínica odontológica. No quiero piezas sueltas: quiero el sistema con el que después voy
a crear y editar decenas de anuncios, así que todo tiene que estar parametrizado —cambiar
foto, titular y oferta sin rediseñar nada—.

La marca ya existe y tiene un sitio web en producción. **El sistema tiene que respetar esos
estilos exactamente.** Abajo van los valores reales, medidos del código. No los aproximes ni
los "mejores": si algo te parece que no funciona para publicidad, proponelo como extensión
declarada, no como reemplazo silencioso.

---

## 1. La marca

- **Nombre:** Smile Lab · **Razón social:** Smile Lab Odontología
- **Rubro:** clínica odontológica, adultos y niños. Desde 2019.
- **Dónde:** Córdoba, Argentina. Dos sedes:
  - **General Paz** — Gral. Román Deheza 158 · WhatsApp +54 351 688-6431
  - **Nueva Córdoba** — Av. Ambrosio Olmos 782 · WhatsApp +54 9 351 258-4060
- **Tagline:** «Odontología clara y cercana en Córdoba.»
- **Instagram:** @smilelabargentina
- **Horarios:** Lun a Vie 9–19 · Sáb 9–13 · Dom cerrado
- **Tratamientos:** limpieza dental, endodoncia, caries y restauraciones, ortodoncia,
  blanqueamiento, odontopediatría.
- **Conversión principal:** WhatsApp. Secundaria: agenda online.

El posicionamiento es **claridad y cercanía, no lujo ni clínica fría**. Nada de oro, mármol
negro, "experiencia premium" ni promesas de transformación. El tono es el de un consultorio
que te explica las cosas bien y te saca el turno por WhatsApp sin vueltas.

---

## 2. Color

Paleta real del sitio. **Los roles importan tanto como los valores** — no uses un color fuera
de su rol.

### Base
| Token | Hex | Rol |
|---|---|---|
| `bg` | `#f6fafa` | Fondo general. Es el lienzo por defecto, no el blanco puro. |
| `surface` | `#ffffff` | Tarjetas y superficies elevadas |
| `line` | `#e6f1f1` | Bordes de tarjeta |
| `photo` | `#cfe6e6` | Placeholder detrás de fotos mientras cargan |

### Tinta
| Token | Hex | Rol |
|---|---|---|
| `ink` | `#22343a` | Titulares y texto fuerte |
| `body` | `#51666b` | Texto corrido |
| `muted2` | `#5d7075` | Metadatos, pies, legales |

### Acento (la familia que lleva el peso visual)
| Token | Hex | Rol |
|---|---|---|
| `accent` | `#8cc3c8` | Fondo de botón primario, bloques de color |
| `accent-hover` | `#6fb0b7` | Estado hover |
| `accent-soft` | `#bfdfe0` | Fondos suaves, chips |
| `accent-deep` | `#a9d3d5` | Degradés |
| `accent-ink` | `#3c757c` | **Texto** en acento (kickers, links) — es el teal legible |
| `accent-italic` | `#4d9199` | La palabra en itálica dentro de los titulares |
| `on-accent` | `#1b2c31` | Texto **sobre** `accent` |

### Banda oscura
| Token | Hex | Rol |
|---|---|---|
| `dark` | `#22343a` | Fondo de la banda oscura (footer, CTA) |
| `dark-deep` | `#0f1d21` | Hover sobre oscuro |
| `dark-body` | `#b9cbce` | Texto corrido sobre oscuro |
| `dark-line3` | `#46595f` | Bordes de botón sobre oscuro |

### Marca (reservados para el logo)
| Token | Hex | Rol |
|---|---|---|
| `brand` | `#327180` | La gema del logo |
| `brand-light` | `#afd1d3` | La silueta de diente del logo |

### Reglas de color — no negociables

1. **`#8cc3c8` es claro. Texto blanco encima NO pasa contraste.** Sobre `accent` siempre va
   `#1b2c31`. Si en algún lado necesitás texto claro sobre teal, el fondo tiene que ser
   `#3c757c` o más oscuro.
2. **Todo texto ≥ 4.5:1.** Para texto grande (≥24px bold o ≥30px regular) alcanza 3:1, pero
   en anuncios el texto se ve chico en el feed: aplicá 4.5:1 a todo y listo.
3. **`brand` y `brand-light` son del logo.** No los uses como fondo de bloques ni como color
   de botón — para eso está la familia `accent`. Si el logo convive con un bloque `accent`,
   dejá aire entre los dos.
4. **El fondo por defecto es `#f6fafa`, no blanco.** El blanco se reserva para tarjetas.
5. **Un solo bloque oscuro por pieza como máximo.** La marca es clara; el oscuro es acento
   estructural, no tema alternativo.

---

## 3. Tipografía

Dos familias, ambas de Google Fonts (gratuitas, disponibles en Canva y en el editor de Meta):

- **Display: Jost** — pesos 300, 400, 500, 600 + itálicas
- **Texto: Hanken Grotesk** — pesos 400, 500, 600

### Cómo se usan en el sitio

| Uso | Familia | Peso | Tracking | Line-height |
|---|---|---|---|---|
| H1 | Jost | **300 (Light)** | −0.02em | 1.05–1.1 |
| H2 | Jost | **300 (Light)** | −0.005em | 1.15 |
| H3 | Jost | 400 | — | 1.25 |
| Kicker (overline) | Jost | 400, MAYÚSCULAS | **+0.24em** | 1 |
| Texto corrido | Hanken Grotesk | 400 | — | 1.7 |
| Botón | Hanken Grotesk | 600 | — | 1 |
| Wordmark del logo | Jost | 400, MAYÚSCULAS | +0.18em / +0.2em | 1 |

**La firma tipográfica de la marca son los titulares en Jost Light con tracking negativo.**
Es lo que la hace reconocible. No los engordes a Bold "para que se lean en el feed": en vez
de eso, subí el cuerpo. Un H1 de anuncio arranca en 72px sobre lienzo de 1080.

**Recurso de titular:** una palabra en **Jost Light itálica** color `#4d9199` dentro de un
titular por lo demás en `#22343a`. Así se ve en el sitio: *«Viví la magia de una sonrisa
perfecta.»* — "perfecta" va en itálica teal. Usalo una vez por pieza, nunca dos.

---

## 4. Forma

Radios del sitio (escalalos proporcionalmente al tamaño del anuncio):

| Elemento | Radio |
|---|---|
| Botones | pill, 999px |
| Paneles grandes | 28px |
| Tarjetas | 22px (18px en mobile) |
| Tiles | 18px |
| Mapas / marcos chicos | 16px |

Botones: **pill siempre**, alto mínimo 44px en web (escalá a ~72–88px en lienzo 1080),
padding 26px horizontal / 15px vertical, texto Hanken 600.

Variantes de botón que existen:
- **Primario:** fondo `#8cc3c8`, texto `#1b2c31`
- **Secundario:** fondo blanco, borde `#d4e8e9`, texto `#22343a`
- **Sobre oscuro:** borde `#46595f`, texto blanco
- **Sólido oscuro:** fondo `#22343a`, texto blanco

Sombras: casi no hay. La única del sitio es `0 16px 34px -22px rgba(34,52,58,0.4)` en hover
de tarjeta. **No agregues sombras duras ni glows.** La separación se hace con borde de 1px
`#e6f1f1` y con el fondo `#f6fafa`.

---

## 5. El logo

Diente en teal claro con una gema facetada encima. **Adjunto el archivo original.** Si
necesitás reproducirlo vectorialmente, estos son los paths exactos del sitio
(viewBox `0 0 100 98.48`):

```svg
<svg viewBox="0 0 100 98.48" xmlns="http://www.w3.org/2000/svg">
  <path fill="#afd1d3" d="M21.24 0L78.76 0C91.39 1.49 100 10.97 100 23.57C99.67 33.81 96.01 44.03 92.48 53.49C87.75 65.47 82.16 77.27 76.05 88.53C73.62 92.92 70.34 97.74 64.81 98.45C58.32 98.88 53.67 94.5 50 89.61C46.33 94.5 41.68 98.88 35.19 98.45C29.66 97.74 26.38 92.92 23.95 88.53C17.84 77.27 12.25 65.47 7.52 53.49C3.99 44.03 0.33 33.81 0 23.57C0 10.97 8.61 1.49 21.24 0Z"/>
  <path fill="#327180" d="M21.24 0L78.76 0C80.97 0 82.83 1.29 84.34 3.88L98.76 28.68C99.69 30.75 99.28 32.92 97.52 35.2L51.47 87.6C50.74 88.43 50.25 88.84 50 88.84C49.75 88.84 49.26 88.43 48.53 87.6L2.48 35.2C0.72 32.92 0.31 30.75 1.24 28.68L15.66 3.88C17.17 1.29 19.03 0 21.24 0Z"/>
</svg>
```

### Reglas de logo

- **Lockup horizontal:** símbolo + «SMILE LAB» (Jost 400, +0.2em) con «ODONTOLOGÍA» debajo
  (Jost 400, +0.3em, ~50% del cuerpo). El gap entre símbolo y texto es ~13px sobre un
  símbolo de 42px — mantené esa proporción.
- **El símbolo va sin el "SMILE LAB" interno.** El logo original lo tiene adentro de la gema,
  pero por debajo de ~120px de alto no se lee. En anuncios, símbolo limpio + wordmark al lado.
- **Área de respeto:** la mitad del ancho del símbolo por cada lado.
- **Tamaño mínimo del símbolo en anuncio:** 48px sobre lienzo de 1080.
- **Sobre foto:** nunca el logo suelto encima de una foto con detalle. Va sobre una barra o
  tarjeta de `#ffffff` o `#f6fafa`, o sobre una zona lisa.
- **Nota:** la cartelería física de las sedes todavía está en violeta (`#7d8ac8`). El teal es
  el vigente. Si hacés mockups con fotos del local, no corrijas el violeta de las fotos.

---

## 6. Fotografía

La clínica tiene fotos propias: tratamientos reales (brackets, aislación absoluta,
restauraciones), recepción, equipo trabajando. **Te las adjunto.**

- **Nada de stock de "pacientes felices".** Es publicidad de salud: una persona que no es
  paciente presentada como paciente es engañosa, y además se nota.
- Encuadre: cálido, luz natural, mucho blanco y teal. Nada de primeros planos clínicos
  agresivos ni sangre.
- Los recortes del sitio van de 16/9 a 1/1.02. Para anuncios vas a necesitar 1:1, 4:5 y 9:16:
  **definí un punto focal por foto** y derivá los tres recortes de ahí.
- **Overlay:** cuando haya texto sobre foto, usá un velo de `#22343a` al 35–55% o una tarjeta
  sólida. No pongas texto sobre foto sin fondo: en el feed se pierde.

---

## 7. Voz y copy

**Español rioplatense con voseo.** El sitio dice «Coordiná tu turno», «Elegí la sede»,
«Sacá turno», «Consultá por WhatsApp». Nunca «coordina», «reserva tu cita» ni «agenda tu
consulta» en neutro.

- Frases cortas. Cero signos de exclamación.
- Hablá de lo concreto: turno por WhatsApp, dos sedes, atención para chicos, el tratamiento
  puntual. No de "sonrisas que transforman vidas".
- **Prohibido prometer resultados** («te dejamos la sonrisa perfecta», «sin dolor
  garantizado»). Es publicidad sanitaria.
- Si una pieza menciona precio o promoción, tiene que aclarar vigencia y condiciones.
- CTA recurrentes: «Sacar turno» · «Consultar por WhatsApp» · «Ver tratamientos»

---

## 8. Formatos que necesito

Armá **artboards a tamaño real** para todos estos.

### Meta (Facebook + Instagram)
| Formato | Medida | Notas |
|---|---|---|
| Feed cuadrado | 1080 × 1080 | |
| Feed vertical | 1080 × 1350 | el más usado en IG |
| Stories | 1080 × 1920 | zona segura: libre 250px arriba y 250px abajo |
| Reels | 1080 × 1920 | zona segura: libre 250px arriba y **420px abajo** (ahí van perfil, caption y CTA) |

Marcá las zonas seguras como guías visibles en los artboards 9:16.
Texto primario: ~125 caracteres antes del "ver más". Titular: ~27–40 caracteres.

### Google Ads
| Formato | Medida | Notas |
|---|---|---|
| Display horizontal | 1200 × 628 (1.91:1) | |
| Display cuadrado | 1200 × 1200 (1:1) | |
| Display vertical | 960 × 1200 (4:5) | |
| Logo cuadrado | 1200 × 1200 | fondo sólido, símbolo centrado |
| Logo horizontal | 1200 × 300 (4:1) | lockup completo |
| Demand Gen vertical | 1080 × 1920 | |

Titular: 30 caracteres. Titular largo: 90. Descripción: 90.
Para Performance Max hace falta mínimo una imagen de cada relación — dejá los tres recortes
derivables de la misma foto.

---

## 9. Qué quiero recibir

1. **Hoja de tokens** — color (con el rol de cada uno y los pares de contraste que pasan),
   tipografía, radios, espaciado, sombras.
2. **Componentes** — logo en sus variantes, botón en sus 4 variantes, kicker, bloque de
   titular, tarjeta de tratamiento, bloque de sede (dirección + WhatsApp), franja de legales.
3. **Plantillas por formato**, con slots nombrados y claros (`{titular}`, `{foto}`,
   `{tratamiento}`, `{sede}`, `{cta}`), en al menos 4 variantes de layout:
   - foto completa con velo y titular encima
   - split 50/50 foto + bloque de color
   - fondo plano `#f6fafa` con titular grande y foto chica
   - banda oscura `#22343a` con texto claro
4. **Tres anuncios de ejemplo armados** con copy real, uno por tipo de campaña:
   limpieza dental (volumen), ortodoncia (consideración), odontopediatría (segmento).
5. **Una página de do / don't** con los errores probables de esta marca:
   blanco sobre `#8cc3c8`, titulares en Bold, `brand` usado como fondo, logo sobre foto
   con detalle, más de una itálica por pieza, texto sin velo sobre foto.
6. **Checklist pre-publicación**: contraste verificado, zonas seguras respetadas, logo en
   tamaño mínimo, sin promesa de resultado, condiciones de la promo si hay precio.

---

## 10. Restricciones

- **No inventes colores ni tipografías.** Si hace falta algo que no está (un color de error,
  un amarillo de oferta), proponelo aparte y justificalo; no lo mezcles con los tokens.
- **No cambies la proporción del logo** (es 100:98.48, no cuadrado) ni le pongas efectos.
- **No uses degradés** salvo el velo sobre foto. El sitio tiene uno solo y es decorativo.
- **No pongas "20% OFF" ni urgencia falsa.** Si hay promo, la define el cliente.
- Dejá un slot de **legales** en cada plantilla (director odontológico y matrícula). En
  Córdoba la publicidad odontológica está regulada por el Colegio provincial y conviene
  tenerlo previsto — confirmá el texto exacto con ellos antes de publicar.
