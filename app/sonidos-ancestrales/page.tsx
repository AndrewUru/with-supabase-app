// app/sonidos-ancestrales/page.tsx
import Image from "next/image";
import Link from "next/link";

const WIPHLA_GRADIENT =
  "linear-gradient(90deg, #EE3124 0%, #FF6B00 16%, #FFD500 32%, #FFFFFF 48%, #00A859 64%, #0084C9 80%, #6D3B96 100%)";

const HERO_LINKS = [
  { href: "#principio", label: "Principio" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#practica", label: "Practica" },
] as const;

const HIGHLIGHTS = [
  { label: "Duracion", value: "60-90 min" },
  { label: "Modalidades", value: "Individual o grupal" },
  { label: "Formato", value: "Presencial / online" },
];

const INSTRUMENTS = [
  {
    name: "Cuencos tibetanos",
    description: "Harmonicos que relajan el sistema nervioso y liberan tension.",
  },
  {
    name: "Gongs",
    description: "Ondas expansivas que desbloquean patrones y revitalizan la energia.",
  },
  {
    name: "Cuencos de cuarzo",
    description: "Pureza tonal que invita a coherencia celular y claridad mental.",
  },
  {
    name: "Flautas nativas",
    description: "Melodias que reconectan con la memoria ancestral y el pulso de la tierra.",
  },
  {
    name: "Tambores ceremoniales",
    description: "Ritmo que ordena, enraiza y expande la conciencia.",
  },
  {
    name: "Voz",
    description: "Frecuencia viva que guia la experiencia y sostiene procesos.",
  },
];

const BENEFITS = [
  "Reduce estres y ansiedad",
  "Facilita descanso reparador",
  "Aporta claridad emocional",
  "Fortalece el sistema inmunologico",
  "Amplia la introspeccion",
];

const PRACTICE_TIPS = [
  {
    title: "Respiracion",
    detail: "Inhala profundo, exhala largo. Mantiene la coherencia y la escucha interna.",
  },
  {
    title: "Movimiento",
    detail: "Micro estiramientos y balanceos distribuyen la vibracion por todo el cuerpo.",
  },
  {
    title: "Hidratacion",
    detail: "Agua o infusiones antes y despues para acompanar la depuracion celular.",
  },
];

const SESSION_STEPS = [
  {
    title: "Recepcion",
    text: "Respiracion guiada e intencion para entrar en coherencia vibracional.",
  },
  {
    title: "Inmersion sonora",
    text: "Secuencias con cuencos, gongs y voz que recorren cuerpo fisico y sutil.",
  },
  {
    title: "Integracion",
    text: "Silencio consciente y pautas para prolongar la experiencia en tu vida diaria.",
  },
];

const IMAGE_GALLERY = [
  {
    src: "/images/sound-bath-01.jpg",
    alt: "Gong ceremonial en circulo de sonido",
    caption: "Gong ceremonial"
  },
  {
    src: "/images/sound-bath-02.jpg",
    alt: "Cuencos tibetanos sobre manta de colores",
    caption: "Cuencos tibetanos"
  },
];

export const metadata = {
  title: "Sonidos Ancestrales | EDHUCO",
  description:
    "Sesiones de sonido basadas en la ley de resonancia. Armonizacion fisica, emocional y mental con cuencos, gongs, flautas y voz.",
};

export default function SonidosAncestralesPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <FlagBackdrop />

      <section className="relative z-10 py-20">
        <div className="container-app space-y-12">
          <header className="space-y-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/80 backdrop-blur-sm">
              <span
                className="h-2 w-10 rounded-full"
                style={{ backgroundImage: WIPHLA_GRADIENT }}
                aria-hidden="true"
              />
              Sonoterapia integral
            </span>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-[48px]">
              Sonidos ancestrales para armonizar cuerpo, mente y espiritu
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Un viaje que mezcla vibracion, respiracion y silencio inspirado en la bandera Wiphala. Cada color simboliza la diversidad de frecuencias que nos habitan.
            </p>
          </header>

          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/80">
            {HERO_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm transition hover:border-white/35 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-6 rounded-3xl border border-white/20 bg-card/70 p-6 text-sm text-muted-foreground shadow-[0_32px_100px_-72px_rgba(17,24,39,0.84)] backdrop-blur-sm dark:bg-card/55 sm:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="space-y-1 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                  {item.label}
                </p>
                <p className="text-sm text-foreground/90">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="principio" className="relative z-10 border-t border-white/10 bg-background/60 py-16">
        <div className="container-app space-y-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-foreground sm:text-[40px]">
                Principio de resonancia
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Todo es vibracion. Cuando exponemos el sistema a frecuencias armonicas recordamos como autorregularnos: respiracion, pulso y mente entran en coherencia.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {SESSION_STEPS.map((step) => (
                  <div key={step.title} className="space-y-2 rounded-2xl border border-white/15 bg-card/80 p-4 text-sm text-muted-foreground shadow-[0_24px_70px_-64px_rgba(17,24,39,0.78)] backdrop-blur-sm dark:bg-card/55">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                      {step.title}
                    </p>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-[32px] border border-white/20 bg-card/70 p-6 text-sm text-muted-foreground shadow-[0_36px_110px_-72px_rgba(17,24,39,0.88)] backdrop-blur-sm dark:bg-card/55">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground/80">
                Instrumentos
              </p>
              <ul className="space-y-3">
                {INSTRUMENTS.map((instrument) => (
                  <li key={instrument.name} className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{instrument.name}</p>
                    <p>{instrument.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {IMAGE_GALLERY.map((item) => (
              <figure
                key={item.src}
                className="group relative overflow-hidden rounded-3xl border border-white/20 bg-card/70 shadow-[0_36px_120px_-70px_rgba(17,24,39,0.9)] backdrop-blur-sm dark:bg-card/55"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1200}
                  height={800}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-4 py-3 text-sm text-white">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="relative z-10 border-t border-white/10 bg-background py-16">
        <div className="container-app space-y-6">
          <div className="space-y-2 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
              Beneficios observados
            </span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-[40px]">
              Resultados que experimentaras
            </h2>
          </div>
          <ul className="mx-auto grid max-w-3xl gap-3 text-sm text-muted-foreground sm:text-base">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex gap-3">
                <span
                  className="mt-1 h-2 w-10 rounded-full"
                  style={{ backgroundImage: WIPHLA_GRADIENT }}
                  aria-hidden="true"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/#agenda"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/35 hover:text-foreground"
            >
              Reservar experiencia
            </Link>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur-sm transition hover:border-white/35 hover:text-foreground"
            >
              Consultar formaciones
            </Link>
          </div>
        </div>
      </section>

      <section id="practica" className="relative z-10 border-t border-white/10 bg-background/90 py-16">
        <div className="container-app grid gap-10 md:grid-cols-[minmax(0,1fr)_360px] md:items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-foreground sm:text-[40px]">
              Integra la experiencia en tu dia a dia
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Estas practicas sostienen la vibracion despues del encuentro y facilitan que el cuerpo incorpore los cambios.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {PRACTICE_TIPS.map((tip) => (
                <article
                  key={tip.title}
                  className="space-y-2 rounded-2xl border border-white/15 bg-card/80 p-4 text-sm text-muted-foreground shadow-[0_24px_70px_-64px_rgba(17,24,39,0.78)] backdrop-blur-sm dark:bg-card/55"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                    {tip.title}
                  </p>
                  <p>{tip.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-4 rounded-[32px] border border-white/20 bg-card/70 p-6 text-sm text-muted-foreground shadow-[0_36px_110px_-72px_rgba(17,24,39,0.88)] backdrop-blur-sm dark:bg-card/55">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground/80">
              Testimonio
            </p>
            <blockquote className="text-sm italic text-muted-foreground/90">
              &quot;La sesion me permitio liberar tensiones guardadas y reconectar con mi respiracion. Las vibraciones siguieron acompanandome varios dias.&quot;
            </blockquote>
          </aside>
        </div>
      </section>
    </main>
  );
}

function FlagBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-background">
      <div className="hidden h-full max-h-[560px] w-full max-w-[780px] overflow-hidden rounded-[48px] border border-white/20 shadow-[0_50px_160px_-80px_rgba(17,24,39,0.85)] md:flex">
        <div className="grid h-full w-full grid-cols-7">
          <span className="h-full w-full" style={{ backgroundColor: "#EE3124" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#FF6B00" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#FFD500" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#FFFFFF" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#00A859" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#0084C9" }} aria-hidden="true" />
          <span className="h-full w-full" style={{ backgroundColor: "#6D3B96" }} aria-hidden="true" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" aria-hidden="true" />
    </div>
  );
}
