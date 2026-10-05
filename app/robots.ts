import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/**
 * El sitio quiere ser encontrado, también por los asistentes con IA: para una
 * clínica, que ChatGPT o Gemini puedan responder «¿dónde hago una endodoncia en
 * Córdoba?» citando este sitio vale tanto como una posición en Google.
 *
 * Los crawlers de IA ya quedaban habilitados por la regla `*`, pero se nombran
 * uno por uno para que la intención sea explícita y nadie los bloquee sin querer
 * al endurecer la regla general más adelante.
 *
 * Ojo con Google-Extended: NO afecta aparecer en Google; gobierna si Gemini
 * puede usar el contenido. Bloquearlo deja a la clínica fuera de esas respuestas.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'Bytespider',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
