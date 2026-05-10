"use client"

import React from "react";
import { motion } from "motion/react";
import { CornerLines, BoxBorders } from "./Blueprint";
import { FiCpu, FiMessageSquare, FiZap, FiTarget } from "react-icons/fi";

import Link from "next/link";

export default function Explore() {
    return (
        <section id="explore" className="min-h-screen w-full flex items-center justify-center bg-white py-24 font-sans border-t border-dashed border-zinc-200">
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center px-6 md:px-12">
                
                {/* LEFT: CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-5xl font-light tracking-tighter text-black mb-4">
                            Neural Interface
                        </h2>
                        <div className="w-20 h-[1px] bg-black" />
                    </div>
                    
                    <p className="text-xl text-slate-800 leading-relaxed font-light max-w-lg">
                        Meet my custom-tuned <span className="font-normal text-black">LLM assistant</span>. 
                        Trained on my specific coding patterns, research, and project history to provide instant, contextual knowledge.
                    </p>

                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <Feature icon={<FiCpu size={18} />} title="Custom Core" desc="Llama-3 architecture" />
                        <Feature icon={<FiZap size={18} />} title="Low Latency" desc="Groq-powered inference" />
                        <Feature icon={<FiTarget size={18} />} title="Context Aware" desc="RAG-optimized memory" />
                        <Feature icon={<FiMessageSquare size={18} />} title="Project Intel" desc="Syncs with my GitHub" />
                    </div>

                    <div className="pt-8">
                        <Link href="/chatbot" className="group relative inline-flex items-center gap-4 px-8 py-4 bg-black text-white overflow-hidden transition-all duration-500 hover:pr-12">
                            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.3em]">Initialize Chat</span>
                            <div className="absolute right-0 top-0 h-full w-0 bg-white/10 group-hover:w-full transition-all duration-500" />
                            <FiMessageSquare className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                {/* RIGHT: MOCK TERMINAL/UI */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group p-[1px]"
                >
                    <CornerLines />
                    <BoxBorders />
                    
                    <div className="relative z-10 bg-zinc-50 aspect-square md:aspect-auto md:h-[500px] overflow-hidden flex flex-col">
                        {/* Terminal Header */}
                        <div className="h-10 border-b border-dashed border-zinc-300 flex items-center px-4 justify-between bg-white/50">
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-zinc-300" />
                                <div className="w-2 h-2 bg-zinc-300" />
                                <div className="w-2 h-2 bg-zinc-300" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">neural_shell_v1.0</span>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 p-6 space-y-6 font-mono text-sm text-zinc-600 overflow-y-auto">
                            <div className="space-y-1">
                                <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">System Initialized...</p>
                                <p className="text-zinc-800">Connection established via WebSocket.</p>
                            </div>

                            <div className="space-y-1 border-l border-zinc-200 pl-4">
                                <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">User Request:</p>
                                <p className="text-zinc-800 italic">"Analyze the architecture of the 'PDF-Intel' project."</p>
                            </div>

                            <div className="space-y-1 bg-white p-4 border border-dashed border-zinc-200">
                                <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">Assistant Response:</p>
                                <p className="text-zinc-800 leading-relaxed">
                                    Analyzing <span className="text-blue-600">Sahil's</span> PDF-Intel repository. 
                                    Primary stack: Next.js 14, Supabase, and Groq for inference. 
                                    The system uses a hybrid RAG approach with metadata-rich extraction...
                                </p>
                            </div>
                        </div>

                        {/* Input Area */}
                        <Link href="/chatbot" className="p-4 bg-white border-t border-dashed border-zinc-300 block group/input">
                            <div className="flex items-center gap-3 px-4 py-2 border border-dashed border-zinc-200 text-zinc-400 italic text-sm group-hover/input:border-black group-hover/input:text-black transition-all">
                                <span>Initialize Full Interface...</span>
                                <div className="ml-auto w-4 h-4 border border-dashed border-zinc-300 group-hover/input:bg-black transition-all" />
                            </div>
                        </Link>
                    </div>
                </motion.div>


            </div>
        </section>
    );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="flex gap-3">
            <div className="text-black pt-1">{icon}</div>
            <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-black">{title}</h4>
                <p className="text-[11px] text-zinc-500">{desc}</p>
            </div>
        </div>
    );
}
