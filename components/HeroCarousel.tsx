import { heroSlides } from '@/content/photos';

/**
 * Carrusel del masthead (HANDOFF §7.1).
 *
 * El diseño fija los keyframes para 7 slides (6 fotos + la primera repetida al
 * final, para que el loop no salte). Acá se calculan a partir de la cantidad
 * real: si alguien suma o saca una foto, el carrusel sigue andando en vez de
 * desalinearse en silencio. Con 7 slides reproduce exactamente los valores del
 * handoff — paso 14,2857%, reposo hasta 11%, ciclo de 45s.
 *
 * Cada foto queda quieta ~5s y la transición dura ~1,5s.
 *
 * Va <picture> y no next/image a propósito: el recorte desktop (1160×1067,
 * 1/0.92) y el mobile (760×775, 1/1.02) son encuadres DISTINTOS, y next/image
 * no hace art direction. Con <source media> el navegador baja un solo archivo.
 *
 * Con prefers-reduced-motion la animación se corta y queda visible solo la
 * primera foto — lo resuelve globals.css, no hace falta JS.
 */

const SLIDES = heroSlides.length;
const STEP = 100 / SLIDES; // porción del ciclo que ocupa cada slide
const HOLD = STEP * 0.77; // el diseño mantiene 11% de cada paso de 14,2857%
const DURATION = (45 / 7) * SLIDES; // 45s para 7 slides, proporcional al resto

const keyframes = `@keyframes slhero{${heroSlides
  .map((_, i) => {
    const from = (i * STEP).toFixed(4);
    const to = (i * STEP + HOLD).toFixed(4);
    const x = (-i * STEP).toFixed(4);
    return `${from}%,${to}%{transform:translateX(${x}%)}`;
  })
  .join('')}}`;

export function HeroCarousel() {
  return (
    <div className="relative aspect-[1/1.02] lg:aspect-[1/0.92]">
      {/* Los keyframes dependen de la cantidad de fotos, así que se emiten acá
          y no en globals.css. */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <div
        className="absolute inset-0 overflow-hidden bg-photo"
        style={{ clipPath: 'url(#sl-tooth)' }}
      >
        <div
          className="hero-track"
          style={{ width: `${SLIDES * 100}%`, animationDuration: `${DURATION}s` }}
        >
          {heroSlides.map((slide, i) => {
            const first = i === 0;

            return (
              <div
                key={`${slide.src}-${i}`}
                className="hero-slide"
                style={{ width: `${STEP}%` }}
              >
                <picture>
                  <source
                    media="(min-width: 1024px)"
                    srcSet={slide.src}
                    width={1160}
                    height={1067}
                  />
                  <img
                    src={slide.mobile}
                    /* La 1ª foto es el LCP: eager + alta prioridad. El resto, lazy. */
                    alt={first ? slide.alt : ''}
                    aria-hidden={first ? undefined : true}
                    width={760}
                    height={775}
                    loading={first ? 'eager' : 'lazy'}
                    fetchPriority={first ? 'high' : 'auto'}
                    decoding={first ? 'sync' : 'async'}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </picture>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
