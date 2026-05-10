"use client"

import React, { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck, FiArrowLeft, FiTerminal, FiLayers, FiCpu, FiMonitor, FiChevronRight } from "react-icons/fi";
import SlotMachine from "@/app/_components/SlotMachine";
import { CornerLines, BoxBorders } from "@/app/_components/Blueprint";

// COMPONENT DATA REGISTRY
const COMPONENT_DATA: Record<string, any> = {
    "slot-machine": {
        title: "Slot Machine",
        category: "Animation",
        description: "A premium 3-layer vertical ticker designed for hero sections. Implements an infinite scrolling simulation using Framer Motion's AnimatePresence.",
        install: "npm i motion react-icons",
        code: `"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Engineer",
    "AI Fullstack Engineer",
    "Devops Engineer"
]

export default function SlotMachine() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length)
        }, 2500)
        return () => clearInterval(timer)
    }, [])

    const getIndex = (offset: number) => {
        let newIndex = (index + offset) % roles.length
        if (newIndex < 0) newIndex += roles.length
        return newIndex
    }

    return (
        <div className="relative h-[400px] flex flex-col justify-center items-center overflow-hidden select-none">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="text-zinc-500 font-extralight text-xl blur-[4px] opacity-30">
                        {roles[getIndex(-2)]}
                    </div>
                    <div className="text-zinc-700 font-extralight text-2xl blur-[2px] opacity-50">
                        {roles[getIndex(-1)]}
                    </div>
                    <div className="relative w-[300px] md:w-[450px] py-4 flex justify-center items-center">
                        <div className="absolute top-0 left-[-50px] right-[-50px] border-t border-dashed border-zinc-400" />
                        <div className="absolute bottom-0 left-[-50px] right-[-50px] border-b border-dashed border-zinc-400" />
                        <span className="text-black font-extralight text-3xl md:text-4xl">
                            {roles[index]}
                        </span>
                    </div>
                    <div className="text-zinc-700 font-extralight text-2xl blur-[2px] opacity-50">
                        {roles[getIndex(1)]}
                    </div>
                    <div className="text-zinc-500 font-extralight text-xl blur-[4px] opacity-30">
                        {roles[getIndex(2)]}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}`,
        preview: () => <SlotMachine />
    },
    "blueprint-grid": {
        title: "Blueprint Grid",
        category: "Layout",
        description: "An industrial-styled layout primitive featuring dashed borders and extended corner lines. Perfect for creating a technical, draft-like aesthetic.",
        install: "npm i react-icons",
        code: `"use client"

import React from "react";

export const CornerLines = () => (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
        {/* Top Left */}
        <div className="absolute top-0 left-0 -translate-x-full -translate-y-[1px] w-8 h-[1px] border-t border-dashed border-zinc-300 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="absolute top-0 left-0 -translate-y-full -translate-x-[1px] w-[1px] h-8 border-l border-dashed border-zinc-300 [mask-image:linear-gradient(to_top,black,transparent)]" />
        {/* ... Repeated for other corners */}
    </div>
);

export const BoxBorders = () => (
    <>
        <div className="absolute top-0 left-0 w-full h-[1px] border-t border-dashed border-zinc-300" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] border-b border-dashed border-zinc-300" />
        <div className="absolute top-0 left-0 h-full w-[1px] border-l border-dashed border-zinc-300" />
        <div className="absolute top-0 right-0 h-full w-[1px] border-r border-dashed border-zinc-300" />
    </>
);`,
        preview: () => (
            <div className="w-full h-[400px] flex items-center justify-center p-20">
                <div className="w-64 h-64 relative">
                    <CornerLines />
                    <BoxBorders />
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300 font-mono text-[10px] uppercase tracking-widest">
                        Blueprint Content
                    </div>
                </div>
            </div>
        )
    },
    "hoverable-accordion": {
        title: "Hoverable Accordion",
        category: "Interactive",
        description: "A high-performance hover-based expansion logic optimized for dense information displays and technical documentation. Features smooth height transitions and rotating indicators.",
        install: "npm i motion react-icons",
        code: `"use client"

import React from "react";
import { motion } from "motion/react";
import { FiChevronRight } from "react-icons/fi";

export default function HoverAccordion() {
    return (
        <div className="p-8 space-y-0 max-w-md mx-auto">
            {[1, 2, 3].map((i) => (
                <div 
                    key={i}
                    className="group w-full border-b border-dashed border-zinc-200 bg-transparent py-4 flex flex-col gap-2 transition-all duration-500 cursor-pointer overflow-hidden h-14 hover:h-32"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-black">0{i} Node_Structure</span>
                        <FiChevronRight size={14} className="text-zinc-300 group-hover:text-black group-hover:rotate-90 transition-all duration-500" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 text-xs text-zinc-500 font-light leading-relaxed">
                        Architectural primitive implementing a high-performance hover-based expansion logic. 
                        Optimized for rapid information retrieval in dense data environments.
                    </div>
                </div>
            ))}
        </div>
    )
}`,
        preview: () => (
            <div className="w-full h-[400px] flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-0">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="group/acc w-full border-b border-dashed border-zinc-200 bg-transparent py-4 flex flex-col gap-2 transition-all duration-500 cursor-pointer overflow-hidden h-14 hover:h-32"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover/acc:text-black">0{i} Node_Structure</span>
                                <FiChevronRight size={14} className="text-zinc-300 group-hover/acc:text-black group-hover/acc:rotate-90 transition-all duration-500" />
                            </div>
                            <div className="opacity-0 group-hover/acc:opacity-100 transition-all duration-500 text-xs text-zinc-500 font-light leading-relaxed">
                                Architectural primitive implementing a high-performance hover-based expansion logic.
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    "glass-lens": {
        title: "Glass Lens",
        category: "Effect",
        description: "An interactive magnification effect that creates a physical sense of focus. Uses backdrop filters and cursor coordinate tracking with physical springs.",
        install: "npm i motion",
        code: `"use client"

import React, { useRef, useState } from "react";

export default function GlassLens() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: -999, y: -999 });
    const [active, setActive] = useState(false);

    const RADIUS = 80;

    function handleMouseMove(e: React.MouseEvent) {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        setPos({ x: e.clientX - left, y: e.clientY - top });
    }

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className="relative w-full h-[400px] bg-white overflow-hidden cursor-none select-none"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-5xl font-extralight text-zinc-200 tracking-tighter whitespace-nowrap">
                    ARCHITECTURAL_PRIMITIVES
                </p>
            </div>

            <div 
                className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-3xl transition-opacity duration-200"
                style={{
                    clipPath: active ? \`circle(\${RADIUS}px at \${pos.x}px \${pos.y}px)\` : \`circle(0px at \${pos.x}px \${pos.y}px)\`,
                }}
            >
                <p className="text-7xl font-extralight text-black tracking-tighter whitespace-nowrap">
                    ARCHITECTURAL_PRIMITIVES
                </p>
            </div>

            {active && (
                <div 
                    className="absolute rounded-full border border-zinc-700 pointer-events-none shadow-lg"
                    style={{
                        width: RADIUS * 2,
                        height: RADIUS * 2,
                        left: pos.x - RADIUS,
                        top: pos.y - RADIUS,
                    }}
                />
            )}
        </div>
    );
}`,
        preview: () => <GlassLensPreview />
    }
};

function GlassLensPreview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = React.useState({ x: -999, y: -999 });
    const [active, setActive] = React.useState(false);

    const RADIUS = 80; // lens radius in px

    function handleMouseMove(e: React.MouseEvent) {
        if (!containerRef.current) return;
        const { left, top } = containerRef.current.getBoundingClientRect();
        setPos({ x: e.clientX - left, y: e.clientY - top });
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className="relative w-full h-[400px] bg-white overflow-hidden cursor-none select-none"
        >
            {/* LAYER 1: Background — faint, small text, always visible */}
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-6xl font-extralight text-zinc-200 tracking-tighter whitespace-nowrap">
                    ARCHITECTURAL_PRIMITIVES
                </p>
            </div>

            {/* LAYER 2: Magnified — large black text, same layout, clipped to lens circle + BLUR + WHITE BG */}
            <div
                className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-3xl transition-opacity duration-200"
                style={{
                    clipPath: active ? `circle(${RADIUS}px at ${pos.x}px ${pos.y}px)` : `circle(0px at ${pos.x}px ${pos.y}px)`,
                }}
            >
                <p className="text-7xl font-extralight text-black tracking-tighter whitespace-nowrap">
                    ARCHITECTURAL_PRIMITIVES
                </p>
            </div>

            {/* LAYER 3: Lens border ring */}
            {active && (
                <div
                    className="absolute rounded-full border border-zinc-700 pointer-events-none shadow-lg"
                    style={{
                        width: RADIUS * 2,
                        height: RADIUS * 2,
                        left: pos.x - RADIUS,
                        top: pos.y - RADIUS,
                    }}
                />
            )}
        </div>
    );
}

export default function ComponentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const data = COMPONENT_DATA[slug];
    const [copied, setCopied] = useState(false);

    if (!data) return <div>Component Not Found</div>;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(data.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 md:p-12 max-w-6xl mx-auto space-y-16">
            {/* Navigation Header */}
            <header className="space-y-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors"
                >
                    <FiArrowLeft /> Back to Library
                </button>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-rose-500">{data.category}</span>
                        <h1 className="text-5xl font-light tracking-tighter text-black">{data.title}</h1>
                        <p className="text-zinc-500 font-light max-w-xl leading-relaxed">{data.description}</p>
                    </div>
                    <div className="bg-zinc-50 border border-dashed border-zinc-200 p-4 space-y-2">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <FiTerminal /> Installation
                        </div>
                        <code className="text-xs text-black font-mono">{data.install}</code>
                    </div>
                </div>
            </header>

            {/* Preview Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-black">Live Preview</h3>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-zinc-200" />
                        <div className="w-2 h-2 rounded-full bg-zinc-200" />
                    </div>
                </div>
                <div className="w-full border border-dashed border-zinc-200 bg-zinc-50/30 overflow-hidden">
                    {data.preview()}
                </div>
            </section>

            {/* Code Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-black">Component Code</h3>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2 border border-dashed border-zinc-200 text-[10px] font-bold uppercase tracking-widest hover:border-black transition-all"
                    >
                        {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                        {copied ? "Copied" : "Copy to Clipboard"}
                    </button>
                </div>
                <div className="relative border border-dashed border-zinc-200 bg-zinc-50 custom-scrollbar max-h-[600px] overflow-auto">
                    <SyntaxHighlighter
                        language="typescript"
                        style={oneLight}
                        customStyle={{
                            margin: 0,
                            padding: '24px',
                            backgroundColor: 'transparent',
                            fontSize: '12px',
                            lineHeight: '1.6',
                        }}
                    >
                        {data.code}
                    </SyntaxHighlighter>
                </div>
            </section>

            {/* Technical Footer */}
            <footer className="pt-20 border-t border-dashed border-zinc-100 flex justify-between items-center opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-400">
                    V1.0.4 Registry Asset
                </div>
                <div className="flex gap-4">
                    <FiMonitor size={14} />
                    <FiCpu size={14} />
                    <FiLayers size={14} />
                </div>
            </footer>
        </div>
    );
}
