"use client";

import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import AnimatedBorder from './AnimatedBorder';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { projects } from '../_data/projects';
import { useThemeStore } from '@/store/themeStore';
import Image from 'next/image';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        }
    }
};

const wordVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        }
    }
};

const splitWords = (text: string) =>
    text.split(" ").map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.2em]">
            <motion.span
                variants={wordVariants}
                className="inline-block"
            >
                {word}
            </motion.span>
        </span>
    ));

const ProjectCard = memo(({ project, index, activeIndex, theme, onClick }: any) => {
    let distance = index - activeIndex;
    if (distance < 0) distance = -1;
    const isFront = index === activeIndex;

    if (distance < 0 || distance > 3) return null;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{
                opacity: distance === 0 ? 1 : 1 - (distance * 0.3),
                scale: 1 - (distance * 0.05),
                y: -distance * 30,
                z: -distance * 50,
            }}
            exit={{ opacity: 0, scale: 1.05, y: -50 }}
            transition={{
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1]
            }}
            style={{
                transformOrigin: "bottom center",
                zIndex: projects.length - distance,
            }}
            className={`absolute inset-0 w-full h-full border overflow-hidden cursor-pointer transition-all duration-500 transform-gpu ${isFront
                ? (theme === 'light' ? "ring-1 ring-black/10 shadow-xl border-black/10" : "group ring-1 ring-white/20 shadow-2xl border-white/10")
                : (theme === 'light' ? "border-black/5 shadow-md" : "border-white/10 shadow-xl")
                } ${theme === 'light' ? 'bg-white' : 'bg-[#0c0c0c]'}`}
            onClick={onClick}
        >
            <div className="w-full h-full relative overflow-hidden transform-gpu">
                <img
                    src={project.images[0]}
                    alt={project.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 transform-gpu ${isFront ? "group-hover:scale-105 opacity-100" : "opacity-40"}`}
                    onError={(e: any) => {
                        e.target.src = `https://placehold.co/1200x800/${theme === 'light' ? 'eeeeee/999999' : '101010/303030'}?text=${encodeURIComponent(project.title)}`;
                    }}
                />
                <div className={`absolute inset-0 transition-opacity duration-700 ${theme === 'light'
                    ? 'bg-linear-to-t from-white via-white/40 to-transparent opacity-80'
                    : 'bg-linear-to-t from-[#090909] via-[#090909]/60 sm:via-[#090909]/20 to-transparent'
                    }`} />

            </div>
        </motion.div>
    );
});

ProjectCard.displayName = "ProjectCard";

