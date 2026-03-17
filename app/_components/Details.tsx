"use client";

import { motion, Variants, m } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import { useEffect, useState, useRef, useMemo } from "react";
import AnimatedBorder from "./AnimatedBorder";
import { BiGitRepoForked } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { FiUserPlus } from "react-icons/fi";
import { IoLogoGithub, IoLogoLinkedin, IoDocumentTextSharp, IoCallSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { Star } from "lucide-react";
import { memo } from "react";

const lines = ['I run, ', 'I build, ', 'I code'];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
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

const charVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
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

const splitText = (text: string) =>
    text.split("").map((char, i) => (
        <motion.span
            key={i}
            variants={charVariants}
            className="char inline-block"
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    ));

const GithubStats = memo(() => {
    const { theme } = useThemeStore();
    const [githubData, setGithubData] = useState({
        repos: 0,
        followers: 0,
        following: 0,
        stars: 0
    });

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const userRes = await fetch("https://api.github.com/users/SahilSharma1212");
                const userData = await userRes.json();
                const reposRes = await fetch("https://api.github.com/users/SahilSharma1212/repos?per_page=100");
                const reposData = await reposRes.json();

                const stars = Array.isArray(reposData)
                    ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
                    : 0;

                if (userRes.ok) {
                    setGithubData({
                        repos: userData.public_repos || 0,
                        followers: userData.followers || 0,
                        following: userData.following || 0,
                        stars: stars
                    });
                }
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
            }
        };
        fetchGithubData();
    }, []);

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/Sahil_Sharma_Fullstack_Resume.pdf';
        link.download = 'Sahil_Sharma_Resume.pdf';
        link.click();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 relative p-6 sm:p-10 flex flex-col items-center justify-center backdrop-blur-3xl min-h-[300px] transform-gpu overflow-hidden"
        >
            <motion.div
                animate={{ "--border-progress": [0, 100] } as any}
                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
            >
                <AnimatedBorder />
            </motion.div>

            <div className="relative z-10 w-full mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
                    {[
                        { icon: BiGitRepoForked, label: "Repos", value: githubData.repos },
                        { icon: LuUsers, label: "Followers", value: githubData.followers },
                        { icon: FiUserPlus, label: "Following", value: githubData.following },
                        { icon: Star, label: "Stars", value: githubData.stars },
                    ].map((stat, i) => (
                        <div key={i} className="relative flex flex-col items-center justify-center p-4 border border-white/10 hover:bg-white/5 transition-colors group">
                            <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-2 text-neutral-400 group-hover:text-white transition-colors" />
                            <span className="text-xl sm:text-2xl font-mono font-light">{stat.value}</span>
                            <span className="text-[10px] sm:text-xs tracking-widest text-neutral-500 uppercase mt-1">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <a
                href="https://github.com/SahilSharma1212"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-full flex justify-center"
            >
                <img
                    src="https://ghchart.rshah.org/0d1117/SahilSharma1212"
                    alt="GitHub Contributions"
                    loading="lazy"
                    className="w-full opacity-80 hover:opacity-100 transition-opacity duration-500 max-w-4xl transform-gpu"
                />
            </a>

            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 relative z-10 w-full flex-wrap">
                {[
                    { icon: IoLogoGithub, href: "https://github.com/SahilSharma1212" },
                    { icon: IoMdMail, href: "mailto:sahilbhaisharma1212@gmail.com" },
                    { icon: IoLogoLinkedin, href: "https://www.linkedin.com/in/sahil-sharma-822a752a9/" },
                    { icon: IoDocumentTextSharp, onClick: handleDownloadResume },
                    { icon: IoCallSharp, href: "tel:+918821809999" },
                ].map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        onClick={link.onClick}
                        target={link.href ? "_blank" : undefined}
                        rel={link.href ? "noopener noreferrer" : undefined}
                        className={`relative flex items-center justify-center p-3 sm:p-4 border transition-all duration-300 group cursor-pointer ${theme === 'light' ? 'border-black/10 hover:bg-black/5' : 'border-white/10 hover:bg-white/5'}`}
                    >
                        <link.icon className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${theme === 'light' ? 'text-neutral-600 group-hover:text-black group-hover:scale-110' : 'text-neutral-400 group-hover:text-white group-hover:scale-110'}`} />
                    </a>
                ))}
            </div>
        </motion.div>
    );
});

GithubStats.displayName = "GithubStats";

const DynamicTextLines = memo(({ theme }: { theme: string }) => {
    const [activeLineIndex, setActiveLineIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLineIndex((prevIndex) => (prevIndex + 1) % lines.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {lines.map((line, index) => {
                const isActive = index === activeLineIndex;
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: isActive ? 1 : 0.2,
                            scale: isActive ? 1.05 : 1,
                            filter: isActive ? "blur(0px)" : "blur(2px)"
                        }}
                        transition={{ duration: 0.5 }}
                        className={`inline-block font-mono overflow-hidden text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${
                            theme === 'light' ? 'text-black' : 'text-white'
                        }`}
                    >
                        {line}
                    </motion.div>
                );
            })}
        </div>
    );
});

DynamicTextLines.displayName = "DynamicTextLines";

function Details() {
    const { theme } = useThemeStore();

    return (
        <div id="about" className={`min-h-screen w-screen transition-colors duration-700 ${theme === 'light'
            ? 'bg-neutral-50 text-neutral-900'
            : 'bg-linear-to-bl to-[#070707] from-[#030303] via-[#090909] text-white'
            } overflow-hidden p-4 sm:p-6 md:p-12 lg:p-20 relative`}>
            
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 transition-opacity duration-700 ${theme === 'light' ? 'opacity-30' : 'opacity-100'} bg-[radial-gradient(circle_at_50%_100%,rgba(50,50,50,0.1)_0%,transparent_50%)]`} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <motion.span
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: theme === 'light' ? 0.05 : 0.03, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`text-[20vw] md:text-[18vw] lg:text-[16vw] font-black uppercase tracking-widest leading-none whitespace-nowrap transform-gpu ${theme === 'light' ? 'text-black' : 'text-white'}`}
                >
                    ABOUT ME
                </motion.span>
            </div>

            <div className="relative mb-10 p-6 sm:p-10 backdrop-blur-3xl transform-gpu overflow-hidden">
                <motion.div
                    animate={{ "--border-progress": [0, 100] } as any}
                    transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <AnimatedBorder />
                </motion.div>
                <motion.h1
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight font-mono tracking-tighter mb-6 overflow-hidden"
                >
                    {splitWords("Guess What Recruiters")}
                </motion.h1>

                <DynamicTextLines theme={theme} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                <GithubStats />

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="relative p-8 sm:p-10 backdrop-blur-3xl flex flex-col justify-center group overflow-hidden transform-gpu"
                >
                    <motion.div
                        animate={{ "--border-progress": [0, 100] } as any}
                        transition={{ duration: 6, ease: "linear", repeat: Infinity, delay: 3 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <AnimatedBorder />
                    </motion.div>

                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform-gpu">
                        <img
                            src="/linkedinimage.jpg"
                            alt="Sahil Sharma"
                            loading="lazy"
                            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000 transform-gpu"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#090909] via-[#090909]/80 to-transparent" />
                    </div>

                    <div className="relative z-10">
                        <motion.h2
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className={`text-xl sm:text-2xl font-mono ${theme === 'light' ? 'text-black/80 group-hover:text-black' : 'text-white/80 group-hover:text-white'} mb-6 tracking-widest uppercase transition-colors duration-500 overflow-hidden`}
                        >
                            {splitWords("About Me")}
                        </motion.h2>

                        <p className="text-neutral-400 group-hover:text-neutral-200 text-base sm:text-lg leading-relaxed font-light transition-colors duration-500">
                            I am an AI full-stack developer focused on building intelligent and
                            scalable web applications. I work with modern full-stack technologies
                            including the MERN stack and Next.js, and build systems using both SQL
                            and NoSQL databases. My work also involves AI engineering with
                            LangChain, Retrieval Augmented Generation (RAG) systems, and
                            generative AI integrations to create practical developer tools and
                            modern web platforms.
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="relative my-10 p-6 sm:p-10 backdrop-blur-3xl transform-gpu overflow-hidden">
                <motion.div
                    animate={{ "--border-progress": [0, 100] } as any}
                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <AnimatedBorder />
                </motion.div>
                <motion.h1
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight font-mono tracking-tighter mb-6 overflow-hidden"
                >
                    {splitWords("Academics")}
                </motion.h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "10th", value: "96.2%", school: "Delhi Public School", detail: "DPS Bhilai | 2020" },
                        { title: "12th", value: "94.2%", school: "Delhi Public School", detail: "DPS Bhilai | 2022" },
                        { title: "B.Tech", value: "8.5 CGPA", school: "Computer Science", detail: "BIT Durg | 2026", span: "sm:col-span-2 lg:col-span-1" },
                    ].map((item, i) => (
                        <div key={i} className={`relative h-20 overflow-hidden flex flex-col group border border-white/5 hover:border-white/20 transition-colors transform-gpu ${item.span || ""}`}>
                            <motion.div
                                animate={{ "--border-progress": [0, 100] } as any}
                                transition={{ duration: 4, ease: "linear", repeat: Infinity, delay: i * 0.5 }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                <AnimatedBorder />
                            </motion.div>
                            <motion.div
                                className="flex flex-col flex-1 transform-gpu"
                                whileHover={{ y: "-50%" }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="h-20 flex items-center justify-center gap-4 shrink-0">
                                    <span className="text-2xl font-extralight font-mono">{item.title}</span>
                                    <span className="text-neutral-400 text-lg font-mono">{item.value}</span>
                                </div>
                                <div className="h-20 flex flex-col items-center justify-center bg-white/5 font-mono shrink-0">
                                    <span className="text-sm text-neutral-300">{item.school}</span>
                                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">{item.detail}</span>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(Details)