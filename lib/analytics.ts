/**
 * Analítica (HANDOFF §1).
 *
 * No hay checkout: los únicos eventos de conversión del sitio son los tres clics
 * que sacan al usuario hacia el funnel real — WhatsApp, la agenda de Dentalink y
 * el mapa de una sede.
 */

/**
 * El ID de GA4 es público (va en el HTML), así que vive acá y no depende de que
 * alguien cargue la variable en Vercel. Solo se activa en producción: los
 * previews y el dev no ensucian los datos. NEXT_PUBLIC_GA_ID lo pisa si hace falta.
 */
const GA_PROD_ID = 'G-8D1XH5SJ9H';

const GTM_PROD_ID = 'GTM-TTMM39DR';

const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? (isProd ? GA_PROD_ID : undefined);

/**
 * Tag Manager carga lo que se administra desde su panel (Google Ads, Píxel de
 * Meta, etc.). GA4 NO va ahí: ya lo carga este código, y una etiqueta de GA4 en
 * GTM duplicaría las visitas.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? (isProd ? GTM_PROD_ID : undefined);

export type ConversionEvent = 'wsp_click' | 'agenda_click' | 'sede_maps_click';

/**
 * Clasifica un href en uno de los tres eventos.
 * Se resuelve por destino y no por un handler en cada botón: así cualquier CTA
 * que se agregue después queda medido sin tocar el tracking.
 */
export function eventForHref(href: string | null | undefined): ConversionEvent | null {
  if (!href) return null;

  if (href.includes('wa.me')) return 'wsp_click';
  if (href.includes('agenda.softwaredentalink.com')) return 'agenda_click';
  if (href.includes('google.com/maps')) return 'sede_maps_click';

  return null;
}

type GtagParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event' | 'config' | 'js', target: string, params?: GtagParams) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: ConversionEvent, params: GtagParams = {}) {
  window.gtag?.('event', event, params);
  // Para GTM: el mismo evento como «Evento personalizado» (wsp_click, etc.), que
  // es lo que disparan las conversiones de Ads y del Píxel de Meta.
  if (GTM_ID) (window.dataLayer = window.dataLayer || []).push({ event, ...params });
}
