"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ThreeBackground from "@/components/ui/ThreeBackground";
import { personalInfo } from "@/data/navigation";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { ArrowDown } from "lucide-react";

const roles = [
  "Fullstack Developer",
  "React.js Developer",
  "Next.js Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);
  const roleTextRef = useRef<HTMLSpanElement>(null);

  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(role.substring(0, displayText.length + 1));
        if (displayText === role) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(role.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
      })
        .from(nameRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
        }, "-=0.4")
        .from(roleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
        }, "-=0.5")
        .from(descRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
        }, "-=0.4")
        .from(buttonsRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
        }, "-=0.4")
        .from(socialsRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
        }, "-=0.3")
        .from(scrollRef.current, {
          opacity: 0,
          duration: 1,
        }, "-=0.2");

      gsap.to(scrollRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ThreeBackground className="absolute inset-0" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          ref={badgeRef}
          className="inline-block px-5 py-2.5 rounded-full bg-lime-glow border border-border-lime text-lime text-sm font-mono mb-8"
        >
          {"// Hello, World! I'm"}
        </span>

        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-text-primary">Adi </span>
          <span className="text-lime text-glow">Wahyudi</span>
        </h1>

        <div
          ref={roleRef}
          className="h-12 md:h-16 flex items-center justify-center mb-8"
        >
          <span className="text-xl md:text-3xl lg:text-4xl text-text-secondary font-mono">
            {"<"}
            <span ref={roleTextRef} className="text-lime">
              {displayText}
            </span>
            <span className="animate-pulse text-lime">|</span>
            {" />"}
          </span>
        </div>

        <p
          ref={descRef}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Passionate about crafting scalable web applications using Next.js,
          React, and modern JavaScript ecosystem.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-lime text-background font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-lime-glow"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-lime-dim translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent text-lime border border-border-lime font-medium rounded-lg hover:bg-lime-glow transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        <div
          ref={socialsRef}
          className="flex items-center justify-center gap-4"
        >
          {[
            {
              icon: <FaGithub size={20} />,
              href: personalInfo.github,
              label: "GitHub",
            },
            {
              icon: <FaLinkedin size={20} />,
              href: personalInfo.linkedin,
              label: "LinkedIn",
            },
            {
              icon: <FaEnvelope size={20} />,
              href: `mailto:${personalInfo.email}`,
              label: "Email",
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-surface-elevated border border-border text-text-secondary hover:text-lime hover:border-border-lime hover:scale-110 transition-all duration-300"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <a
        ref={scrollRef}
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-xs font-mono">Scroll</span>
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
