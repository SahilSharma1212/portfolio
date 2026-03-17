'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import AnimatedBorder from './AnimatedBorder'
import gsap from 'gsap'

// --- 1. Slot Machine Button ---
const SlotMachineButton = ({ text = "Explore More", hoverText = "Click Me!" }) => {
    const { theme } = useThemeStore();
    return (
        <button className={`relative h-12 w-48 overflow-hidden border group cursor-pointer ${theme === 'light' ? 'border-black text-black' : 'border-white/20 text-white'}`}>
            <motion.div
                className="flex flex-col flex-1 h-full w-full"
                whileHover={{ y: "-100%" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
                <div className="h-full min-h-[48px] flex items-center justify-center font-mono text-xs uppercase tracking-[0.2em]">
                    {text}
                </div>
                <div className={`h-full min-h-[48px] flex items-center justify-center font-mono text-xs uppercase tracking-[0.2em] ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    {hoverText}
                </div>
            </motion.div>
        </button>
    )
}

// --- 2. Magnetic Button ---
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useThemeStore();
    const ref = useRef<HTMLButtonElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.4);
        mouseY.set((e.clientY - centerY) * 0.4);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.button
            ref={ref}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`px-8 py-3 font-mono text-xs uppercase tracking-widest border transition-colors relative z-10 cursor-pointer
                ${theme === 'light' ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white/20 text-white hover:bg-white hover:text-black'}`}
        >
            {children}
        </motion.button>
    )
}

// --- 3. Neon Glow Button ---
const NeonButton = ({ text = "Activate" }) => {
    const { theme } = useThemeStore();
    const borderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (borderRef.current) {
            gsap.to(borderRef.current, {
                "--border-progress": 100,
                duration: 4,
                ease: "none",
                repeat: -1,
            });
        }
    }, []);

    return (
        <div ref={borderRef} style={{ "--border-progress": 0 } as any} className="relative p-0.5 group overflow-hidden cursor-pointer">
            <AnimatedBorder />
            <button className={`relative px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-all
                ${theme === 'light' ? 'bg-white text-black group-hover:bg-black group-hover:text-white' : 'bg-black/80 text-white group-hover:bg-white group-hover:text-black'}`}>
                {text}
            </button>
        </div >
    )
}

// --- 4. Liquid Fill Button ---
const LiquidFillButton = ({ text = "Surface" }) => {
    const { theme } = useThemeStore();
    return (
        <button className={`relative px-10 py-4 font-mono text-xs uppercase tracking-widest overflow-hidden border transition-colors group cursor-pointer
            ${theme === 'light' ? 'border-black text-black hover:text-white' : 'border-white/20 text-white hover:text-black'}`}>
            <span className="relative z-10">{text}</span>
            <motion.div
                initial={{ y: "100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className={`absolute inset-0 z-0 ${theme === 'light' ? 'bg-black' : 'bg-white'}`}
            />
        </button>
    )
}

// --- 5. Glass Morph Button ---
const GlassButton = ({ text = "Identity" }) => {
    const { theme } = useThemeStore();
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 py-4 backdrop-blur-md border font-mono text-xs uppercase tracking-[0.3em] transition-all cursor-pointer
                ${theme === 'light' 
                    ? 'bg-white/20 border-black/10 text-black hover:bg-white/40' 
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30'}`}
        >
            {text}
        </motion.button>
    )
}

export default function ButtonShowcase() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center justify-items-center w-full max-w-4xl py-10">
            <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em]">Slot Machine</span>
                <SlotMachineButton />
            </div>
            <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em]">Magnetic</span>
                <MagneticButton>Pull Force</MagneticButton>
            </div>
            <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em]">Neon Glow</span>
                <NeonButton />
            </div>
            <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em]">Liquid Fill</span>
                <LiquidFillButton />
            </div>
            <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em]">Glass Morph</span>
                <GlassButton />
            </div>
        </div>
    )
}
