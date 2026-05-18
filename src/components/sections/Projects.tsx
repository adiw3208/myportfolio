"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useGsapReveal } from "@/lib/gsap";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useGsapReveal(titleRef, "up", 0.8);
  useGsapReveal(filtersRef, "up", 0.6, 0.2);

  const filteredProjects =
    filter === "featured"
      ? projects.filter((p) => p.featured)
      : projects;

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-12 md:mb-16">
          <span className="inline-block font-mono text-lime text-sm tracking-widest uppercase mb-3">
            {"// My Work"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            A selection of projects that showcase my skills and passion for building great software.
          </p>
          <div className="h-1 w-16 bg-lime mt-6 rounded-full" />
        </div>

        <div ref={filtersRef} className="flex gap-4 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-lime text-background shadow-lg shadow-lime-glow"
                : "bg-surface-elevated text-text-secondary hover:text-lime border border-border hover:border-border-lime"
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter("featured")}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
              filter === "featured"
                ? "bg-lime text-background shadow-lg shadow-lime-glow"
                : "bg-surface-elevated text-text-secondary hover:text-lime border border-border hover:border-border-lime"
            }`}
          >
            <span className="flex items-center gap-2">
              <Star size={16} />
              Featured
            </span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: typeof projects[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  useGsapReveal(cardRef, "up", 0.8, index * 0.1);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-xl bg-surface-elevated border border-border overflow-hidden hover:border-border-lime transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-lime-glow/10"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-transparent to-transparent" />

        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-lime text-background">
              Featured
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-lime/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="mb-1">
          <span className="font-mono text-lime text-xs">{project.subtitle}</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-lime transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-surface border border-border text-text-secondary"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-surface border border-border text-text-muted">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-lime border border-border-lime rounded-lg hover:bg-lime-glow transition-all duration-300"
            >
              <ExternalLink size={14} />
              Live Demo
            </Link>
          )}
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary border border-border rounded-lg hover:text-lime hover:border-border-lime transition-all duration-300"
            >
              <FaGithub size={14} />
              Code
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
