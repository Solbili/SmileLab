import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { treatments } from '@/content/treatments';
import { posts } from '@/content/posts';
import { photos } from '@/content/photos';

const abs = (p: string) => (p.startsWith('http') ? p : `${site.url}${p}`);

/**
 * Las entradas llevan `images`: es lo que hace que las fotos propias de las
 * sedes y de los tratamientos entren a Google Imágenes asociadas a su página.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; images?: string[] }[] = [
    { path: '', priority: 1, images: [photos.ogImage] },
    { path: '/tratamientos', priority: 0.9, images: treatments.map((t) => t.img) },
    {
      path: '/sedes',
      priority: 0.9,
      images: [photos.sedeGeneralPaz.wide, photos.sedeNuevaCordoba.wide],
    },
    { path: '/turnos', priority: 0.8 },
    { path: '/contacto', priority: 0.8 },
    { path: '/pacientes', priority: 0.7, images: [photos.equipoPanel.src] },
    { path: '/para-informarte', priority: 0.6, images: posts.map((p) => p.img) },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: r.priority,
      ...(r.images && { images: r.images.map(abs) }),
    })),
    ...treatments.map((t) => ({
      url: `${site.url}/tratamientos/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [abs(t.img)],
    })),
    ...posts.map((p) => ({
      url: `${site.url}/para-informarte/${p.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
      images: [abs(p.img)],
    })),
  ];
}
