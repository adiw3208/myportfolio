"use client";

import { useRef } from "react";
import Link from "next/link";
import { personalInfo, navLinks } from "@/data/navigation";
import { useGsapReveal } from "@/lib/gsap";
import { Mail, Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useGsapReveal(footerRef, "up", 0.8);

  const socialLinks = [
    { icon: <FaGithub size={20} />, href: personalInfo.github, label: "GitHub" },
    { icon: <FaLinkedin size={20} />, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: <FaInstagram size={20} />, href: "https://instagram.com/adiwhydi___", label: "Instagram" },
    { icon: <Mail size={20} />, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  return (
    <footer ref={footerRef} className="relative bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link ref={logoRef} href="#home" className="flex items-center gap-2 mb-4">
              <span className="text-lime font-bold text-xl font-mono">{"<"}</span>
              <span className="text-text-primary font-bold text-lg">AW</span>
              <span className="text-lime font-bold text-xl font-mono">{"/>"}</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Fullstack Developer passionate about crafting scalable web applications
              using Next.js, React, and modern JavaScript ecosystem.
            </p>
          </div>

          <div>
            <h3 className="text-text-primary font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-lime transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-text-primary font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-elevated border border-border text-text-secondary hover:text-lime hover:border-border-lime hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-text-muted text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-lime" /> using Next.js + GSAP + Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
