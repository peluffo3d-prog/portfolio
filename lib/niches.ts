export type Niche = {
  slug: string;
  niche: string;
  businessName: string;
  tagline: string;
  accent: string;
  bg: string;
  fg: string;
  heroImage: string;
  valueProps: { title: string; body: string }[];
  gallery: { image: string; label: string }[];
  testimonial: { quote: string; author: string };
  ctaText: string;
  blurb: string;
};

export const NICHES: Niche[] = [
  {
    slug: "gastronomia",
    niche: "Gastronomía",
    businessName: "Casa Ombú",
    tagline: "Cocina de estación, a la vista del río.",
    accent: "#C9622E",
    bg: "#16100c",
    fg: "#f3e8da",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80",
    blurb: "Así se vería la landing de tu restô, bar o cafetería.",
    valueProps: [
      { title: "Reserva en un toque", body: "El cliente elige día, horario y cantidad de personas sin llamar — confirmación directa por WhatsApp." },
      { title: "Menú que da hambre", body: "Galería de platos con buena fotografía hace más por las ventas que cualquier descuento." },
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80", label: "Plato de autor" },
      { image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80", label: "Terraza" },
      { image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=900&q=80", label: "Salón" },
      { image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=900&q=80", label: "Cocina de estación" },
    ],
    testimonial: { quote: "Desde que tenemos la reserva online no perdemos una mesa los fines de semana.", author: "— dueño, ejemplo del rubro" },
    ctaText: "¿Tenés un restô, bar o cafetería? Armemos esto para vos.",
  },
  {
    slug: "salud-estetica",
    niche: "Salud & Estética",
    businessName: "Studio Nora",
    tagline: "Tu mejor versión, en manos de profesionales.",
    accent: "#7E9B82",
    bg: "#f4f1ea",
    fg: "#222a23",
    heroImage: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1600&q=80",
    blurb: "Así se vería la landing de tu clínica, barbería o spa.",
    valueProps: [
      { title: "Turnos sin llamadas", body: "El paciente elige tratamiento, profesional y horario disponible — se carga solo en tu agenda." },
      { title: "Confianza antes de la primera visita", body: "Fotos del espacio, del equipo y resultados reales bajan la fricción de agendar el primer turno." },
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&q=80", label: "Sala de tratamientos" },
      { image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900&q=80", label: "Barbería" },
      { image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=900&q=80", label: "Relax" },
      { image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80", label: "Línea propia" },
    ],
    testimonial: { quote: "Los turnos online nos liberaron a las chicas de recepción de estar todo el día al teléfono.", author: "— dueña, ejemplo del rubro" },
    ctaText: "¿Tenés una clínica, barbería o spa? Armemos esto para vos.",
  },
  {
    slug: "inmobiliaria",
    niche: "Inmobiliaria & Construcción",
    businessName: "Horizonte Desarrollos",
    tagline: "Propiedades que se venden solas — bien mostradas.",
    accent: "#5C7AA8",
    bg: "#0d1117",
    fg: "#eef1f6",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    blurb: "Así se vería la landing de tu inmobiliaria o desarrollo.",
    valueProps: [
      { title: "Catálogo siempre actualizado", body: "Cada propiedad con su ficha, fotos y estado — vos cambiás precios y disponibilidad sin depender de nadie." },
      { title: "Leads calificados, no curiosos", body: "El visitante filtra por zona y presupuesto antes de escribirte — llegás a la conversación con contexto." },
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80", label: "Zona" },
      { image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=900&q=80", label: "Propiedad destacada" },
      { image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80", label: "Interiores" },
      { image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80", label: "Departamentos" },
    ],
    testimonial: { quote: "Pasamos de mandar PDFs por mail a tener un catálogo que el cliente recorre solo.", author: "— desarrollador, ejemplo del rubro" },
    ctaText: "¿Tenés una inmobiliaria o desarrollo? Armemos esto para vos.",
  },
  {
    slug: "retail-showroom",
    niche: "Retail & Showroom",
    businessName: "Taller Roble",
    tagline: "Muebles a medida, hechos para durar.",
    accent: "#B5762A",
    bg: "#f1e9da",
    fg: "#241b12",
    heroImage: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1600&q=80",
    blurb: "Así se vería la landing de tu showroom o producto a medida.",
    valueProps: [
      { title: "Configurador en vivo", body: "El cliente elige material, medidas y terminación, ve el precio al instante — como hicimos con Diseños JK." },
      { title: "El producto se vende con la foto", body: "Catálogo cuidado de cada pieza, con su material y su precio claro, sin tener que preguntar." },
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80", label: "Pieza destacada" },
      { image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80", label: "Living" },
      { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80", label: "Tapizados" },
      { image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=900&q=80", label: "Mueble a medida" },
    ],
    testimonial: { quote: "El configurador de precio nos saca de encima las consultas que no iban a comprar.", author: "— dueño, ejemplo del rubro" },
    ctaText: "¿Tenés un showroom o fabricás a medida? Armemos esto para vos.",
  },
];

export function getNiche(slug: string) {
  return NICHES.find(n => n.slug === slug);
}
