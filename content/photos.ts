/**
 * Fotos de Smile Lab (HANDOFF §10).
 *
 * Todas propias y tomadas en las dos sedes. Vienen recortadas por uso y por
 * breakpoint, JPEG calidad 82; next/image las re-encodea a AVIF/WebP y arma el
 * srcset, así que estos JPEG son el origen.
 *
 * Art direction en runtime SOLO en el masthead: el recorte desktop (1/0.92) y
 * el mobile (1/1.02) son encuadres distintos, no el mismo a distinta escala.
 *
 * Los `alt` describen la escena concreta, no el tratamiento, y no se repiten
 * entre imágenes: es lo que leen los lectores de pantalla y lo que indexan
 * tanto Google Imágenes como los buscadores con IA.
 *
 * Ninguna foto muestra a un paciente identificable: donde la toma original
 * incluía la cara, el recorte se cerró sobre el campo de trabajo.
 */

export type Photo = { src: string; alt: string };

/** Foto con dos recortes: uno por breakpoint. */
export type ArtDirectedPhoto = Photo & { mobile: string };

export const photos = {
  sedeGeneralPaz: {
    src: '/assets/desktop/sedes/general-paz.jpg',
    wide: '/assets/desktop/sedes/general-paz-16x9.jpg',
    alt: 'Recepción de la sede General Paz, con el equipo de Smile Lab atendiendo en el mostrador.',
  },
  sedeNuevaCordoba: {
    src: '/assets/desktop/sedes/nueva-cordoba.jpg',
    wide: '/assets/desktop/sedes/nueva-cordoba-16x9.jpg',
    alt: 'Consultorio de la sede Nueva Córdoba, con el sillón odontológico y el equipamiento listos.',
  },
  equipoPanel: {
    src: '/assets/desktop/equipo/equipo-retrato.jpg',
    alt: 'Dos odontólogas de Smile Lab en la recepción de la clínica.',
  },
  instrumental: {
    src: '/assets/articulos/cada-cuanto-hacer-una-limpieza.jpg',
    alt: 'Odontóloga sosteniendo el espejo, la pinza y el explorador que se usan en una limpieza dental.',
  },
  escaneo4x3: {
    src: '/assets/tratamientos/escaneo-4x3.jpg',
    alt: 'Odontóloga usando el escáner intraoral, con el modelo digital de la boca en la pantalla.',
  },
  ogImage: '/assets/brand/og-image.jpg',
} as const;

/**
 * Carrusel del masthead (HANDOFF §7.1).
 * 7 slides para 6 fotos: la primera se repite al final para que el loop no salte.
 */
const hero = (file: string, alt: string): ArtDirectedPhoto => ({
  src: `/assets/desktop/hero/${file}.jpg`,
  mobile: `/assets/mobile/hero/${file}.jpg`,
  alt,
});

const heroPhotos: ArtDirectedPhoto[] = [
  hero('equipo-recepcion', 'Equipo de Smile Lab en la recepción de la clínica.'),
  hero(
    'recepcion-madera',
    'Recepción de Smile Lab con frente de madera, jardín vertical y el cartel de la marca iluminado.'
  ),
  hero('consulta-escaner', 'Consultorio de Smile Lab durante un escaneo intraoral.'),
  hero('recepcion-general-paz', 'Recepción de la sede General Paz.'),
  hero('escaneo-intraoral', 'Odontóloga realizando un escaneo intraoral a una paciente.'),
  hero('ortodoncia-luz', 'Cementado de brackets de ortodoncia con lámpara de fotocurado.'),
  hero('equipo-retrato', 'Las profesionales de Smile Lab en el consultorio.'),
];

export const heroSlides: ArtDirectedPhoto[] = [...heroPhotos, heroPhotos[0]];
