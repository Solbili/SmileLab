import { links, site } from '@/content/site';
import { sedes, type Sede } from '@/content/sedes';
import type { Post } from '@/content/posts';
import { treatments, type Treatment } from '@/content/treatments';

/** Lun a Vie 9—19, Sáb 9—13, Dom cerrado (HANDOFF §9). */
const openingHours = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '19:00',
  },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '13:00' },
];

const telFromHref = (tel: string) => tel.replace('tel:', '');
const abs = (path: string) => (path.startsWith('http') ? path : `${site.url}${path}`);

/**
 * Catálogo de prestaciones. Es lo que permite a un buscador —o a un asistente
 * con IA— responder «¿hacen endodoncia en Córdoba?» citando el sitio, en vez de
 * tener que inferirlo del texto.
 */
const offerCatalog = {
  '@type': 'OfferCatalog',
  name: 'Tratamientos odontológicos',
  itemListElement: treatments.map((t) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'MedicalProcedure',
      name: t.name,
      description: t.detail,
      url: `${site.url}/tratamientos/${t.slug}`,
      procedureType: 'https://schema.org/TherapeuticProcedure',
    },
  })),
};

export function dentistSchema(sede: Sede) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${site.url}/sedes#${sede.slug}`,
    name: sede.name,
    alternateName: `${site.legalName} ${sede.zone}`,
    description: `Clínica odontológica en ${sede.barrio}. Limpieza dental, endodoncia, ortodoncia, blanqueamiento y odontopediatría. Turnos por WhatsApp o agenda online.`,
    parentOrganization: { '@id': `${site.url}#organization` },
    url: `${site.url}/sedes`,
    telephone: telFromHref(sede.tel),
    image: abs(sede.photo.src),
    logo: `${site.url}/assets/brand/icon-512.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: sede.street,
      addressLocality: 'Córdoba',
      addressRegion: 'Córdoba',
      addressCountry: 'AR',
    },
    ...(sede.geo && {
      geo: { '@type': 'GeoCoordinates', latitude: sede.geo.lat, longitude: sede.geo.lng },
    }),
    openingHoursSpecification: openingHours,
    hasMap: sede.maps,
    sameAs: [links.instagram],
    priceRange: '$$',
    medicalSpecialty: 'https://schema.org/Dentistry',
    areaServed: [
      { '@type': 'City', name: 'Córdoba' },
      { '@type': 'AdministrativeArea', name: 'Provincia de Córdoba' },
    ],
    currenciesAccepted: 'ARS',
    availableLanguage: { '@type': 'Language', name: 'Spanish', alternateName: 'es-AR' },
    hasOfferCatalog: offerCatalog,
    potentialAction: {
      '@type': 'ReserveAction',
      name: 'Sacar turno',
      target: { '@type': 'EntryPoint', urlTemplate: links.agenda },
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'MedicalOrganization'],
    '@id': `${site.url}#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/assets/brand/icon-512.png`,
    image: `${site.url}${site.ogImage}`,
    description: site.footerBlurb,
    foundingDate: site.foundingDate,
    sameAs: [links.instagram],
    areaServed: { '@type': 'City', name: 'Córdoba' },
    knowsLanguage: 'es-AR',
    department: sedes.map((s) => ({ '@id': `${site.url}/sedes#${s.slug}` })),
  };
}

export function serviceSchema(treatment: Treatment) {
  const url = `${site.url}/tratamientos/${treatment.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${url}#procedure`,
    name: treatment.name,
    description: treatment.detail,
    url,
    image: abs(treatment.img),
    procedureType: 'https://schema.org/TherapeuticProcedure',
    howPerformed: treatment.flow.map((f) => f.t).join(' '),
    provider: { '@id': `${site.url}#organization` },
    availableService: sedes.map((s) => ({ '@id': `${site.url}/sedes#${s.slug}` })),
    inLanguage: site.locale,
  };
}

export function articleSchema(post: Post) {
  const url = `${site.url}/para-informarte/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.desc,
    image: abs(post.img),
    mainEntityOfPage: url,
    inLanguage: site.locale,
    author: { '@id': `${site.url}#organization` },
    publisher: { '@id': `${site.url}#organization` },
    articleSection: post.tag,
    /* Cada bloque del artículo responde una pregunta concreta: declararlos ayuda
       a que un buscador con IA cite el párrafo exacto. */
    articleBody: post.body.map((b) => `${b.h}. ${b.p}`).join(' '),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: site.locale,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Migas de pan. No se dibujan (el diseño usa un «← volver»), pero sí se declaran. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Inicio', path: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Serializa evitando que un `</script>` en el contenido corte el bloque. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
