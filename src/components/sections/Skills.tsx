"use client";

import { useRef, useState } from "react";
import { skills, skillCategories } from "@/data/skills";
import { useGsapReveal, useGsapStagger } from "@/lib/gsap";
import * as Icons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FaHtml5: Icons.FaHtml5,
  FaCss3Alt: Icons.FaCss3Alt,
  FaJs: Icons.FaJs,
  FaReact: Icons.FaReact,
  FaNodeJs: Icons.FaNodeJs,
  FaGitAlt: Icons.FaGitAlt,
  FaFigma: Icons.FaFigma,
  FaCode: Icons.FaCode,
  SiTypescript: SiIcons.SiTypescript,
  SiNextdotjs: SiIcons.SiNextdotjs,
  SiTailwindcss: SiIcons.SiTailwindcss,
  SiBootstrap: SiIcons.SiBootstrap,
  SiFirebase: SiIcons.SiFirebase,
  SiExpress: SiIcons.SiExpress,
  SiMongodb: SiIcons.SiMongodb,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGsapReveal(titleRef, "up", 0.8);
  useGsapReveal(filtersRef, "up", 0.6, 0.2);

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 relative bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-12 md:mb-16">
          <span className="inline-block font-mono text-lime text-sm tracking-widest uppercase mb-3">
            {"// My Skills"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Technologies I Work With
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            A showcase of the tools and technologies I use to bring ideas to life.
          </p>
          <div className="h-1 w-16 bg-lime mt-6 rounded-full" />
        </div>

        <div ref={filtersRef} className="flex flex-wrap gap-2 mb-12">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-lime text-background shadow-lg shadow-lime-glow"
                  : "bg-surface-elevated text-text-secondary hover:text-lime border border-border hover:border-border-lime"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {filteredSkills.map((skill, index) => {
            const IconComponent = getIcon(skill.name);
            return (
              <SkillCard
                key={skill.name}
                skill={skill}
                IconComponent={IconComponent}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getIcon(name: string): React.ComponentType<{ size?: number }> | null {
  const iconMapByName: Record<string, string> = {
    "React.js": "FaReact",
    "Next.js": "SiNextdotjs",
    "TypeScript": "SiTypescript",
    "Tailwind CSS": "SiTailwindcss",
    "Bootstrap": "SiBootstrap",
    "JavaScript": "FaJs",
    "HTML5": "FaHtml5",
    "CSS3": "FaCss3Alt",
    "Firebase": "SiFirebase",
    "Node.js": "FaNodeJs",
    "Express.js": "SiExpress",
    "MongoDB": "SiMongodb",
    "Git/GitHub": "FaGitAlt",
    "Java": "FaCode",
    "C#": "FaCode",
    "Network Configuration": "FaCode",
    "Market Analyst": "FaCode",
  };

  const iconName = iconMapByName[name];
  if (!iconName) return null;

  if (iconName.startsWith("Si")) {
    return (SiIcons as Record<string, React.ComponentType<{ size?: number }>>)[iconName] || null;
  }
  return (Icons as Record<string, React.ComponentType<{ size?: number }>>)[iconName] || null;
}

function SkillCard({
  skill,
  IconComponent,
  index,
}: {
  skill: typeof skills[0];
  IconComponent: React.ComponentType<{ size?: number }> | null;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGsapReveal(cardRef, "up", 0.6, index * 0.05);

  return (
    <div
      ref={cardRef}
      className="group relative p-5 rounded-xl bg-surface-elevated border border-border hover:border-border-lime transition-all duration-500 text-center hover:-translate-y-2 hover:shadow-lg hover:shadow-lime-glow/20"
    >
      <div className="text-3xl text-lime mb-3 flex justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        {IconComponent && <IconComponent size={32} />}
      </div>
      <h3 className="text-sm font-medium text-text-primary mb-3">
        {skill.name}
      </h3>
      <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-lime-dim to-lime rounded-full transition-all duration-1000"
          style={{ width: `${skill.level}%` }}
        />
      </div>
      <span className="text-xs text-text-muted mt-2 block">{skill.level}%</span>
    </div>
  );
}
