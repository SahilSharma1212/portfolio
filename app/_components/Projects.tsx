"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react'
import { HiChevronDown, HiArrowTopRightOnSquare, HiCodeBracket } from 'react-icons/hi2'
import { PROJECTS } from '@/app/constants'
import Image from 'next/image'

export default function Projects() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [hoveredProject, setHoveredProject] = useState<any>(null)

    // Mouse tracking for floating images
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 150 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
    }

    return (
        <section
            id="projects"
            className="relative min-h-screen font-sans py-24 px-8 md:px-24 bg-linear-to-tl from-pink-50/50 to-white"
            onMouseMove={handleMouseMove}
        >
            {/* Floating Image Preview */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
                <AnimatePresence mode="wait">
                    {hoveredProject && (
                        <motion.div
                            key={hoveredProject.title}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            style={{
                                left: x,
                                top: y,
                                position: 'fixed',
                                translateX: "20px",
                                translateY: "-50%",
                            }}
                            className="flex flex-col gap-1.5 p-2 bg-white/50 backdrop-blur-3xl border border-dashed border-zinc-300 rounded-xs shadow-lg"
                        >
                            {hoveredProject.images.map((img: string, i: number) => (
                                <motion.div
                                    key={img}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: i * 0.07,
                                        duration: 0.3,
                                        ease: "easeOut"
                                    }}
                                    className="relative w-56 aspect-video rounded-lg overflow-hidden"
                                >
                                    <Image
                                        src={img}
                                        alt={hoveredProject.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
            >
                <h2 className="text-6xl text-center font-sans font-light tracking-tighter text-black mb-4">
                    Featured Work
                </h2>
            </motion.div>

            <div className="flex flex-col border-t border-zinc-200">
                {PROJECTS.map((project, index) => (
                    <ProjectAccordion
                        key={project.title}
                        project={project}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        onMouseEnter={() => {
                            setOpenIndex(index)
                            setHoveredProject(project)
                        }}
                        onMouseLeave={() => {
                            setOpenIndex(null)
                            setHoveredProject(null)
                        }}
                    />
                ))}
            </div>
        </section>
    )
}

function ProjectAccordion({ project, isOpen, onClick, onMouseEnter, onMouseLeave }: { project: any; isOpen: boolean; onClick: () => void; onMouseEnter: () => void; onMouseLeave: () => void }) {
    return (
        <div
            className="border-b border-zinc-200 overflow-hidden"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-12 text-left group relative z-10"
            >
                <span className={`text-[clamp(2.5rem,8vw,4rem)] font-light tracking-tighter transition-all duration-500 ${isOpen ? 'text-black translate-x-4' : 'text-zinc-400 group-hover:text-zinc-700 translate-x-0'}`}>
                    {project.title}
                </span>
                <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-black' : 'text-zinc-400 group-hover:text-zinc-700'}`}>
                    <HiChevronDown size={48} strokeWidth={1} />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="pb-16 grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <p className="text-xl text-zinc-600 font-light leading-relaxed max-w-xl">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t: string) => (
                                        <span key={t} className="px-3 py-1 bg-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-500 rounded-full border border-zinc-200">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/link inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors duration-200"
                                        >
                                            <HiArrowTopRightOnSquare className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                            Live Site
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/link inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-300 text-zinc-700 text-[11px] font-bold uppercase tracking-widest hover:border-zinc-700 hover:text-black transition-colors duration-200"
                                        >
                                            <HiCodeBracket className="w-3.5 h-3.5" />
                                            Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Core Features</p>
                                {project.features.map((f: string) => (
                                    <div key={f} className="flex items-center gap-4 group/item">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover/item:bg-pink-400 transition-colors" />
                                        <span className="text-base text-zinc-800 font-light">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
