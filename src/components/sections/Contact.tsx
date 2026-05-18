"use client";

import { useRef, useState } from "react";
import { personalInfo } from "@/data/navigation";
import { useGsapReveal } from "@/lib/gsap";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useGsapReveal(titleRef, "up", 0.8);
  useGsapReveal(infoRef, "left", 0.8, 0.2);
  useGsapReveal(formRef, "right", 0.8, 0.3);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formcarry.com/s/o5IrIKRdUf", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.code === 500 || response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <Phone size={24} />,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: <MapPin size={24} />,
      label: "Location",
      value: personalInfo.location,
      href: null,
    },
  ];

  const socialLinks = [
    { icon: <FaGithub size={24} />, href: personalInfo.github, label: "GitHub" },
    { icon: <FaLinkedin size={24} />, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: <FaInstagram size={24} />, href: "https://instagram.com/adiwhydi___", label: "Instagram" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-12 md:mb-16">
          <span className="inline-block font-mono text-lime text-sm tracking-widest uppercase mb-3">
            {"// Get In Touch"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Have a project in mind or just want to say hi? Feel free to reach out!
          </p>
          <div className="h-1 w-16 bg-lime mt-6 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div ref={infoRef} className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 group"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="p-3 rounded-xl bg-lime-glow border border-border-lime text-lime group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-text-primary font-medium hover:text-lime transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-text-primary font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-text-muted text-sm mb-4">
                Or connect on social media
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-surface-elevated border border-border text-text-secondary hover:text-lime hover:border-border-lime hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div ref={formRef} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl bg-surface-elevated border border-border"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-lime text-background font-medium rounded-lg hover:bg-lime-dim transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-lime-glow"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>

                {status === "success" && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
                    <CheckCircle size={18} />
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                    <AlertCircle size={18} />
                    Something went wrong. Please try again.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
