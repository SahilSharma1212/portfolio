"use client";

import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import AnimatedBorder from "./AnimatedBorder";
import { Users, UserPlus, FolderGit2, Star } from "lucide-react";
import { FaGithub, FaLinkedin, FaRegStar } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoDocumentTextSharp } from "react-icons/io5";
import { BiGitRepoForked } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { FiUserPlus } from "react-icons/fi";
import { memo } from "react";

const lines = ['I learn, ', 'I build, ', 'I code'];

function Details() {
    const { theme } = useThemeStore();
    const githubBoxRef = useRef<HTMLDivElement>(null);
    const aboutMeBoxRef = useRef<HTMLDivElement>(null);

    const [activeLineIndex, setActiveLineIndex] = useState(0);
    const [githubData, setGithubData] = useState({
        repos: 0,
        followers: 0,
        following: 0,
        stars: 0
    });

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                // Fetch basic user data
                const userRes = await fetch("https://api.github.com/users/SahilSharma1212");
                const userData = await userRes.json();

                // Fetch repos to calculate total stars
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

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLineIndex((prevIndex: number) => (prevIndex + 1) % lines.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();

        if (githubBoxRef.current) {
            tl.to(githubBoxRef.current, {
                "--border-progress": 100,
                duration: 6,
                ease: "none",
                repeat: -1,
            });
        }
        if (aboutMeBoxRef.current) {
            tl.to(aboutMeBoxRef.current, {
                "--border-progress": 100,
                duration: 6,
                ease: "none",
                repeat: -1,
            }, "-=3"); // offset to feel more dynamic
        }
    }, []);

    const borderStyles = {
        "--border-progress": 0,
    } as React.CSSProperties;


    return (
        <div id="details" className="min-h-screen w-screen bg-linear-to-bl to-[#070707] from-[#030303] via-[#090909] text-white overflow-hidden p-4 sm:p-6 md:p-12 lg:p-20 relative">
            {/* Background gradients to match Landing */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(50,50,50,0.1)_0%,transparent_50%)]" />
            </div>

            {/* Background "ABOUT ME" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <motion.span
                    initial={{ opacity: 0, scale: 1.04 }}
                    whileInView={{ opacity: 0.03, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-[20vw] md:text-[18vw] lg:text-[16vw] font-black uppercase tracking-widest text-white/50 leading-none whitespace-nowrap"
                >
                    ABOUT ME
                </motion.span>
            </div>

            {/* GUESS WHAT */}
            <div className="relative mb-10 p-6 sm:p-10 backdrop-blur-3xl">
                <AnimatedBorder />
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight font-mono tracking-tighter mb-6"
                >
                    Guess What Recruiters
                </motion.h1>

                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                    {lines.map((line, index) => (
                        <span
                            key={index}
                            className={`inline-block transition-all duration-700 font-mono
                                ${index === activeLineIndex
                                    ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white opacity-100 scale-105'
                                    : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/10 blur-[2px]'
                                }`}
                        >
                            {line}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {/* GITHUB CONTRIBUTIONS */}
                <motion.div
                    ref={githubBoxRef}
                    style={borderStyles}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-2 relative p-6 sm:p-10 flex flex-col items-center justify-center backdrop-blur-3xl min-h-[300px]"
                >
                    <AnimatedBorder />

                    {/* GITHUB STATS GRID */}
                    <div className="relative z-10 w-full mb-8">
                        <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
                            <div className="relative flex flex-col items-center justify-center p-4 border border-white/10 hover:bg-white/5 transition-colors">
                                <AnimatedBorder />
                                <BiGitRepoForked className="w-5 h-5 sm:w-6 sm:h-6 mb-2 text-neutral-400" />
                                <span className="text-xl sm:text-2xl font-mono font-light">{githubData.repos}</span>
                                <span className="text-[10px] sm:text-xs tracking-widest text-neutral-500 uppercase mt-1">Repos</span>
                            </div>
                            <div className="relative flex flex-col items-center justify-center p-4 border border-white/10 hover:bg-white/5 transition-colors">
                                <AnimatedBorder />
                                <LuUsers className="w-5 h-5 sm:w-6 sm:h-6 mb-2 text-neutral-400" />
                                <span className="text-xl sm:text-2xl font-mono font-light">{githubData.followers}</span>
                                <span className="text-[10px] sm:text-xs tracking-widest text-neutral-500 uppercase mt-1">Followers</span>
                            </div>
                            <div className="relative flex flex-col items-center justify-center p-4 border border-white/10 hover:bg-white/5 transition-colors">
                                <AnimatedBorder />
                                <FiUserPlus className="w-5 h-5 sm:w-6 sm:h-6 mb-2 text-neutral-400" />
                                <span className="text-xl sm:text-2xl font-mono font-light">{githubData.following}</span>
                                <span className="text-[10px] sm:text-xs tracking-widest text-neutral-500 uppercase mt-1">Following</span>
                            </div>
                            <div className="relative flex flex-col items-center justify-center p-4 border border-white/10 hover:bg-white/5 transition-colors">
                                <AnimatedBorder />
                                <FaRegStar className="w-5 h-5 sm:w-6 sm:h-6 mb-2 text-neutral-400" />
                                <span className="text-xl sm:text-2xl font-mono font-light">{githubData.stars}</span>
                                <span className="text-[10px] sm:text-xs tracking-widest text-neutral-500 uppercase mt-1">Stars</span>
                            </div>
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
                            className="w-full opacity-80 hover:opacity-100 transition-opacity duration-500 max-w-4xl"
                        />
                    </a>

                    {/* LINKS */}
                    <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 relative z-10 w-full flex-wrap">
                        <a
                            href="https://github.com/SahilSharma1212"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex items-center justify-center p-3 sm:p-4 border border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                        >
                            <AnimatedBorder />
                            <FaGithub className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                        </a>

                        <a
                            href="mailto:sahilbhaisharma1212@gmail.com"
                            className="relative flex items-center justify-center p-3 sm:p-4 border border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                        >
                            <AnimatedBorder />
                            <IoMdMail className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/sahil-sharma-822a752a9/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex items-center justify-center p-3 sm:p-4 border border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                        >
                            <AnimatedBorder />
                            <FaLinkedin className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                        </a>
                        <div
                            className="relative flex items-center justify-center p-3 sm:p-4 border border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                        >
                            <AnimatedBorder />
                            <IoDocumentTextSharp className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                        </div>
                    </div>
                </motion.div>

                {/* ABOUT ME */}
                <motion.div
                    ref={aboutMeBoxRef}
                    style={borderStyles}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative p-8 sm:p-10 backdrop-blur-3xl flex flex-col justify-center group overflow-hidden"
                >
                    <AnimatedBorder />

                    {/* Hover Image Background */}
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <img
                            src="/linkedinimage.jpg"
                            alt="Sahil Sharma"
                            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#090909] via-[#090909]/80 to-transparent" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-xl sm:text-2xl font-mono text-white/80 group-hover:text-white mb-6 tracking-widest uppercase transition-colors duration-500">
                            About Me
                        </h2>

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


            {/* ACADEMICS */}
            <div className="relative my-10 p-6 sm:p-10 backdrop-blur-3xl">
                <AnimatedBorder />
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight font-mono tracking-tighter mb-6">Academics</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 10th */}
                    <div className="relative h-20 overflow-hidden flex flex-col group border border-white/5 hover:border-white/20 transition-colors">
                        <AnimatedBorder />
                        <motion.div
                            className="flex flex-col flex-1"
                            whileHover={{ y: "-50%" }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        >
                            {/* Main View */}
                            <div className="h-20 flex items-center justify-center gap-4">
                                <span className="text-2xl font-extralight font-mono">10th</span>
                                <span className="text-neutral-400 text-lg font-mono">96.2%</span>
                            </div>
                            {/* Detail View */}
                            <div className="h-20 flex flex-col items-center justify-center bg-white/5 font-mono">
                                <span className="text-sm text-neutral-300">Delhi Public School</span>
                                <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Class of 2019</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* 12th */}
                    <div className="relative h-20 overflow-hidden flex flex-col group border border-white/5 hover:border-white/20 transition-colors">
                        <AnimatedBorder />
                        <motion.div
                            className="flex flex-col flex-1"
                            whileHover={{ y: "-50%" }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <div className="h-20 flex items-center justify-center gap-4">
                                <span className="text-2xl font-extralight font-mono">12th</span>
                                <span className="text-neutral-400 text-lg font-mono">94.2%</span>
                            </div>
                            <div className="h-20 flex flex-col items-center justify-center bg-white/5 font-mono">
                                <span className="text-sm text-neutral-300">Delhi Public School</span>
                                <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Class of 2021</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* B.Tech */}
                    <div className="relative h-20 overflow-hidden flex flex-col group border border-white/5 hover:border-white/20 transition-colors sm:col-span-2 lg:col-span-1">
                        <AnimatedBorder />
                        <motion.div
                            className="flex flex-col flex-1"
                            whileHover={{ y: "-50%" }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <div className="h-20 flex items-center justify-center gap-4">
                                <span className="text-2xl font-extralight font-mono">B.Tech</span>
                                <span className="text-neutral-400 text-lg font-mono">8.5 CGPA</span>
                            </div>
                            <div className="h-20 flex flex-col items-center justify-center bg-white/5 font-mono">
                                <span className="text-sm text-neutral-300">Computer Science</span>
                                <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">2021 — 2025</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Details)