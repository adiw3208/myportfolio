"use client";

import { useRef } from "react";
import Image from "next/image";
import { personalInfo, summary } from "@/data/navigation";
import { useGsapReveal, useGsapCounter } from "@/lib/gsap";
import { Code2, Heart, Coffee, Award, MapPin, Mail, Phone } from "lucide-react";

const stats = [
    {
        icon: <Code2 size={24} />,
        value: 3,
        suffix: "+",
        label: "Years Experience",
    },
    { icon: <Award size={24} />, value: 10, suffix: "+", label: "Projects" },
    {
        icon: <Heart size={24} />,
        value: 5,
        suffix: "+",
        label: "Happy Clients",
    },
    {
        icon: <Coffee size={24} />,
        value: 1000,
        suffix: "+",
        label: "Cups of Coffee",
    },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    useGsapReveal(titleRef, "up", 0.8);
    useGsapReveal(imageRef, "left", 1, 0.2);
    useGsapReveal(headingRef, "right", 0.8, 0.3);
    useGsapReveal(bioRef, "right", 0.8, 0.4);
    useGsapReveal(statsRef, "up", 0.8, 0.6);
    useGsapReveal(contactRef, "up", 0.8, 0.8);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-24 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={titleRef}
                    className="mb-12 md:mb-16">
                    <span className="inline-block font-mono text-lime text-sm tracking-widest uppercase mb-3">
                        {"// About Me"}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Get to Know Me
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl">
                        A passionate fullstack developer who loves turning ideas
                        into reality through code.
                    </p>
                    <div className="h-1 w-16 bg-lime mt-6 rounded-full" />
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div
                        ref={imageRef}
                        className="relative group">
                        <div className="absolute -inset-4 bg-lime/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative overflow-hidden rounded-2xl border border-border">
                            <Image
                                src="/adiwahyudi.jpg"
                                alt="Adi Wahyudi"
                                width={600}
                                height={700}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-lime rounded-xl -z-10" />
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-lime/30 rounded-xl -z-10" />
                    </div>

                    <div className="space-y-6">
                        <h3
                            ref={headingRef}
                            className="text-2xl md:text-3xl font-bold">
                            I'm{" "}
                            <span className="text-lime">
                                {personalInfo.name}
                            </span>
                        </h3>

                        <div
                            ref={bioRef}
                            className="space-y-4 text-text-secondary text-lg leading-relaxed">
                            <p>{summary}</p>
                        </div>

                        <div
                            ref={contactRef}
                            className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 text-text-secondary">
                                <MapPin
                                    size={16}
                                    className="text-lime"
                                />
                                <span className="text-sm">
                                    {personalInfo.location}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <Mail
                                    size={16}
                                    className="text-lime"
                                />
                                <span className="text-sm">
                                    {personalInfo.email}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <Phone
                                    size={16}
                                    className="text-lime"
                                />
                                <span className="text-sm">
                                    {personalInfo.phone}
                                </span>
                            </div>
                        </div>

                        <div
                            ref={statsRef}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                            {stats.map((stat, index) => (
                                <StatCard
                                    key={stat.label}
                                    stat={stat}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
    const counterRef = useRef<HTMLDivElement>(null);
    useGsapCounter(counterRef, stat.value, 2, [stat.value]);

    return (
        <div
            className="text-center p-4 rounded-xl bg-surface border border-border hover:border-border-lime transition-colors"
            style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="text-lime mb-2 flex justify-center">
                {stat.icon}
            </div>
            <div className="text-2xl font-bold text-text-primary flex items-center justify-center gap-0.5">
                <span ref={counterRef}>0</span>
                <span className="text-lime">{stat.suffix}</span>
            </div>
            <div className="text-xs text-text-muted">{stat.label}</div>
        </div>
    );
}
