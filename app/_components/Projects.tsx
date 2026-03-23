"use client";

import { useEffect, useRef, memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../_data/projects';
import { useThemeStore } from '@/store/themeStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ProjectCard = memo(({ project, theme }: any) => {
    return (
        <div
            className={`w-full h-full border transition-colors duration-500 transform-gpu rounded-none flex flex-col p-6 md:p-10 lg:p-16 ${theme === 'light' ? 'bg-white border-black/10 shadow-xl text-black' : 'bg-[#0f0f0f] border-white/10 shadow-2xl text-white'
                }`}
        >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-16">
                <div className="flex-1">
                    <span className="text-[9px] md:text-[10px] tracking-[0.5em] text-neutral-500 uppercase font-mono block mb-4 font-bold">
                        {project.category || "Project"}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono uppercase font-bold tracking-tight leading-none">
                        {project.title}
                    </h2>
                </div>

                <div className="flex gap-6 shrink-0 pt-2">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={`p-4 border transition-all duration-300 rounded-full ${theme === 'light' ? 'bg-black text-white border-black hover:bg-white hover:text-black' : 'bg-white text-black border-white hover:bg-black hover:text-white'}`}>
                            <FaGithub size={20} />
                        </a>
                    )}
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className={`p-4 border transition-all duration-300 rounded-full ${theme === 'light' ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'}`}>
                            <FaExternalLinkAlt size={18} />
                        </a>
                    )}
                </div>
            </div>

            <div className={`flex-1 overflow-y-auto pr-6 overflow-x-hidden ${theme === 'light' ? 'custom-scrollbar-light' : 'custom-scrollbar'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-12 max-w-4xl">
                        <h3 className="text-[9px] tracking-[0.4em] uppercase font-mono mb-6 text-neutral-500 font-bold border-b border-white/5 pb-2">Context</h3>
                        <p className={`text-base md:text-lg lg:text-xl leading-relaxed font-light ${theme === 'light' ? 'text-neutral-800' : 'text-neutral-400'}`}>
                            {project.desc || "No description provided."}
                        </p>
                    </div>

                    <div className="lg:col-span-8 space-y-16">
                        <section>
                            <h3 className="text-[9px] tracking-[0.4em] uppercase font-mono mb-8 text-neutral-500 font-bold border-b border-white/5 pb-2">Core Features</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {(project.features || []).map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-4 text-sm md:text-base">
                                        <span className={`w-1.5 h-1.5 mt-2 rounded-none shrink-0 ${theme === 'light' ? 'bg-black/40' : 'bg-white/40'}`} />
                                        <span className={theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <div className="lg:col-span-4 self-start sticky top-0">
                        <section>
                            <h3 className="text-[9px] tracking-[0.4em] uppercase font-mono mb-8 text-neutral-500 font-bold border-b border-white/5 pb-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {(project.techStack || []).map((tech: string, idx: number) => (
                                    <span key={idx} className={`px-3 py-1.5 border text-[9px] uppercase tracking-widest font-mono ${theme === 'light' ? 'bg-black/5 border-black/10 text-black' : 'bg-white/5 border-white/10 text-white'}`}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProjectCard.displayName = "ProjectCard";

export default function Projects() {
    const { theme } = useThemeStore();
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const triggerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

            // Pinned Stacking Effect
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: "projects-trigger",
                    trigger: triggerRef.current,
                    pin: pinRef.current,
                    start: "top top",
                    end: `+=${cards.length * 100}%`,
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const newIndex = Math.min(
                            Math.floor(progress * cards.length),
                            cards.length - 1
                        );
                        setActiveIndex(newIndex);
                    }
                }
            });

            cards.forEach((card, i) => {
                if (i === 0) return; // First card stays put
                tl.fromTo(card,
                    { yPercent: 100 },
                    { yPercent: 0, ease: "none" },
                    i - 1
                );
            });
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div id="projects" ref={triggerRef} className={`relative w-screen transition-colors duration-700 ${theme === 'light' ? 'bg-neutral-50' : 'bg-[#070707]'}`}>
            <div ref={pinRef} className="flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto p-4 sm:p-8 md:p-12 lg:p-20 overflow-hidden">

                {/* Left Side: Sticky Titles (Desktop Only) */}
                <div className="hidden lg:flex flex-col justify-center w-1/4 h-full z-20">
                    <h2 className="text-neutral-500 font-mono tracking-widest uppercase text-[10px] mb-8 font-bold">
                        The Portfolio
                    </h2>
                    <div className="flex flex-col gap-4">
                        {projects.map((project, i) => (
                            <div
                                key={i}
                                className={`transition-all duration-500 cursor-pointer flex items-baseline gap-3 ${i === activeIndex
                                    ? (theme === 'light' ? 'text-black translate-x-3' : 'text-white translate-x-3')
                                    : 'text-neutral-500 opacity-30 hover:opacity-100'}`}
                                onClick={() => {
                                    const st = ScrollTrigger.getById("projects-trigger");
                                    if (st) {
                                        const scrollPos = st.start;
                                        const gap = st.end - st.start;
                                        window.scrollTo({
                                            top: scrollPos + (gap * (i / projects.length)) + 1,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                            >
                                <span className="text-[10px] font-mono opacity-50 font-bold">0{i + 1}</span>
                                <span className={`text-lg xl:text-xl font-mono uppercase tracking-tight transition-all duration-500 ${i === activeIndex ? 'font-black' : 'font-light'}`}>
                                    {project.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {hoveredIndex !== null && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 40 }}
                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="fixed pointer-events-none z-50 flex flex-col gap-2 p-2 backdrop-blur-3xl bg-white/5 border border-white/10 shadow-2xl rounded-none"
                                style={{
                                    left: mousePos.x,
                                    top: mousePos.y - 100,
                                }}
                            >
                                {projects[hoveredIndex].images?.slice(0, 3).map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="w-48 h-28 overflow-hidden border border-white/10"
                                    >
                                        <img
                                            src={img}
                                            alt={projects[hoveredIndex].title}
                                            className="w-full h-full object-cover transition-all duration-500"
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Stacked Cards */}
                <div className="relative flex-1 h-full lg:h-[80vh] my-auto">
                    {/* Header for mobile */}
                    <div className="lg:hidden mb-12 text-center pt-8">
                        <h2 className="text-3xl font-mono uppercase tracking-widest mb-1">Projects</h2>
                        <div className="h-0.5 w-8 bg-neutral-500 mx-auto opacity-50" />
                    </div>

                    <div className="relative w-full h-full perspective-1000">
                        {projects.map((project, i) => (
                            <div
                                key={i}
                                ref={el => { cardsRef.current[i] = el; }}
                                className="absolute inset-0 w-full h-full"
                                style={{ zIndex: i }}
                                onMouseEnter={(e) => {
                                    setHoveredIndex(i);
                                    setMousePos({ x: e.clientX, y: e.clientY });
                                }}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                            >
                                <ProjectCard
                                    project={project}
                                    theme={theme}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
