import { photos } from './photos';

export type Sede = {
  slug: string;
  zone: string;
  name: string;
  street: string;
  barrio: string;
  phone: string;
  tel: string;
  /** 16/10 — card de sede. */
  photo: { src: string; alt: string };
  /** 16/9 — vista /sedes. */
  photoWide: string;
  maps: string;
  embed: string;
  wa: string;
  /** Coordenadas para el JSON-LD (HANDOFF §11). */
  geo?: { lat: number; lng: number };
  hours: { day: string; time: string }[];
};

const HOURS = [
  { day: 'Lunes a Viernes', time: '9:00 — 19:00' },
  { day: 'Sábados', time: '9:00 — 13:00' },
  { day: 'Domingos', time: 'Cerrado' },
];

const WA_TEXT = 'Hola%20Smile%20Lab%2C%20quer%C3%ADa%20hacer%20una%20consulta.';

export const sedes: Sede[] = [
  {
    slug: 'general-paz',
    zone: 'General Paz',
    name: 'Smile Lab General Paz',
    street: 'Gral. Román Deheza 158',
    barrio: 'Barrio General Paz, Córdoba',
    phone: '0351 688-6431',
    tel: 'tel:+543516886431',
    photo: { src: photos.sedeGeneralPaz.src, alt: photos.sedeGeneralPaz.alt },
    photoWide: photos.sedeGeneralPaz.wide,
    // cid = ficha de Google Business de la sede: abre el perfil con reseñas y horarios.
    maps: 'https://www.google.com/maps?cid=14798708644223069714',
    embed:
      'https://www.google.com/maps?q=Smile+Lab+General+Paz,+Gral.+Rom%C3%A1n+Deheza+158,+C%C3%B3rdoba,+Argentina&z=16&output=embed',
    wa: `https://wa.me/543516886431?text=${WA_TEXT}`,
    geo: { lat: -31.4131546, lng: -64.1619517 },
    hours: HOURS,
  },
  {
    slug: 'nueva-cordoba',
    zone: 'Nueva Córdoba',
    name: 'Smile Lab Nueva Córdoba',
    street: 'Av. Ambrosio Olmos 782',
    barrio: 'Barrio Nueva Córdoba, Córdoba',
    phone: '0351 15-258-4060',
    tel: 'tel:+5493512584060',
    photo: { src: photos.sedeNuevaCordoba.src, alt: photos.sedeNuevaCordoba.alt },
    photoWide: photos.sedeNuevaCordoba.wide,
    maps: 'https://www.google.com/maps?cid=11957966921173911950',
    embed:
      'https://www.google.com/maps?q=Smile+Lab+Nueva+C%C3%B3rdoba,+Av.+Ambrosio+Olmos+782,+C%C3%B3rdoba,+Argentina&z=16&output=embed',
    wa: `https://wa.me/5493512584060?text=${WA_TEXT}`,
    // Sin geo hasta confirmar el pin: el link de Maps que pasaron trae el centro
    // del mapa (zoom 14), no la ubicación, y las coordenadas viejas no estaban verificadas.
    hours: HOURS,
  },
];