export default function Projects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { theme } = useThemeStore();
    const activeProject = projects[activeIndex];

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    }, [isModalOpen]);

    return (
        <div id="projects" className={`min-h-screen w-screen transition-colors duration-700 ${theme === 'light'
            ? 'bg-neutral-50 text-neutral-900'
            : 'bg-linear-to-bl from-[#070707] to-[#030303] via-[#090909] text-white'
            } overflow-hidden p-4 sm:p-6 md:p-12 lg:p-20 relative flex flex-col items-center`}>

            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 transition-opacity duration-700 ${theme === 'light' ? 'opacity-30' : 'opacity-100'} bg-[radial-gradient(circle_at_50%_0%,rgba(50,50,50,0.1)_0%,transparent_50%)]`} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <motion.span
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: theme === 'light' ? 0.05 : 0.03, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`text-[12vw] md:text-[10vw] font-black uppercase tracking-[0.3em] leading-none transition-colors duration-700 transform-gpu ${theme === 'light' ? 'text-black' : 'text-white'}`}
                >
                    PROJECTS
                </motion.span>
            </div>

            <div className="relative z-10 w-full mb-12 sm:mb-10 text-center transform-gpu">
                <motion.h1
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight font-mono tracking-tighter overflow-hidden"
                >
                    {splitWords("Featured Work")}
                </motion.h1>
            </div>

            <div className="relative w-full max-w-7xl mx-auto p-4 sm:p-8 md:p-12 lg:p-16 backdrop-blur-3xl overflow-visible min-h-[450px] lg:min-h-[550px] flex flex-col pb-0 lg:pb-0 md:pb-0 transform-gpu">
                <motion.div
                    animate={{ "--border-progress": [0, 100] } as any}
                    transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <AnimatedBorder />
                </motion.div>

                <div className="relative z-10 w-full flex flex-col gap-12 overflow-hidden">
                    <div className="flex-0 w-full z-20">
                        <div className="space-y-4 lg:space-y-6">
                            <h3 className="text-neutral-500 font-mono tracking-widest uppercase text-sm mb-4 lg:mb-6 text-center">
                                Featured Projects
                            </h3>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 max-w-5xl mx-auto">
                                {projects.map((project, i) => {
                                    const isActive = i === activeIndex;
                                    return (
                                        <motion.button
                                            key={i}
                                            variants={itemVariants}
                                            onClick={() => setActiveIndex(i)}
                                            className={`relative group flex flex-col items-center justify-center text-center p-2 sm:p-4 transition-all duration-300 border transform-gpu ${isActive
                                                ? (theme === 'light' ? "bg-black/5 border-black/20 shadow-md" : "bg-white/10 border-white/20 shadow-lg")
                                                : (theme === 'light' ? "bg-transparent border-black/5 hover:bg-black/5" : "bg-transparent border-white/5 hover:bg-white/5")
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeIndicator"
                                                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-1/3 ${theme === 'light' ? 'bg-black' : 'bg-white'}`}
                                                />
                                            )}
                                            <span className={`text-base sm:text-lg font-mono mb-1 transition-colors duration-300 ${theme === 'light' ? (isActive ? 'text-black font-bold' : 'text-black/60') : 'text-white/90'}`}>
                                                0{i + 1}
                                            </span>
                                            <div className="flex flex-col flex-1 w-full items-center">
                                                <span className={`font-medium transition-colors text-[10px] sm:text-xs tracking-wider uppercase line-clamp-1 ${isActive
                                                    ? (theme === 'light' ? "text-black font-bold" : "text-white")
                                                    : (theme === 'light' ? "text-neutral-600 group-hover:text-black" : "text-neutral-400 group-hover:text-neutral-300")
                                                    }`}>
                                                    {project.title}
                                                </span>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full relative min-h-[400px] top-10 lg:min-h-[500px] flex items-center justify-center pt-8 z-10 rotate-6 transform-gpu">
                        <div className="relative w-full max-w-5xl aspect-16/10 sm:aspect-video lg:aspect-21/9 transform-gpu">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {projects.map((project, i) => (
                                    <ProjectCard
                                        key={i}
                                        project={project}
                                        index={i}
                                        activeIndex={activeIndex}
                                        theme={theme}
                                        onClick={() => i === activeIndex ? setIsModalOpen(true) : setActiveIndex(i)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-xl transform-gpu"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className={`relative w-full max-w-6xl h-[90vh] overflow-hidden transition-colors duration-500 transform-gpu ${theme === 'light' ? 'bg-white text-black' : 'bg-[#0f0f0f] text-white'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className={`absolute top-6 right-6 z-50 p-3 backdrop-blur-xl border transition-all duration-300 ${theme === 'light'
                                    ? 'bg-black/5 border-black/10 text-black hover:bg-black hover:text-white'
                                    : 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-black'
                                    }`}
                            >
                                <FaTimes size={20} />
                            </button>

                            <div className="w-full h-full overflow-y-auto md:overflow-hidden flex flex-col-reverse md:flex-row custom-scrollbar">
                                <div className="w-full md:w-1/2 h-auto md:h-full border-t md:border-t-0 md:border-r border-white/10 relative md:overflow-y-auto bg-[#111] custom-scrollbar transform-gpu">
                                    <div className="flex flex-col gap-2 p-2 pt-16 md:pt-2">
                                        {activeProject.images.map((img: string, idx: number) => (
                                            <div key={idx} className="relative aspect-video w-full overflow-hidden border border-white/5 bg-black transform-gpu">
                                                <img
                                                    src={img}
                                                    alt={`${activeProject.title} screenshot ${idx + 1}`}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover opacity-80 transform-gpu"
                                                    onError={(e: any) => {
                                                        e.target.src = `https://placehold.co/1200x800/101010/303030?text=${encodeURIComponent(activeProject.title)}+${idx + 1}`;
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="sticky bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#0c0c0c] to-transparent pointer-events-none z-10" />
                                </div>

                                <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 h-auto md:h-full md:overflow-y-auto custom-scrollbar transform-gpu">
                                    <span className="text-xs sm:text-sm tracking-widest text-neutral-500 uppercase font-mono block mb-2">
                                        {activeProject.category}
                                    </span>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono mb-6 leading-tight">
                                        {activeProject.title}
                                    </h1>

                                    <div className="flex gap-4 mb-8">
                                        {activeProject.github && (
                                            <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 py-4 border transition-all duration-300 ${theme === 'light' ? 'bg-black text-white border-black hover:bg-white hover:text-black' : 'bg-white text-black border-white hover:bg-black hover:text-white'}`}>
                                                <FaGithub /> GitHub
                                            </a>
                                        )}
                                        {activeProject.live && (
                                            <a href={activeProject.live} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 py-4 border transition-all duration-300 ${theme === 'light' ? 'border-black/20 text-black hover:bg-black/5' : 'border-white/20 text-white hover:bg-white/5'}`}>
                                                <FaExternalLinkAlt /> Live Demo
                                            </a>
                                        )}
                                    </div>

                                    <section className="mb-8">
                                        <h3 className="text-sm tracking-widest uppercase font-mono mb-4 border-b border-white/10 pb-2">Overview</h3>
                                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">{activeProject.desc}</p>
                                    </section>

                                    <section className="mb-8">
                                        <h3 className="text-sm tracking-widest uppercase font-mono mb-4 border-b border-white/10 pb-2">Key Features</h3>
                                        <ul className="space-y-3">
                                            {activeProject.features.map((feature: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-3 text-neutral-300 text-sm">
                                                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-white/50 shrink-0" />
                                                    <span className="leading-relaxed">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section>
                                        <h3 className="text-sm tracking-widest uppercase font-mono mb-4 border-b border-white/10 pb-2">Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {activeProject.techStack.map((tech: string, idx: number) => (
                                                <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] text-neutral-300 uppercase tracking-widest font-mono">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
