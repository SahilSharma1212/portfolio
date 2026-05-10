"use client"

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSend, FiTerminal, FiUser, FiLoader, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

interface MiniMessage {
    role: "user" | "assistant";
    content: string;
}

function MiniChatbot() {
    const messages: MiniMessage[] = [
        { role: "assistant", content: "Neural Bridge established. Systems nominal." },
        { role: "user", content: "Analyze portfolio performance." },
        { role: "assistant", content: "Efficiency metrics at 98.4%. Aesthetic coherence optimized." }
    ];

    const quickChips = ["System Status", "Tech Stack", "Node Map"];

    return (
        <div className="flex flex-col h-full bg-zinc-50/50">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {msg.role === "assistant" && (
                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-dashed border-zinc-300 bg-white text-zinc-400">
                                <FiTerminal size={14} />
                            </div>
                        )}
                        <div className={`max-w-[80%] p-4 text-[11px] font-light leading-relaxed border ${msg.role === "user"
                            ? "bg-[#352b2b] text-white border-zinc-800"
                            : "bg-white text-zinc-700 border-zinc-100"
                            }`}>
                            {msg.content}
                        </div>
                        {msg.role === "user" && (
                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-dashed border-zinc-800 bg-[#352b2b] text-white">
                                <FiUser size={14} />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Placeholder Controls */}
            <div className="p-6 border-t border-dashed border-zinc-200 bg-white space-y-4">
                <div className="flex gap-2 flex-wrap">
                    {quickChips.map(chip => (
                        <div
                            key={chip}
                            className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest border border-dashed border-zinc-200 text-zinc-400"
                        >
                            {chip}
                        </div>
                    ))}
                </div>
                <div className="relative">
                    <div className="w-full bg-zinc-50 border border-dashed border-zinc-200 px-4 py-3 text-[11px] font-light text-zinc-300 italic">
                        Neural interface locked in preview mode...
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-200">
                        <FiSend size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Showcase() {
    return (
        <section id="showcase" className="min-h-screen w-full flex flex-col items-center justify-center bg-white py-24 font-sans border-t border-dashed border-zinc-200">
            <div className="max-w-7xl w-full px-6 md:px-12 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <h2 className="text-6xl font-light tracking-tighter text-black">
                        System Showcase
                    </h2>
                    <p className="text-zinc-400 font-light max-w-2xl mx-auto">
                        A dual-engine overview of the structural foundations powering this environment.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-[1400px] w-full px-6 md:px-12 grid md:grid-cols-2 gap-12 lg:gap-16">

                {/* WINDOW 1: MINI CHATBOT */}
                <Window title="ChatBot" subtitle="NEURAL INTERFACE">
                    <div className="flex-1 flex flex-col h-full overflow-hidden">
                        <MiniChatbot />
                    </div>
                </Window>

                {/* WINDOW 2: COMPONENT GRID */}
                <Window title="Asset Registry" subtitle="REUSABLE MODULES">
                    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
                        <div className="grid grid-cols-2 gap-px bg-zinc-100 flex-1">
                            <ComponentPreview title="Slot Machine" category="Animation" />
                            <ComponentPreview title="Blueprint Grid" category="Layout" />
                            <ComponentPreview title="Hover Accordion" category="Interactive" />
                            <ComponentPreview title="Corner Lines" category="UI Detail" />
                        </div>
                    </div>
                </Window>

            </div>
        </section>
    );
}

function Window({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col h-[500px] border border-[#635a5b]/20  relative overflow-hidden group"
        >
            {/* Header Bar (MacBook Style) */}
            <div className="h-10 bg-white border-b border-dashed border-zinc-200 flex items-center px-4 justify-between z-20">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#635a5b]">{title}</span>
                </div>
                <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Content Area */}
            {children}

            {/* Subtle Overlay Label */}
            <div className="absolute top-12 right-6 pointer-events-none z-30">
                <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {subtitle}
                </span>
            </div>
        </motion.div>
    );
}

function ComponentPreview({ title, category }: { title: string; category: string }) {
    return (
        <div className="bg-white p-8 flex flex-col justify-between hover:bg-zinc-50 transition-colors duration-500 group/item border border-dashed border-transparent">
            <div className="flex justify-between items-start">
                <span className="text-[8px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-100 px-1.5 py-0.5">
                    {category}
                </span>
            </div>
            <div>
                <h4 className="text-[11px] font-bold text-black uppercase tracking-widest mb-1">{title}</h4>
                <div className="w-4 h-[1px] bg-zinc-200 group-hover/item:w-8 group-hover/item:bg-zinc-400 transition-all duration-500" />
            </div>
        </div>
    );
}

