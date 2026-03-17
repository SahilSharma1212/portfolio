'use client'
import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import { ChevronLeft } from 'lucide-react'
import AnimatedBorder from '../_components/AnimatedBorder'
import gsap from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const componentsList = [
    {
        id: 'infinity-wheel',
        title: '3D Infinity Wheel',
        href: '/components/infinity-wheel',
    },
    {
        id: 'buttons',
        title: 'Premium Buttons',
        href: '/components/buttons',
    },
]

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
    const { theme } = useThemeStore()
    const pathname = usePathname()
    const borderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (borderRef.current) {
            gsap.to(borderRef.current, {
                "--border-progress": 100,
                duration: 6,
                ease: "none",
                repeat: -1,
            });
        }
    }, [])

    const borderStyles = {
        "--border-progress": 0,
    } as React.CSSProperties;

    // Don't show the full layout on the index page if we want just a list there, 
    // or keep it consistent. The user said "layout containing the list... and respective component would have its own route".

    return (
        <div className={`min-h-screen w-screen flex flex-col items-center p-4 sm:p-6 md:p-12 lg:p-20 relative overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-linear-to-br from-[#070707] to-[#030303] via-[#090909]'}`}>
            {/* Background "LIBRARY" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <motion.span
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: theme === 'light' ? 0.05 : 0.03, scale: 1 }}
                    className={`text-[20vw] md:text-[18vw] lg:text-[16vw] font-black uppercase tracking-widest leading-none whitespace-nowrap ${theme === 'light' ? 'text-black' : 'text-white/50'}`}
                >
                    LIBRARY
                </motion.span>
            </div>

            <div className="relative z-10 w-full mb-12 sm:mb-10">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 font-mono text-xs uppercase tracking-widest">
                    <ChevronLeft size={14} /> Back to Portfolio
                </Link>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight font-mono tracking-tighter ${theme === 'light' ? 'text-black' : 'text-white'}`}
                >
                    Components
                </motion.h1>
            </div>

            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 h-full max-w-8xl mx-auto flex-1">
                {/* Sidebar */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-2">Library Index</h2>
                    {componentsList.map((comp) => (
                        <Link
                            key={comp.id}
                            href={comp.href}
                            className={`p-4 border text-left transition-all duration-300 font-mono text-sm relative group
                                ${pathname === comp.href
                                    ? (theme === 'light' ? 'bg-black text-white border-black' : 'bg-white/10 border-white/30 text-white')
                                    : (theme === 'light' ? 'bg-white text-gray-400 border-gray-100 hover:border-gray-300' : 'bg-transparent border-white/5 text-gray-500 hover:border-white/20')
                                }`}
                        >
                            {comp.title}
                        </Link>
                    ))}
                </div>

                {/* Main Content Area */}
                <motion.div
                    ref={borderRef}
                    style={borderStyles}
                    className={`relative min-h-[600px] backdrop-blur-3xl overflow-hidden flex flex-col ${theme === 'light' ? 'bg-white/80 border border-gray-100 shadow-xl' : 'bg-black/40'}`}
                >
                    {theme !== 'light' && <AnimatedBorder />}
                    {children}
                </motion.div>
            </div>
        </div>
    )
}
