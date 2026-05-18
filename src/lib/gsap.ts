"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export function useGsapFrom(
  target: React.RefObject<HTMLElement | null>,
  vars: gsap.TweenVars,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (target.current) {
      gsap.from(target.current, vars);
    }
  }, [target, ...deps]);
}

export function useGsapTo(
  target: React.RefObject<HTMLElement | null>,
  vars: gsap.TweenVars,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (target.current) {
      gsap.to(target.current, vars);
    }
  }, [target, ...deps]);
}

export function useGsapScrollTrigger(
  target: React.RefObject<HTMLElement | null>,
  vars: gsap.TweenVars,
  scrollVars: ScrollTrigger.Vars,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (target.current) {
      gsap.to(target.current, {
        ...vars,
        scrollTrigger: {
          trigger: target.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...scrollVars,
        },
      });
    }
  }, [target, ...deps]);
}

export function useGsapStagger(
  selector: string,
  vars: gsap.TweenVars,
  staggerAmount = 0.1,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      gsap.from(elements, {
        ...vars,
        stagger: staggerAmount,
      });
    }
  }, [selector, staggerAmount, ...deps]);
}

export function useGsapTextSplit(
  target: React.RefObject<HTMLElement | null>,
  vars: gsap.TweenVars,
  deps: React.DependencyList = []
) {
  const splitRef = useRef<gsap.core.Animation | null>(null);

  useEffect(() => {
    if (target.current && target.current.textContent) {
      const text = target.current.textContent;
      target.current.innerHTML = "";

      const chars = text.split("");
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        target.current?.appendChild(span);
      });

      const spans = target.current.querySelectorAll("span");
      splitRef.current = gsap.from(spans, {
        ...vars,
        stagger: 0.03,
      });
    }

    return () => {
      if (splitRef.current) {
        splitRef.current.kill();
      }
    };
  }, [target, ...deps]);
}

export function useGsapCounter(
  target: React.RefObject<HTMLElement | null>,
  endValue: number,
  duration = 2,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (target.current) {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: endValue,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          if (target.current) {
            target.current.textContent = Math.round(obj.value).toString();
          }
        },
        scrollTrigger: {
          trigger: target.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, [target, endValue, duration, ...deps]);
}

export function useGsapMagnetic(
  target: React.RefObject<HTMLElement | null>,
  strength = 0.3
) {
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!target.current) return;

      const rect = target.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(target.current, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [target, strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (target.current) {
      gsap.to(target.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, [target]);

  useEffect(() => {
    const el = target.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [target, handleMouseMove, handleMouseLeave]);
}

export function useGsapParallax(
  target: React.RefObject<HTMLElement | null>,
  speed = 0.5
) {
  useEffect(() => {
    if (target.current) {
      gsap.to(target.current, {
        y: `${speed * 100}%`,
        ease: "none",
        scrollTrigger: {
          trigger: target.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, [target, speed]);
}

export function useGsapReveal(
  target: React.RefObject<HTMLElement | null>,
  direction: "up" | "down" | "left" | "right" = "up",
  duration = 1,
  delay = 0
) {
  const directions = {
    up: { y: 80, x: 0 },
    down: { y: -80, x: 0 },
    left: { x: 80, y: 0 },
    right: { x: -80, y: 0 },
  };

  useEffect(() => {
    if (target.current) {
      gsap.from(target.current, {
        ...directions[direction],
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: target.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, [target, direction, duration, delay]);
}
