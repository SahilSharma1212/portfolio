"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import AnimatedBorder from './AnimatedBorder';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

// --- DATA ---
const projects = [
    {
        title: 'E-Malkhana',
        category: 'Digital Evidence Management',
        images: ['/emalkhana1.png', '/emalkhana2.png', '/emalkhana3.png'],
        desc: 'Digital Evidence Management System for law enforcement agencies, built with Next.js, Supabase, and TailwindCSS. The application enables secure storage and management of case-related evidence (images, PDFs) with advanced search, category-based filtering, and role-based access control.',
        features: [
            'Advanced Search, Filtering & Pagination',
            'Role-Based Access Control',
            'Secure File Upload & Deletion',
            'Supabase Storage Management',
            'Responsive & Accessible UI',
        ],
        techStack: ['Next.js', 'Supabase', 'TailwindCSS', 'ShadCn', 'JWT', 'REST API', 'Firebase'],
        github: 'https://github.com/SahilSharma1212/E-Malkhana',
        live: 'https://e-malkhana-smoky.vercel.app/'
    },
    {
        title: 'RepoRama',
        category: 'Developer Productivity / AI',
        images: ['/reporama1.png', '/reporama2.png', '/reporama3.png'],
        desc: 'AI-powered GitHub repository intelligence platform that analyzes repositories to generate structured insights such as code summaries, architecture breakdowns, feature explanations, and visualized repo analytics. Designed to help developers, recruiters, and learners quickly understand real-world codebases.',
        features: [
            'GitHub Repository Analysis via GitHub API',
            'AI-Based Code & Architecture Summarization',
            'Spotify-Wrapped Style Developer Insights (Planned)',
            'Structured Feature & Tech Stack Extraction',
            'Multi-Repo Comparison & Visualization (Planned)',
        ],
        techStack: [
            'Next.js',
            'Supabase',
            'Clerk Auth',
            'GitHub API',
            'LangChain',
            'Gemini API',
            'Zustand',
            'ShadCn',
            'Framer Motion',
        ],
        github: 'https://github.com/SahilSharma1212/RepoRama',
        live: 'https://repo-rama.vercel.app/'
    },
    {
        title: 'AI Resume Builder',
        category: 'AI / Productivity',
        images: ['/resume1.png', '/resume2.png', '/resume3.png'],
        desc: 'AI-powered resume builder that generates job-tailored resumes based on user input. Integrates Gemini API to auto-fill relevant achievements, skills, and experience. Includes editable sections, live PDF preview, and export to Word & PDF.',
        features: [
            'AI Prompt Engineering',
            'User Authentication (OAuth & Email)',
            'Dynamic PDF Generation',
            'Form Handling & Validation',
            'Resume Parsing & Exporting',
        ],
        techStack: ['Next.js', 'MongoDB', 'Tailwind', 'Gemini-API', 'JWT', 'ShadCn', 'Mailtrap'],
        github: 'https://github.com/SahilSharma1212/Next.js-AI-Powered-Resume-Builder',
        live: 'https://next-js-ai-powered-resume-builder.vercel.app/'
    },
    {
        title: 'Drawing App',
        category: 'Web App',
        images: ['/drawing_app_1.png', '/drawing_app_2.png', '/drawing_app_3.png'],
        desc: 'A feature-rich web-based drawing application designed for creative freedom. Users can draw with various brush sizes and colors, erase, undo/redo actions, and export their artwork as images. Fully responsive for mobile/tablet use.',
        features: [
            'Canvas-based Drawing',
            'Undo/Redo Logic',
            'Image Exporting',
            'Responsive UI Design',
            'Konva State Management',
        ],
        techStack: ['React', 'Canvas API', 'Tailwind', 'Konva', 'Framer-Motions'],
        github: 'https://github.com/SahilSharma1212/drawing-app-using-Konva',
        live: 'https://sahilsharma1212.github.io/drawing-app-using-Konva/'
    },
];


