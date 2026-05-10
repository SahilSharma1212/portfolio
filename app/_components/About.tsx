"use client"

import { useState, useEffect } from "react";
import { motion } from "motion/react"
import { RiLinkedinLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { VscGithubAlt } from "react-icons/vsc";
import { CornerLines, BoxBorders } from "./Blueprint";

import { GITHUB_USERNAME, PERSONAL_INFO } from "@/app/constants";

interface GitHubStats {
    repos: string;
    stars: string;
    followers: string;
    commits: string;
    loading: boolean;
}

export default function About() {
    const [stats, setStats] = useState<GitHubStats>({
        repos: "0",
        stars: "0",
        followers: "0",
        commits: "0",
        loading: true
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                // Fetch basic user info
                const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                const userData = await userRes.json();

                // Fetch repos to sum stars
                const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
                const reposData = await reposRes.json();
                const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

                // Fetch recent events to calculate commits in the past week
                const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events`);
                const eventsData = await eventsRes.json();

                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

                const weeklyCommits = eventsData
                    .filter((event: any) =>
                        event.type === "PushEvent" &&
                        new Date(event.created_at) > oneWeekAgo
                    )
                    .reduce((acc: number, event: any) => acc + (event.payload.size || 0), 0);

                setStats({
                    repos: userData.public_repos?.toString() || "0",
                    stars: totalStars.toString(),
                    followers: userData.followers?.toString() || "0",
                    commits: weeklyCommits.toString(),
                    loading: false
                });
            } catch (error) {
                console.error("Error fetching GitHub stats:", error);
                setStats(prev => ({ ...prev, loading: false }));
            }
        }
        fetchStats();
    }, []);

    return (
        <section id="about" className="min-h-screen w-full flex items-center justify-center bg-white py-24 font-sans">
            <div className="max-w-7xl w-full grid md:grid-cols-[1.2fr_1fr_1.8fr] gap-12 lg:gap-20 items-stretch px-6 md:px-12">

                {/* COL 1: BRANDING */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center text-center"
                >
                    <h2 className="text-5xl font-light tracking-tighter text-black mb-6 text-left">
                        About me!
                    </h2>
                    <p className="text-xl text-slate-800 leading-tight font-light text-left">
                        {PERSONAL_INFO.aboutShort.split('dumb hardwork')[0]}
                        <span className="font-normal text-black">dumb hardwork</span>,
                        {PERSONAL_INFO.aboutShort.split('dumb hardwork')[1]}
                    </p>
                </motion.div>

                {/* COL 2: IMAGE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="relative w-full h-full group p-[1px]"
                >
                    <CornerLines />
                    <BoxBorders />
                    <div className="w-full h-full overflow-hidden bg-zinc-50 shadow-sm relative z-10">
                        <img
                            src="/professional_image.jpg"
                            alt={PERSONAL_INFO.name}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                        />
                    </div>
                </motion.div>

                {/* COL 3: DATA & STATS */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col h-full"
                >
                    {/* TOP: ACADEMIC MARKS */}
                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4 font-bold">Academic Foundation</p>
                        {PERSONAL_INFO.academic.map((item) => (
                            <Metric key={item.label} label={item.label} value={item.value} />
                        ))}
                    </div>

                    {/* MIDDLE & BOTTOM: UNIFIED GITHUB + SOCIALS BOX */}
                    <div className="py-8 relative">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-5 font-bold">Intelligence & Connection</p>

                        <div className="relative group p-[1px]">
                            <CornerLines />
                            <BoxBorders />

                            {/* Vanishing Dot Grid Background */}
                            <div className="absolute -inset-x-8 -inset-y-12 z-[-1] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-30 pointer-events-none">
                                <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
                            </div>

                            <div className="relative z-10 bg-white/50 backdrop-blur-[2px]">
                                {/* GitHub Stats Grid (Internal) */}
                                <div className="grid grid-cols-2 border-b border-dashed border-zinc-300">
                                    <StatBox label="Repos" value={stats.loading ? "..." : stats.repos} className="border-r" />
                                    <StatBox label="Stars" value={stats.loading ? "..." : stats.stars} />
                                    <StatBox label="Followers" value={stats.loading ? "..." : stats.followers} className="border-r border-t" />
                                    <StatBox label="Commits" value={stats.loading ? "..." : stats.commits} className="border-t" />
                                </div>

                                {/* CONTRIBUTION CALENDAR (Internal) */}
                                <div className="p-5 border-b border-dashed border-zinc-300 group max-w-full overflow-hidden">
                                    <img
                                        src={`https://ghchart.rshah.org/ec4899/${GITHUB_USERNAME}`}
                                        alt="GitHub Contributions"
                                        className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                                    />
                                </div>

                                {/* SOCIALS GRID (Internal) */}
                                <div className="grid grid-cols-4">
                                    <SocialLink icon={<VscGithubAlt size={18} />} href={PERSONAL_INFO.github} label="GH" className="border-r" />
                                    <SocialLink icon={<RiLinkedinLine size={18} />} href={PERSONAL_INFO.linkedin} label="LI" className="border-r" />
                                    <SocialLink icon={<AiOutlineMail size={18} />} href={`mailto:${PERSONAL_INFO.email}`} label="Mail" className="border-r" />
                                    <SocialLink icon={<FiPhoneCall size={18} />} href={`tel:${PERSONAL_INFO.phone}`} label="Call" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>




            </div>
        </section>
    )
}

function StatBox({ label, value, className = "" }: { label: string; value: string; className?: string }) {
    return (
        <div className={`p-4 border-dashed border-zinc-300 flex flex-col gap-1 transition-all duration-300 hover:bg-zinc-50 ${className}`}>
            <span className="text-[9px] uppercase tracking-widest font-bold opacity-50 text-zinc-500">{label}</span>
            <span className="text-xl font-light leading-none text-zinc-900">{value}</span>
        </div>
    )
}


function Metric({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-end gap-3 group">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{label}</span>
            <div className="flex-1 border-b border-gray-200 mb-1 group-hover:border-gray-500 transition-colors" />
            <span className="text-xl font-light text-gray-600 leading-none">{value}</span>
        </div>
    )
}

function SocialLink({ icon, href, label, className = "" }: { icon: React.ReactNode; href: string; label: string; className?: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial="rest"
            whileHover="hover"
            animate="rest"
            className={`flex items-center justify-center border-dashed border-zinc-300 p-4 transition-all duration-300 group hover:bg-zinc-50 ${className}`}
        >
            <div className="text-zinc-500 group-hover:text-black transition-colors flex items-center gap-2">
                {icon}
                <motion.div
                    variants={{
                        rest: { width: 0, opacity: 0, marginLeft: 0 },
                        hover: { width: "auto", opacity: 1, marginLeft: 4 }
                    }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                    className="overflow-hidden"
                >
                    <span className="text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap">
                        {label}
                    </span>
                </motion.div>
            </div>
        </motion.a>
    )
}

