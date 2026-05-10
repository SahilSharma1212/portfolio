"use client"

import React from "react";
import { motion } from "motion/react";
import { CornerLines, BoxBorders } from "./Blueprint";
import { RiLinkedinLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiArrowUpRight } from "react-icons/fi";
import { VscGithubAlt } from "react-icons/vsc";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white pt-32 pb-12 px-6 md:px-12 font-sans overflow-hidden border-t border-dashed border-zinc-200">
            <div className="max-w-7xl mx-auto">

                {/* TOP SECTION: BIG CTA */}
                <div className="grid md:grid-cols-2 gap-20 mb-32 items-end">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 mb-6">Inquiries & Partnerships</p>
                        <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-black leading-[0.9]">
                            Let's build <br />
                            <span className="italic font-light">something</span> <br />
                            immortal.
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <p className="text-xl text-slate-500 font-light leading-relaxed max-w-sm">
                            Always open for high-impact collaborations and technical architectural challenges.
                        </p>
                        <a
                            href="mailto:sahilbhaisharma1212@gmail.com"
                            className="group flex items-center gap-4 text-2xl font-normal text-black"
                        >
                            sahilbhaisharma1212@gmail.com
                            <div className="w-12 h-12 border border-dashed border-zinc-300 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                                <FiArrowUpRight size={20} />
                            </div>
                        </a>
                    </motion.div>
                </div>

                {/* BOTTOM SECTION: GRID */}
                <div className="relative group p-[1px] mt-20">
                    <CornerLines />
                    <BoxBorders />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 bg-white/50 backdrop-blur-[2px]">
                        {/* Copyright */}
                        <div className="p-8 border-b md:border-b-0 md:border-r border-dashed border-zinc-200 flex flex-col justify-between h-48">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Copyright</span>
                            <p className="text-sm font-light text-zinc-800">
                                © {currentYear} Sahil Sharma. <br />
                                All rights reserved.
                            </p>
                        </div>

                        {/* Location/Time */}
                        <div className="p-8 border-b md:border-b-0 md:border-r border-dashed border-zinc-200 flex flex-col justify-between h-48">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Base Location</span>
                            <div className="space-y-1">
                                <p className="text-sm font-light text-zinc-800">Bhilai, Chhattisgarh</p>
                                <p className="text-[10px] text-zinc-400 font-mono">India / GMT +5:30</p>
                            </div>
                        </div>


                        {/* Connect */}
                        <div className="p-8 flex flex-col justify-between h-48">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">System Connect</span>
                            <div className="flex gap-4">
                                <SocialIcon icon={<VscGithubAlt size={18} />} href="https://github.com/SahilSharma1212" />
                                <SocialIcon icon={<RiLinkedinLine size={18} />} href="https://www.linkedin.com/in/sahil-sharma-822a752a9/" />
                                <SocialIcon icon={<FiPhoneCall size={18} />} href="tel:+918821809999" />
                            </div>
                        </div>
                    </div>
                </div>


                {/* HUGE TEXT BACKGROUND */}
                <div className="mt-20 opacity-[0.03] select-none pointer-events-none">
                    <h1 className="text-[20vw] font-black tracking-tighter text-black leading-none uppercase">
                        Sahil Sharma
                    </h1>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-dashed border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black hover:border-zinc-900 transition-all duration-300"
        >
            {icon}
        </a>
    );
}
