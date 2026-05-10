"use client"

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { FiArrowLeft, FiActivity } from "react-icons/fi";
import { CornerLines, BoxBorders } from "@/app/_components/Blueprint";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
            
            {/* Background Blueprint Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="max-w-xl w-full relative p-[1px]">
                <CornerLines />
                <BoxBorders />
                
                <div className="relative z-10 bg-white p-12 md:p-20 flex flex-col items-center text-center space-y-8 shadow-2xl">
                    
                    {/* Animated Glitch 404 */}
                    <div className="relative">
                        <motion.h1 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-9xl font-light tracking-tighter text-black relative z-10"
                        >
                            404
                        </motion.h1>
                        <motion.div 
                            animate={{ 
                                x: [-2, 2, -2], 
                                opacity: [0, 0.5, 0] 
                            }} 
                            transition={{ repeat: Infinity, duration: 0.1 }}
                            className="absolute inset-0 text-9xl font-light tracking-tighter text-rose-500 z-0 translate-x-1"
                        >
                            404
                        </motion.div>
                        <motion.div 
                            animate={{ 
                                x: [2, -2, 2], 
                                opacity: [0, 0.3, 0] 
                            }} 
                            transition={{ repeat: Infinity, duration: 0.15 }}
                            className="absolute inset-0 text-9xl font-light tracking-tighter text-blue-500 z-0 -translate-x-1"
                        >
                            404
                        </motion.div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.5em] text-rose-500">
                            <FiActivity className="animate-pulse" /> Signal Terminated
                        </div>
                        <h2 className="text-xl font-normal text-black uppercase tracking-widest">
                            Route Not Found
                        </h2>
                        <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-xs mx-auto">
                            The requested architectural coordinate does not exist within the current registry instance.
                        </p>
                    </div>

                    <div className="pt-8">
                        <Link 
                            href="/" 
                            className="group flex items-center gap-4 px-8 py-4 border border-dashed border-zinc-200 hover:border-black transition-all duration-500"
                        >
                            <FiArrowLeft className="group-hover:-translate-x-2 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-black">
                                Return to Origin
                            </span>
                        </Link>
                    </div>

                    <div className="pt-12 text-[9px] uppercase tracking-[0.4em] font-bold text-zinc-300">
                        Registry Error Code: 0xNULL_V1
                    </div>
                </div>
            </div>

            {/* Subtle floating lines */}
            <motion.div 
                animate={{ y: [-20, 20], opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute left-[10%] top-0 w-[1px] h-full bg-zinc-100 hidden md:block"
            />
            <motion.div 
                animate={{ y: [20, -20], opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute right-[10%] top-0 w-[1px] h-full bg-zinc-100 hidden md:block"
            />
        </div>
    );
}
