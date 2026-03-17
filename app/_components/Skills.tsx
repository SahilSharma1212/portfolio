"use client";

import { useEffect, useRef, useState, memo, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import AnimatedBorder from "./AnimatedBorder";
import { useThemeStore } from '@/store/themeStore';
import {
    FaJs,
    FaPython,
    FaJava,
    FaHtml5,
    FaReact,
    FaNodeJs,
    FaGithub,
    FaDocker,
    FaInfinity
} from "react-icons/fa";
import { IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import { IoIosGitNetwork, IoLogoCss3 } from "react-icons/io";
import { ImMobile2 } from "react-icons/im";
import { BiLogoTypescript } from "react-icons/bi";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
    SiFramer,
    SiExpress,
    SiRedis,
    SiPostman,
    SiLangchain,
    SiClerk,
    SiAuthy
} from "react-icons/si";
import {
    TbBrandThreejs,
    TbDatabaseSearch,
    TbBrandSocketIo
} from "react-icons/tb";
import { Figma } from "lucide-react";
import { DiMongodb } from "react-icons/di";
import { VscTerminalLinux } from "react-icons/vsc";

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

const childVariants: Variants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
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

const SkillBadge = memo(({ skill, theme }: { skill: any, theme: string }) => (
    <motion.div
        variants={childVariants}
        className={`relative px-3 py-1.5 sm:px-5 sm:py-2 border transition-all duration-300 group hover:scale-105 transform-gpu ${
            theme === 'light' ? 'border-black/10 hover:border-black/30' : 'border-white/10 hover:border-white/30'
        } backdrop-blur-3xl pointer-events-auto overflow-hidden`}
    >
        <motion.div
            animate={{ "--border-progress": [0, 100] } as any}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
        >
            <AnimatedBorder />
        </motion.div>
        <div className="flex items-center gap-2 relative z-10">
            {skill.icon && <skill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" />}
            <span className={`text-[10px] sm:text-xs tracking-[0.2em] font-mono uppercase transition-colors duration-300 ${
                theme === 'light' ? 'text-neutral-800 group-hover:text-black' : 'text-neutral-400 group-hover:text-white'
            }`}>
                {skill.name}
            </span>
        </div>
    </motion.div>
));

SkillBadge.displayName = "SkillBadge";

const CategoryCard = memo(({ cat, theme, index }: { cat: any, theme: string, index: number }) => {
    const Icon = useMemo(() => cat.data.find((d: any) => d.icon)?.icon, [cat.data]);

    return (
        <motion.div
            variants={childVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`relative p-6 sm:p-8 backdrop-blur-3xl flex flex-col group overflow-hidden transform-gpu ${cat.span}`}
        >
            <motion.div
                animate={{ "--border-progress": [0, 100] } as any}
                transition={{ duration: 6, ease: "linear", repeat: Infinity, delay: index * 0.2 }}
                className="absolute inset-0 pointer-events-none"
            >
                <AnimatedBorder />
            </motion.div>

            <div className="flex items-center gap-4 mb-6 sm:mb-8 relative z-10">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    theme === 'light' ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'
                } border backdrop-blur-3xl`}>
                    {Icon && <Icon className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300 ${theme === 'light' ? 'text-black' : 'text-white'}`} />}
                </div>
                <h2 className={`text-xl sm:text-2xl font-mono uppercase tracking-widest transition-colors duration-300 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    {cat.title}
                </h2>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 relative z-10">
                {cat.data.map((skill: any, sIndex: number) => (
                    <SkillBadge key={sIndex} skill={skill} theme={theme} />
                ))}
            </div>
        </motion.div>
    );
});

CategoryCard.displayName = "CategoryCard";

export default function Skills() {
    const { theme } = useThemeStore();

    const categories = useMemo(() => [
        { title: "Languages", data: [{ name: 'C++' }, { name: 'JavaScript', icon: FaJs }, { name: 'TypeScript', icon: BiLogoTypescript }, { name: 'Python', icon: FaPython }, { name: 'Java', icon: FaJava }], span: "col-span-1 md:col-span-2 lg:col-span-1" },
        { title: "Frontend", data: [{ name: 'HTML5', icon: FaHtml5 }, { name: 'CSS3', icon: IoLogoCss3 }, { name: 'JavaScript', icon: FaJs }, { name: 'React.js', icon: FaReact }, { name: 'Next.js', icon: RiNextjsFill }, { name: 'Tailwind CSS', icon: RiTailwindCssFill }, { name: 'Framer Motion', icon: SiFramer }, { name: 'Responsive UI', icon: ImMobile2 }, { name: 'Context API' }, { name: 'Zustand' }, { name: 'UI Libraries' }, { name: 'Three.js', icon: TbBrandThreejs }, { name: 'GSAP' }], span: "col-span-1 md:col-span-2 lg:col-span-2" },
        { title: "Backend", data: [{ name: 'Node.js', icon: FaNodeJs }, { name: 'Express.js', icon: SiExpress }, { name: 'REST APIs' }, { name: 'JWT Authentication', icon: SiAuthy }, { name: 'Databases', icon: TbDatabaseSearch }, { name: 'Mongo DB', icon: DiMongodb }, { name: 'Supabase' }, { name: 'Firebase', icon: IoLogoFirebase }, { name: 'Clerk', icon: SiClerk }, { name: 'Websockets', icon: TbBrandSocketIo }, { name: 'Redis', icon: SiRedis }], span: "col-span-1 md:col-span-2 lg:col-span-2" },
        { title: "Tools", data: [{ name: 'Git', icon: IoIosGitNetwork }, { name: 'GitHub', icon: FaGithub }, { name: 'Figma', icon: Figma }, { name: 'Postman', icon: SiPostman }, { name: 'Vercel', icon: IoLogoVercel }, { name: 'Netlify' }, { name: 'Debugging' }, { name: 'Langchain', icon: SiLangchain }, { name: 'RAGs' }], span: "col-span-1 md:col-span-1 lg:col-span-1" },
        { title: "Learning", data: [{ name: 'Devops', icon: FaInfinity }, { name: 'DSA' }, { name: 'Linux', icon: VscTerminalLinux }, { name: 'Agentic AI' }, { name: 'Docker', icon: FaDocker }], span: "col-span-1 md:col-span-1 lg:col-span-3" },
    ], []);

    return (
        <div id="skills" className={`min-h-screen w-screen transition-colors duration-700 ${theme === 'light'
                ? 'bg-neutral-50 text-neutral-900'
                : 'bg-linear-to-bl from-[#070707] to-[#030303] via-[#090909] text-white'
            } overflow-hidden p-4 sm:p-6 md:p-12 lg:p-20 relative flex flex-col items-center justify-center`}>
            
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 transition-opacity duration-700 ${theme === 'light' ? 'opacity-30' : 'opacity-100'} bg-[radial-gradient(circle_at_50%_0%,rgba(50,50,50,0.1)_0%,transparent_50%)]`} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <motion.span
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: theme === 'light' ? 0.05 : 0.03, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`text-[20vw] md:text-[18vw] lg:text-[16vw] font-black uppercase tracking-widest leading-none transition-colors duration-700 transform-gpu ${theme === 'light' ? 'text-black' : 'text-white'}`}
                >
                    SKILLS
                </motion.span>
            </div>

            <div className="relative z-10 w-full mb-12 sm:mb-10 mt-10 text-center transform-gpu">
                <motion.h1
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight font-mono tracking-tighter overflow-hidden"
                >
                    {splitWords("Technical Arsenal")}
                </motion.h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full z-10 relative max-w-7xl mx-auto transform-gpu">
                {categories.map((cat, index) => (
                    <CategoryCard key={cat.title} cat={cat} theme={theme} index={index} />
                ))}
            </div>
        </div>
    );
}