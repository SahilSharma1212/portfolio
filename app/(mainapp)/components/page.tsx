"use client"

import React from "react";
import { motion } from "motion/react";
import { FiBox, FiLayers, FiCode, FiArrowLeft, FiSearch, FiTerminal } from "react-icons/fi";
import Link from "next/link";
import { CornerLines, BoxBorders } from "@/app/_components/Blueprint";

const componentsList = [
    { 
        title: "Slot Machine", 
        slug: "slot-machine",
        category: "Animation", 
        desc: "3-layer vertical ticker with high-performance Framer Motion logic. Uses a circular modulo arithmetic for infinite scrolling simulation.",
        tags: ["Framer Motion", "React", "TypeScript"]
    },
    { 
        title: "Blueprint Grid", 
        slug: "blueprint-grid",
        category: "Layout", 
        desc: "Dashed-border system with extending corner lines and radial masking. Implements an industrial blueprint aesthetic using CSS Grid and pseudo-elements.",
        tags: ["CSS Grid", "Tailwind", "Design System"]
    },
    { 
        title: "Hoverable Accordion", 
        slug: "hoverable-accordion",
        category: "Interactive", 
        desc: "High-performance hover-based expansion logic optimized for dense information displays and technical documentation.",
        tags: ["Hover Effect", "React", "Motion"]
    },
    { 
        title: "Glass Lens", 
        slug: "glass-lens",
        category: "Effect", 
        desc: "Interactive magnification lens with backdrop blur and cursor tracking. Uses Framer Motion's useSpring for smooth physical movement.",
        tags: ["Physics", "Blur", "Interactive"]
    }
];

export default function ComponentsPage() {
    return (
        <div className="min-h-screen w-full bg-white flex flex-col pt-16">
            {/* Page Header */}
            <header className="border-b border-dashed border-zinc-200 py-12 px-6 md:px-12 bg-zinc-50/30">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <h1 className="text-6xl font-light tracking-tighter text-black">
                            Library Assets
                        </h1>
                        <p className="text-zinc-500 font-light max-w-xl text-lg leading-relaxed">
                            A curated index of <span className="text-black font-normal">reusable UI primitives</span> and architectural foundations developed for this environment.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input 
                                placeholder="Search Primitives..." 
                                className="pl-12 pr-6 py-3 border border-dashed border-zinc-200 bg-white text-sm outline-none focus:border-[#635a5b] transition-all w-64 font-light"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Grid */}
            <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {componentsList.map((comp, idx) => (
                        <Link
                            key={idx}
                            href={`/components/${comp.slug}`}
                            className="relative group p-[1px] block"
                        >
                            <CornerLines />
                            <BoxBorders />
                            <div className="relative z-10 bg-white p-8 flex flex-col h-full border border-transparent group-hover:bg-zinc-50/50 transition-colors duration-500">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#635a5b] border border-[#635a5b]/20 px-2 py-1">
                                        {comp.category}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-normal text-black mb-4 tracking-tight">{comp.title}</h3>
                                <p className="text-zinc-500 font-light text-sm leading-relaxed mb-8 flex-1">
                                    {comp.desc}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {comp.tags.map(tag => (
                                        <span key={tag} className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-dashed border-zinc-100 flex justify-between items-center">
                                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-black transition-colors flex items-center gap-2">
                                        Initialize Module
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-zinc-200 group-hover:bg-rose-500 transition-colors" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>



                {/* Status Footer */}
                <div className="mt-24 border-t border-dashed border-zinc-200 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-zinc-300 italic">
                        All assets are open for peer review and optimization
                    </p>
                    <div className="flex gap-4">
                        <div className="w-12 h-[1px] bg-zinc-200 mt-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Registry Instance: 0x4A2B</span>
                    </div>
                </div>
            </main>
        </div>
    );
}