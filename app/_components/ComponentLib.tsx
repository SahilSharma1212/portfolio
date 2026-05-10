"use client"

import React from "react";
import { motion } from "motion/react";
import { CornerLines, BoxBorders } from "./Blueprint";
import { FiBox, FiLayers, FiCode, FiActivity } from "react-icons/fi";

const componentsList = [
    { 
        title: "Slot Machine", 
        category: "Animation", 
        desc: "3-layer vertical ticker with high-performance Framer Motion logic.",
        preview: "SLOT_UI"
    },
    { 
        title: "Blueprint Grid", 
        category: "Layout", 
        desc: "Dashed-border system with extending corner lines and radial masking.",
        preview: "GRID_UI"
    },
    { 
        title: "Neural Terminal", 
        category: "Interactive", 
        desc: "Monochromatic shell interface for LLM interaction and streaming text.",
        preview: "TERM_UI"
    },
    { 
        title: "Glass Lens", 
        category: "Effect", 
        desc: "Interactive magnification lens with backdrop blur and cursor tracking.",
        preview: "LENS_UI"
    }
];

export default function ComponentLib() {
    return (
        <section id="components" className="min-h-screen w-full flex flex-col items-center justify-center bg-white py-24 font-sans">
            <div className="max-w-7xl w-full px-6 md:px-12 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div className="space-y-4">
                        <h2 className="text-5xl font-light tracking-tighter text-black">
                            Architectural Elements
                        </h2>
                        <p className="text-lg text-slate-500 font-light max-w-xl">
                            A curated library of <span className="text-black font-normal">reusable UI primitives</span> built with performance and minimalist aesthetics in mind.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-zinc-400 border border-dashed border-zinc-200 p-4">
                        <span className="flex items-center gap-2"><FiLayers /> V1.0.4</span>
                        <span className="flex items-center gap-2"><FiCode /> React/TS</span>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-7xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {componentsList.map((comp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="relative group p-[1px]"
                    >
                        <CornerLines />
                        <BoxBorders />
                        
                        <div className="relative z-10 bg-white h-full flex flex-col group-hover:bg-zinc-50 transition-colors duration-500">
                            {/* Preview Area */}
                            <div className="h-40 border-b border-dashed border-zinc-200 flex items-center justify-center bg-zinc-50/50 group-hover:bg-white transition-colors duration-500 overflow-hidden relative">
                                <div className="absolute inset-0 opacity-10 [background-size:10px_10px] bg-[radial-gradient(#000_1px,transparent_1px)]" />
                                {renderPreview(comp.preview)}
                            </div>

                            {/* Info Area */}
                            <div className="p-6 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-100 px-2 py-1">
                                        {comp.category}
                                    </span>
                                    <FiBox className="text-zinc-300 group-hover:text-black transition-colors" size={16} />
                                </div>
                                <h3 className="text-lg font-normal text-black">{comp.title}</h3>
                                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                                    {comp.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-20 flex flex-col items-center gap-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold">More arriving in v1.1</p>
                <div className="w-12 h-[1px] bg-zinc-200" />
            </div>
        </section>
    );
}

function renderPreview(type: string) {
    switch (type) {
        case "SLOT_UI":
            return (
                <div className="flex flex-col gap-1 items-center">
                    <div className="w-12 h-4 border border-dashed border-zinc-300 opacity-30" />
                    <div className="w-12 h-4 border border-zinc-900 flex items-center justify-center text-[8px] font-bold">NODE</div>
                    <div className="w-12 h-4 border border-dashed border-zinc-300 opacity-30" />
                </div>
            );
        case "GRID_UI":
            return (
                <div className="w-20 h-20 grid grid-cols-2 grid-rows-2 border border-dashed border-zinc-300 scale-75">
                    <div className="border-r border-b border-dashed border-zinc-200" />
                    <div className="border-b border-dashed border-zinc-200" />
                    <div className="border-r border-dashed border-zinc-200" />
                    <div />
                </div>
            );
        case "TERM_UI":
            return (
                <div className="w-24 h-16 border border-zinc-900 bg-zinc-900 p-2 flex flex-col gap-1">
                    <div className="w-full h-1 bg-zinc-700" />
                    <div className="w-1/2 h-1 bg-zinc-700" />
                    <div className="w-3/4 h-1 bg-zinc-700" />
                </div>
            );
        case "LENS_UI":
            return (
                <div className="relative">
                    <span className="text-zinc-300 text-xs font-bold">SAHIL</span>
                    <div className="absolute -inset-2 border border-zinc-900 rounded-full scale-110 flex items-center justify-center overflow-hidden">
                         <span className="text-zinc-900 text-xs font-bold scale-125">SAHIL</span>
                    </div>
                </div>
            );
        default:
            return <FiBox size={30} className="text-zinc-200" />;
    }
}
