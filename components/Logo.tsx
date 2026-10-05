import Link from 'next/link';

/**
 * Marca Smile Lab.
 *
 * El símbolo es el logo real del estudio —silueta de diente en teal claro con la
 * gema facetada encima— trazado desde el original que pasó el cliente. Los dos
 * paths salen de un calco medido sobre ese archivo: la silueta queda con un IoU
 * del 99,7 % y la gema del 97,9 % contra el raster, con desvíos de ±1px a 646px
 * de ancho. El HANDOFF §6 describía un diamante violeta (#7d8ac8) que el logo
 * real no usa; manda el archivo del cliente.
 *
 * Va SIN el «SMILE LAB» interno: a tamaño de header queda por debajo de 8px y es
 * ilegible. El wordmark de al lado cumple esa función y se renderiza nítido
 * porque es texto, no imagen.
 *
 * El viewBox no es cuadrado (100 × 98.48) porque el logo original tampoco lo es:
 * su caja medida es 646 × 636.
 */

const TOOTH =
  'M21.24 0L78.76 0C91.39 1.49 100 10.97 100 23.57C99.67 33.81 96.01 44.03 92.48 53.49C87.75 65.47 82.16 77.27 76.05 88.53C73.62 92.92 70.34 97.74 64.81 98.45C58.32 98.88 53.67 94.5 50 89.61C46.33 94.5 41.68 98.88 35.19 98.45C29.66 97.74 26.38 92.92 23.95 88.53C17.84 77.27 12.25 65.47 7.52 53.49C3.99 44.03 0.33 33.81 0 23.57C0 10.97 8.61 1.49 21.24 0Z';
const GEM =
  'M21.24 0L78.76 0C80.97 0 82.83 1.29 84.34 3.88L98.76 28.68C99.69 30.75 99.28 32.92 97.52 35.2L51.47 87.6C50.74 88.43 50.25 88.84 50 88.84C49.75 88.84 49.26 88.43 48.53 87.6L2.48 35.2C0.72 32.92 0.31 30.75 1.24 28.68L15.66 3.88C17.17 1.29 19.03 0 21.24 0Z';

type Props = {
  /** `dark` es la variante del footer, sobre #22343a. */
  tone?: 'light' | 'dark';
  className?: string;
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 98.48" aria-hidden="true" className={className}>
      <path d={TOOTH} fill="var(--color-brand-light)" />
      <path d={GEM} fill="var(--color-brand)" />
    </svg>
  );
}

export function Logo({ tone = 'light', className = '' }: Props) {
  const dark = tone === 'dark';

  return (
    <Link
      href="/"
      aria-label="Smile Lab Odontología — ir al inicio"
      className={`flex min-h-11 shrink-0 items-center gap-2.5 lg:gap-[13px] ${className}`}
    >
      <LogoMark className={dark ? 'size-9 lg:size-10' : 'size-[34px] lg:size-[42px]'} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[14px] tracking-[0.18em] lg:text-[16.5px] lg:tracking-[0.2em] ${
            dark ? 'text-white' : 'text-ink'
          }`}
        >
          SMILE LAB
        </span>
        <span
          className={`mt-1 font-display text-[7.5px] tracking-[0.28em] lg:mt-[5px] lg:text-[8.5px] lg:tracking-[0.3em] ${
            dark ? 'text-footer-label' : 'text-muted2'
          }`}
        >
          ODONTOLOGÍA
        </span>
      </span>
    </Link>
  );
}
