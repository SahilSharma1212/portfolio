"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    SiJavascript, SiTypescript, SiPython, SiNextdotjs,
    SiTailwindcss, SiFramer, SiThreedotjs, SiExpress, SiMongodb,
    SiSupabase, SiFirebase, SiRedis, SiPostman, SiVercel, SiNetlify,
    SiDocker, SiLinux, SiGreensock
} from 'react-icons/si'
import { TbBrandCpp } from 'react-icons/tb'
import { FaJava, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from 'react-icons/fa'
import { HiChevronDown } from 'react-icons/hi2'
import { SKILLS } from '@/app/constants'

const iconMap: Record<string, React.ReactNode> = {
    "JavaScript": <SiJavascript />,
    "TypeScript": <SiTypescript />,
    "Python": <SiPython />,
    "Java": <FaJava />,
    "HTML5": <FaHtml5 />,
    "CSS3": <FaCss3Alt />,
    "React.js": <FaReact />,
    "Next.js": <SiNextdotjs />,
    "Tailwind CSS": <SiTailwindcss />,
    "Framer Motion": <SiFramer />,
    "Three.js": <SiThreedotjs />,
    "GSAP": <SiGreensock />,
    "Node.js": <FaNodeJs />,
    "Express.js": <SiExpress />,
    "Mongo DB": <SiMongodb />,
    "Supabase": <SiSupabase />,
    "Firebase": <SiFirebase />,
    "Redis": <SiRedis />,
    "Git": <FaGitAlt />,
    "GitHub": <FaGithub />,
    "Figma": <FaFigma />,
    "Postman": <SiPostman />,
    "Vercel": <SiVercel />,
    "Netlify": <SiNetlify />,
    "Linux": <SiLinux />,
    "Docker": <SiDocker />,
}

const levelColors: Record<string, string> = {
    "Basic": "text-zinc-400",
    "Intermediate": "text-blue-400",
    "Proficient": "text-indigo-500",
    "PRO": "text-pink-500"
}

export default function Skills() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section id="skills" className="min-h-screen w-full flex flex-col items-center py-24 px-8 md:px-24 bg-linear-to-tl from-pink-50/50 to-white font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-24"
            >
                <h2 className="text-6xl font-light tracking-tighter text-black mb-4">
                    Technical Palette
                </h2>
                <p className="text-zinc-400 font-light max-w-lg mx-auto">
                    I am not fully dependent on AI, I know stuff too ;)
                </p>
            </motion.div>

            <div className="w-full max-w-7xl flex flex-col border-t border-zinc-200">
                {SKILLS.categories.map((category, index) => (
                    <SkillAccordion
                        key={category.title}
                        category={category}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        onMouseEnter={() => setOpenIndex(index)}
                        onMouseLeave={() => setOpenIndex(null)}
                    />
                ))}
            </div>
        </section>
    )
}

function SkillAccordion({ category, isOpen, onClick, onMouseEnter, onMouseLeave }: { category: any; isOpen: boolean; onClick: () => void; onMouseEnter: () => void; onMouseLeave: () => void }) {
    return (
        <div
            className="border-b border-zinc-200 overflow-hidden"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-10 text-left group"
            >
                <span className={`text-[clamp(2rem,6vw,4rem)] font-light tracking-tighter transition-all duration-500 ${isOpen ? 'text-black' : 'text-zinc-400 group-hover:text-zinc-700'}`}>
                    {category.title}
                </span>
                <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-black' : 'text-zinc-400 group-hover:text-zinc-700'}`}>
                    <HiChevronDown size={40} strokeWidth={1} />
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
                        <div className="pb-12 flex flex-wrap gap-3">
                            {category.skills.map((skill: string) => (
                                <motion.div
                                    key={skill}
                                    initial="rest"
                                    whileHover="hover"
                                    className="relative flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-100 rounded-xl text-sm font-light text-zinc-900 hover:border-zinc-400 transition-all duration-300 cursor-default"
                                >
                                    {iconMap[skill] && (
                                        <span className="text-xl opacity-80 transition-opacity">
                                            {iconMap[skill]}
                                        </span>
                                    )}
                                    <span>{skill}</span>

                                    {/* FLOATING PROFICIENCY TOOLTIP */}
                                    <motion.div
                                        variants={{
                                            rest: { opacity: 0, y: 0, scale: 0.8 },
                                            hover: { opacity: 1, y: -45, scale: 1 }
                                        }}
                                        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-50 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg shadow-xl"
                                    >
                                        <span className={`text-[9px] font-bold uppercase tracking-wider whitespace-nowrap ${(levelColors as any)[(SKILLS.levels as any)[skill]] || 'text-zinc-400'}`}>
                                            {(SKILLS.levels as any)[skill]}
                                        </span>
                                        {/* TOOLTIP ARROW */}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-zinc-200 rotate-45" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
