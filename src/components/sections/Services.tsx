"use client";

import { useRef } from "react";
import { services, certifications } from "@/data/services";
import { useGsapReveal } from "@/lib/gsap";
import { Code2, Palette, Layers, Terminal, Check, Award } from "lucide-react";

const serviceIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  "Frontend Development": Code2,
  "Fullstack Development": Layers,
  "UI/UX Implementation": Palette,
  "VS Code Extensions": Terminal,
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGsapReveal(titleRef, "up", 0.8);

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-12 md:mb-16 text-center">
          <span className="inline-block font-mono text-lime text-sm tracking-widest uppercase mb-3">
            {"// What I Do"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Services I Offer
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Comprehensive web development services tailored to bring your vision to life.
          </p>
          <div className="h-1 w-16 bg-lime mt-6 rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <Certifications />
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: typeof services[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = serviceIcons[service.title];
  useGsapReveal(cardRef, "up", 0.8, index * 0.1);

  return (
    <div
      ref={cardRef}
      className="group relative p-6 rounded-xl bg-surface-elevated border border-border hover:border-border-lime transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-lime-glow/10"
    >
      <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-lime/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="w-14 h-14 rounded-xl bg-lime-glow border border-border-lime flex items-center justify-center text-lime mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          {IconComponent && <IconComponent size={28} />}
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-3">
          {service.title}
        </h3>
        <p className="text-text-secondary text-sm mb-6 leading-relaxed">
          {service.description}
        </p>

        <ul className="space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
              <Check size={14} className="text-lime flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Certifications() {
  const certRef = useRef<HTMLDivElement>(null);
  useGsapReveal(certRef, "up", 0.8, 0.4);

  return (
    <div ref={certRef} id="certifications" className="mt-24">
      <div className="text-center mb-12">
        <span className="inline-block font-mono text-lime text-sm tracking-widest uppercase mb-3">
          {"// Certifications"}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold">
          Certifications & Awards
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-6 rounded-xl bg-surface-elevated border border-border hover:border-border-lime transition-all duration-300"
          >
            <div className="p-3 rounded-xl bg-lime-glow border border-border-lime text-lime flex-shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-1">
                {cert.name}
              </h3>
              <p className="text-lime text-sm mb-1">{cert.issuer}</p>
              <p className="text-text-muted text-xs mb-2">{cert.year}</p>
              <p className="text-text-secondary text-sm">{cert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