// --- COMPONENT ---
export default function Projects() {
    const borderBoxRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Continuous Animated Border Loop
    useEffect(() => {
        const tl = gsap.timeline();
        if (borderBoxRef.current) {
            tl.to(
                borderBoxRef.current,
                {
                    "--border-progress": 100,
                    duration: 12,
                    ease: "none",
                    repeat: -1,
                }
            );
        }
    }, []);

    const borderStyles = {
        "--border-progress": 0,
    } as React.CSSProperties;

    const activeProject = projects[activeIndex];

    // Helper: Lock body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isModalOpen]);


    return (
        <div id="projects" className="min-h-screen w-screen bg-linear-to-bl from-[#070707] to-[#030303] via-[#090909] text-white overflow-hidden p-4 sm:p-6 md:p-12 lg:p-20 relative flex flex-col items-center">

            {/* Background gradients */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(50,50,50,0.1)_0%,transparent_50%)]" />
            </div>

            {/* Background "PROJECTS" Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <motion.span
                    initial={{ opacity: 0, scale: 1.04 }}
                    whileInView={{ opacity: 0.03, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-[18vw] md:text-[16vw] lg:text-[14vw] font-black uppercase tracking-widest text-white/50 leading-none whitespace-nowrap"
                >
                    PROJECTS
                </motion.span>
            </div>

            <div className="relative z-10 w-full mb-12 sm:mb-20 mt-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight font-mono tracking-tighter"
                >
                    Featured Work
                </motion.h1>
            </div>

            {/* MAIN INTERACTIVE CONTAINER */}
            <div
                ref={borderBoxRef}
                className="relative w-full max-w-7xl mx-auto p-4 sm:p-8 md:p-12 lg:p-16 backdrop-blur-3xl overflow-visible min-h-[450px] lg:min-h-[550px] flex flex-col pb-0 lg:pb-0 md:pb-0"
                style={borderStyles}
            >
                <AnimatedBorder />

                <div className="relative z-10 w-full h-140 overflow-hidden flex flex-col gap-12">

                    {/* TOP SECTION: Navigation Menu */}
                    <div className="flex-0 w-full z-20">
                        <div className="space-y-4 lg:space-y-6">
                            <h3 className="text-neutral-500 font-mono tracking-widest uppercase text-sm mb-4 lg:mb-6 text-center">
                                Select Project
                            </h3>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 max-w-5xl mx-auto">
                                {projects.map((project, i) => {
                                    const isActive = i === activeIndex;
                                    return (
                                        <motion.button
                                            key={i}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: i * 0.12,
                                                duration: 0.5,
                                                ease: "easeOut"
                                            }}
                                            viewport={{ once: false }}
                                            onClick={() => setActiveIndex(i)}
                                            className={`relative group flex flex-col items-center justify-center text-center p-2 sm:p-4 transition-all duration-300 border border-white/5 ${isActive ? "bg-white/10 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]" : "bg-transparent hover:bg-white/5"
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeIndicator"
                                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-1/3 bg-white"
                                                />
                                            )}
                                            <span className="text-base sm:text-lg font-mono text-white/90 mb-1">
                                                0{i + 1}
                                            </span>
                                            <div className="flex flex-col flex-1 w-full items-center">
                                                <span className={`font-medium transition-colors text-[10px] sm:text-xs tracking-wider uppercase line-clamp-1 ${isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-300"}`}>
                                                    {project.title}
                                                </span>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM SECTION: Stacked Cards View */}
                    <div className="flex-1 w-full relative min-h-[400px] top-10 lg:min-h-[500px] flex items-center justify-center pt-8 z-10 rotate-6">
                        <div className="relative w-full max-w-5xl aspect-16/10 sm:aspect-video lg:aspect-21/9">
                            <AnimatePresence mode="popLayout">
                                {projects.map((project, i) => {
                                    // Calculate stack distance relative to activeIndex
                                    let distance = i - activeIndex;

                                    if (distance < 0) {
                                        distance = -1;
                                    }

                                    const isFront = i === activeIndex;

                                    // Only render a few in the stack for performance
                                    if (distance < 0 || distance > 3) return null;

                                    return (
                                        <motion.div
                                            key={i}
                                            layout
                                            initial={{ opacity: 0, y: 150, scale: 0.8 }}
                                            whileInView={{
                                                opacity: distance === 0 ? 1 : 1 - (distance * 0.3),
                                                scale: 1 - (distance * 0.05),
                                                y: -distance * 40,
                                                z: -distance * 50,
                                            }}
                                            animate={{
                                                opacity: distance === 0 ? 1 : 1 - (distance * 0.3),
                                                scale: 1 - (distance * 0.05),
                                                y: -distance * 40,
                                                z: -distance * 50,
                                            }}
                                            exit={{ opacity: 0, scale: 1.05, y: -100 }}
                                            transition={{
                                                delay: i * 0.1, // Staggered entry
                                                duration: 0.6,
                                                ease: [0.23, 1, 0.32, 1] // Snappy cubic-bezier
                                            }}
                                            viewport={{ once: false }}
                                            style={{
                                                transformOrigin: "bottom center",
                                                zIndex: projects.length - distance,
                                            }}
                                            className={`absolute inset-0 w-full h-full border border-white/10 bg-[#0c0c0c] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer ${isFront ? "group ring-1 ring-white/20" : ""
                                                }`}
                                            onClick={() => {
                                                if (!isFront) {
                                                    setActiveIndex(i);
                                                } else {
                                                    setIsModalOpen(true);
                                                }
                                            }}
                                        >
                                            {/* IMAGE CONTAINER inside the card */}
                                            <div className="w-full h-full relative">
                                                <img
                                                    src={project.images[0]}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-102 transition-all duration-700"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://placehold.co/1200x800/101010/303030?text=${encodeURIComponent(project.title)}`;
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-[#090909] via-[#090909]/60 sm:via-[#090909]/20 to-transparent" />

                                                {isFront && (
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-12 flex items-end justify-between">
                                                        <div>
                                                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-mono text-white mb-2 line-clamp-1">{project.title}</h2>
                                                            <div className="flex flex-wrap gap-2 mt-3">
                                                                {project.techStack.slice(0, 4).map((tech, idx) => (
                                                                    <span key={idx} className="px-3 py-1.5 bg-white/10 backdrop-blur-xl text-[10px] md:text-sm text-white uppercase tracking-widest shadow-none">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 border border-white/20 bg-white/5 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all shadow-none">
                                                            <span className="font-mono text-xl sm:text-3xl">+</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-xl"
                    >
                        {/* Modal container */}
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0c0c] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-50 p-3 bg-black/50 hover:bg-neutral-700 border border-white/10 text-white  transition-all group"
                            >
                                <FaTimes className="w-4 h-4" />
                            </button>

                            {/* Left Side: Image Gallery */}
                            <div className="w-full md:w-1/2 h-[40vh] md:h-[600px] border-b md:border-b-0 md:border-r border-white/10 relative overflow-y-auto bg-[#111] custom-scrollbar">
                                <div className="flex flex-col gap-2 p-2">
                                    {activeProject.images.map((img, idx) => (
                                        <div key={idx} className="relative aspect-video w-full overflow-hidden border border-white/5 bg-black">
                                            <img
                                                src={img}
                                                alt={`${activeProject.title} screenshot ${idx + 1}`}
                                                className="w-full h-full object-cover opacity-80"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://placehold.co/1200x800/101010/303030?text=${encodeURIComponent(activeProject.title)}+${idx + 1}`;
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Bottom Fade Gradient Overlay */}
                                <div className="sticky bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#0c0c0c] to-transparent pointer-events-none z-10" />
                            </div>

                            {/* Right Side: Content Scroll Area */}
                            <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 overflow-y-auto max-h-[60vh] md:max-h-[90vh] custom-scrollbar">
                                <span className="text-xs sm:text-sm tracking-widest text-neutral-500 uppercase font-mono block mb-2">
                                    {activeProject.category}
                                </span>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono text-white mb-6 leading-tight">
                                    {activeProject.title}
                                </h1>

                                <div className="flex gap-4 mb-8 flex-wrap">
                                    {activeProject.github && (
                                        <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:bg-white/10 transition-colors bg-white/5 text-xs font-mono tracking-widest uppercase">
                                            <FaGithub className="w-4 h-4" /> Code
                                        </a>
                                    )}
                                    {activeProject.live && (
                                        <a href={activeProject.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-mono tracking-widest uppercase">
                                            <FaExternalLinkAlt className="w-3 h-3" /> Live
                                        </a>
                                    )}
                                </div>

                                <h3 className="text-sm tracking-widest text-white uppercase font-mono mb-4 border-b border-white/10 pb-2">Overview</h3>
                                <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light mb-8">
                                    {activeProject.desc}
                                </p>

                                <h3 className="text-sm tracking-widest text-white uppercase font-mono mb-4 border-b border-white/10 pb-2">Key Features</h3>
                                <ul className="list-none space-y-3 mb-8">
                                    {activeProject.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 text-neutral-300 text-sm md:text-base">
                                            <span className="w-1.5 h-1.5 mt-2 rounded-full bg-white/50 shrink-0" />
                                            <span className="leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <h3 className="text-sm tracking-widest text-white uppercase font-mono mb-4 border-b border-white/10 pb-2">Technology Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {activeProject.techStack.map((tech: string, idx: number) => (
                                        <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 text-mono text-[10px] sm:text-xs text-neutral-300 uppercase tracking-widest">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}