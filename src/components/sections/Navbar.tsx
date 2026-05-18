"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(logoRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              ref={logoRef}
              href="#home"
              className="flex items-center gap-2 group"
            >
              <span className="text-lime font-bold text-xl font-mono">{"<"}</span>
              <span className="text-text-primary font-bold text-lg group-hover:text-lime transition-colors">
                AW
              </span>
              <span className="text-lime font-bold text-xl font-mono">{"/>"}</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === link.href
                      ? "text-lime"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.name}
                  {activeSection === link.href && (
                    <span className="absolute inset-0 bg-lime-glow rounded-lg -z-10" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-lime transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`text-2xl font-medium transition-colors ${
                  activeSection === link.href
                    ? "text-lime"
                    : "text-text-secondary hover:text-text-primary"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
