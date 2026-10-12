import type { Metadata } from 'next';
import { site } from '@/content/site';

type OpenGraph = NonNullable<Metadata['openGraph']>;

/**
 * Next reemplaza el `openGraph` del layout entero cuando una página define el
 * suyo (no lo mezcla campo por campo). Sin esto, cualquier página que cambia la
 * imagen pierde og:site_name, og:locale, og:type y og:url, y el preview de
 * WhatsApp/Facebook sale sin el nombre de la clínica — o sin imagen, si la
 * página no trae una propia.
 */
export function pageOpenGraph(path: string, og: OpenGraph = {}): OpenGraph {
  return {
    type: 'website',
    locale: 'es_AR',
    siteName: site.legalName,
    url: path,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.legalName }],
    ...og,
  } as OpenGraph;
}
