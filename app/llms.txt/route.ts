import { links, site, hoursSummary } from '@/content/site';
import { sedes } from '@/content/sedes';
import { treatments } from '@/content/treatments';
import { posts } from '@/content/posts';
import { faqs } from '@/content/home';

/**
 * /llms.txt — resumen del sitio en texto plano para asistentes con IA
 * (convención de llmstxt.org).
 *
 * La adopción todavía es despareja: algunos asistentes lo leen y otros no. Se
 * publica igual porque cuesta nada y se genera desde /content, así que no puede
 * quedar desactualizado respecto del sitio. No reemplaza al HTML ni al JSON-LD:
 * es un atajo para que un modelo arme la respuesta correcta sin tener que
 * recorrer nueve páginas.
 */
export const dynamic = 'force-static';

export function GET() {
  const body = `# ${site.legalName}

> Clínica odontológica en Córdoba, Argentina, con dos sedes. Atención para adultos y niños. Los turnos se coordinan por WhatsApp o con la agenda online; no hay formulario de contacto.

## Datos de contacto

${sedes
  .map(
    (s) => `### ${s.name}
- Dirección: ${s.street}, ${s.barrio}
- Teléfono: ${s.phone}
- WhatsApp: ${s.wa}
- Cómo llegar: ${s.maps}`
  )
  .join('\n\n')}

Horarios (ambas sedes): ${hoursSummary.join(' · ')}
Agenda online: ${links.agenda}
Instagram: ${links.instagramHandle} — ${links.instagram}
En funcionamiento desde ${site.foundingDate}.

## Tratamientos

${treatments
  .map(
    (t) =>
      `- [${t.name}](${site.url}/tratamientos/${t.slug}): ${t.detail} Duración: ${t.duration}. Sesiones: ${t.sessions}. Disponible en ambas sedes.`
  )
  .join('\n')}

## Preguntas frecuentes

${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Artículos

${posts
  .map((p) => `- [${p.title}](${site.url}/para-informarte/${p.slug}): ${p.desc}`)
  .join('\n')}

## Notas

- Las reseñas que publica el sitio son reales y provienen de Google; no se emite structured data de Review porque Google no permite marcar como propias las reseñas tomadas de terceros.
- El sitio no vende online ni toma pagos: el único circuito es sacar turno.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
