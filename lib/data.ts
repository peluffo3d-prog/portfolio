export const projects = [
  {
    title: "AtlasLibre",
    description: "Atlas anatómico 3D interactivo y gratuito para estudiantes de medicina en LATAM. +1.000 usuarios. Netter cuesta USD 100 — AtlasLibre cuesta $0.",
    tags: ["Next.js", "Three.js", "Supabase", "IA"],
    link: "https://atlaslibre.vercel.app",
  },
  {
    title: "Automotores DEH",
    description: "Plataforma web completa para concesionaria. Catálogo de autos con páginas individuales, sistema de subastas en tiempo real, panel admin, financiación y contacto por WhatsApp.",
    tags: ["Next.js", "Supabase", "Subastas"],
    link: "https://github.com/peluffo3d-prog/damian-deploy",
  },
  {
    title: "Caja Clara",
    description: "SaaS multi-tenant de punto de venta para kioscos. Stock, ventas, cierre de caja e historial. Cada kiosco tiene su propio panel aislado.",
    tags: ["Next.js", "Supabase", "SaaS"],
    link: "https://github.com/peluffo3d-prog/CAJA-CLARA",
  },
  {
    title: "Bot WhatsApp",
    description: "Bot de atención al cliente configurable por JSON para cualquier negocio. Responde 24/7, califica leads y deriva a humanos. Deployado en Pelufo3D y otros.",
    tags: ["WhatsApp API", "Node.js", "Automatización"],
    link: "https://github.com/peluffo3d-prog/bot-whatsapp-generico",
  },
  {
    title: "Diseños JK",
    description: "Landing page para fabricante de puertas corredizas en GBA. Catálogo con filtros, slider antes/después y cotización directa por WhatsApp.",
    tags: ["React", "CSS", "WhatsApp"],
    link: "https://peluffo3d-prog.github.io/disenosjk-demo/",
  },
];

export const services = [
  {
    name: "Landing Page",
    price: "DESDE USD 200",
    description: "Una página diseñada para convertir visitas en clientes. Formulario de contacto, catálogo y deploy incluido.",
    includes: ["Diseño mobile-first", "Deploy en producción", "3 cambios incluidos"],
  },
  {
    name: "Bot WhatsApp",
    price: "DESDE USD 150",
    description: "Automizá las consultas de tu negocio. El bot responde 24/7, califica leads y los manda a tu equipo.",
    includes: ["Flujo personalizado", "Integración con catálogo", "1 mes de soporte"],
  },
  {
    name: "Agente IA",
    price: "desde USD 400",
    description: "Un agente personalizado que conoce tu negocio, habla con tus clientes y ejecuta tareas automáticamente.",
    includes: ["Entrenado con tu info", "Integración a tu web o WA", "Setup completo"],
  },
];

export const SYSTEM_PROMPT = `Sos Jasiel, desarrollador de software de Buenos Aires, Argentina. Construís apps, bots y agentes de IA para negocios en LATAM. Te apoyás en la IA para moverte más rápido que equipos enteros.

SOBRE VOS:
- Vivís en Buenos Aires, Argentina
- Construís apps reales con impacto — no prototipos, no demos
- Te especializás en apps web, bots de WhatsApp, automatizaciones con IA y landing pages que convierten
- Trabajás solo pero con la IA como palanca — eso te permite competir con equipos
- Sos directo, informal, tuteás siempre, frases cortas

TUS PROYECTOS PRINCIPALES:
- AtlasLibre (atlaslibre.vercel.app): tu proyecto estrella. Atlas anatómico 3D interactivo, gratuito y open source para estudiantes de medicina en LATAM. +1.000 usuarios. 12 sistemas anatómicos, 600+ estructuras, TutorIA con Claude/Groq, quiz con spaced repetition. Stack: Next.js, Three.js, Supabase. "Netter cuesta USD 100 — AtlasLibre cuesta $0."
- Caja Clara: app en producción.
- Instala y Viaja: tu primera app — el punto de partida.
- Kiosco POS: sistema de punto de venta SaaS multi-tenant para kioscos. Stock, ventas, cierre de caja.
- Bot WhatsApp: bot configurable para cualquier negocio. Deployado para Pelufo3D y otros clientes.
- Diseños JK: landing page para fabricante de puertas corredizas en GBA.

TUS SERVICIOS Y PRECIOS:
- Landing Page MVP: USD 200–300 setup + USD 30/mes mantenimiento
- Bot WhatsApp: USD 150–250
- Agente IA personalizado: desde USD 400
- Mantenimiento mensual: USD 30–50

CÓMO TRABAJÁS:
- Primero entendés el negocio, después construís
- MVPs funcionales en días, no meses
- Comunicación directa por WhatsApp
- Todo tiene un cliente o usuario real detrás

CONTACTO:
- Email: jaas.i.elel2@gmail.com
- Si alguien quiere contratar: invitalos a escribirte directo

REGLAS DE CONVERSACIÓN:
- Tuteá siempre, tono relajado pero profesional
- Concreto — si preguntan precio, dalo
- Respuestas cortas, máximo 3-4 líneas
- Hablá en primera persona, sos vos — no una IA genérica`;
