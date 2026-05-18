"use client";

import { useRef, useState } from "react";
import { experience, education } from "@/data/experience";
import { useGsapReveal } from "@/lib/gsap";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

export default function Experience() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useGsapReveal(titleRef, "up", 0.8);
  useGsapReveal(tabsRef, "up", 0.6, 0.2);

  const items = activeTab === "experience" ? experience : education;

  return (
    <section id="experience" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-12 md:mb-16">
          <span className="inline-block font-mono text-lime text-sm tracking-widest uppercase mb-3">
            {"// My Journey"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Experience & Education
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            A timeline of my professional journey and academic background.
          </p>
          <div className="h-1 w-16 bg-lime mt-6 rounded-full" />
        </div>

        <div ref={tabsRef} className="flex gap-4 mb-12">
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "experience"
                ? "bg-lime text-background shadow-lg shadow-lime-glow"
                : "bg-surface-elevated text-text-secondary hover:text-lime border border-border hover:border-border-lime"
            }`}
          >
            <Briefcase size={18} />
            Experience
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === "education"
                ? "bg-lime text-background shadow-lg shadow-lime-glow"
                : "bg-surface-elevated text-text-secondary hover:text-lime border border-border hover:border-border-lime"
            }`}
          >
            <GraduationCap size={18} />
            Education
          </button>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-lime" />

          {items.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} isExperience={activeTab === "experience"} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  isExperience,
}: {
  item: typeof experience[0] | typeof education[0];
  index: number;
  isExperience: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  useGsapReveal(cardRef, "up", 0.8, index * 0.15);

  return (
    <div className="relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0">
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-lime rounded-full -translate-x-1/2 ring-4 ring-background z-10 animate-pulse" />

      <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
        <div
          ref={cardRef}
          className="p-6 rounded-xl bg-surface-elevated border border-border hover:border-border-lime transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-lime-glow/10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={14} className="text-lime" />
            <span className="font-mono text-lime text-sm">
              {item.period}
            </span>
          </div>

          <h3 className="text-xl font-bold text-text-primary mb-1">
            {"role" in item ? item.role : item.institution}
          </h3>
          <p className="text-lime font-medium mb-3">
            {"role" in item ? item.company : item.degree}
          </p>

          {"role" in item && (
            <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
              <MapPin size={14} />
              {item.location}
            </div>
          )}

          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            {item.description}
          </p>

          {"achievements" in item && item.achievements && (
            <ul className="space-y-2">
              {item.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="text-lime mt-0.5 flex-shrink-0">▹</span>
                  {achievement}
                </li>
              ))}
            </ul>
          )}

          {"highlights" in item && item.highlights && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-lime-glow text-lime border border-border-lime"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}
