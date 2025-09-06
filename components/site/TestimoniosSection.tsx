"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimoniosSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonios = [
    {
      name: "Caterina C.L.",
      text: "Un camino de sanación, humildad y empoderamiento. Resultados desde el primer momento.",
      rating: 5,
      location: "Barcelona, España",
    },
    {
      name: "Alicia P.",
      text: "La música me atravesó. Salí más ligera y presente. Una experiencia que cambió mi perspectiva completamente.",
      rating: 5,
      location: "Madrid, España",
    },
    {
      name: "María José R.",
      text: "Increíble cómo la terapia con sonido puede liberar emociones guardadas por años. Me siento renovada.",
      rating: 5,
      location: "Valencia, España",
    },
    {
      name: "Carlos M.",
      text: "Nunca pensé que los cuencos tibetanos pudieran tener un efecto tan profundo. Altamente recomendado.",
      rating: 5,
      location: "Sevilla, España",
    },
    {
      name: "Ana Sofía T.",
      text: "Cada sesión es un viaje hacia el interior. La profesionalidad y calidez hacen la diferencia.",
      rating: 5,
      location: "Bilbao, España",
    },
    {
      name: "Roberto L.",
      text: "Después de meses de estrés, encontré la paz que buscaba. Un enfoque holístico excepcional.",
      rating: 5,
      location: "Granada, España",
    },
    {
      name: "Isabel V.",
      text: "La combinación de sonido y energía crea una atmósfera única de sanación. Transformador.",
      rating: 5,
      location: "Zaragoza, España",
    },
    {
      name: "Diego F.",
      text: "Resultados inmediatos y duraderos. Ahora entiendo el poder curativo del sonido.",
      rating: 5,
      location: "Málaga, España",
    },
  ] as const;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonios.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonios.length]);

  const nextTestimonio = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonios.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonio = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonios.length) % testimonios.length
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonio = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="testimonios" className="section bg-muted/30 overflow-hidden">
      <div className="container-app text-center">
        <h2 className="text-balance text-3xl font-semibold md:text-4xl mb-4">
          Lo que dicen{" "}
          <span className="text-gradient">
            quienes ya vivieron la experiencia
          </span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          Descubre cómo la terapia con sonido ha transformado la vida de
          nuestros participantes
        </p>

        {/* Carrusel Principal */}
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonios Container */}
          <div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/20 shadow-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonios.map((testimonio) => (
                <div
                  key={testimonio.name}
                  className="w-full flex-shrink-0 p-8 md:p-12"
                >
                  <div className="max-w-3xl mx-auto">
                    {/* Quote Icon */}
                    <Quote className="h-12 w-12 text-accent/30 mx-auto mb-6" />

                    {/* Testimonio Text */}
                    <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-8 font-light">
                      &ldquo;{testimonio.text}&rdquo;
                    </blockquote>

                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonio.rating)].map((_, i) => (
                        <CheckCircle2
                          key={i}
                          className="h-5 w-5 text-accent mx-1"
                        />
                      ))}
                    </div>

                    {/* Author Info */}
                    <div className="space-y-2">
                      <p className="font-semibold text-lg text-foreground">
                        {testimonio.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonio.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonio}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>

          <button
            onClick={nextTestimonio}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Dots Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonios.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonio(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                index === currentIndex
                  ? "bg-accent scale-125 shadow-lg"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-700 ease-out"
              style={{
                width: `${((currentIndex + 1) / testimonios.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {currentIndex + 1} de {testimonios.length} testimonios
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 surface p-6 border border-brand/20 shadow-soft">
          <h3 className="text-xl font-semibold mb-2">
            ¿Listo para tu propia transformación?
          </h3>
          <p className="text-muted-foreground mb-4">
            Únete a quienes ya han experimentado el poder sanador del sonido
          </p>
          <button className="btn bg-brand text-primary-foreground hover:opacity-90 px-8 py-3 font-semibold transition-all duration-300 hover:scale-105 shadow-soft">
            Reservar Sesión
          </button>
        </div>
      </div>
    </section>
  );
}
