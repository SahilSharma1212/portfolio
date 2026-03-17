"use client";

import { memo, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useThemeStore } from '@/store/themeStore';
import AnimatedBorder from './AnimatedBorder';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2,
        }
    }
};

const wordVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        }
    }
};

const splitWords = (text: string) =>
    text.split(" ").map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.2em]">
            <motion.span
                variants={wordVariants}
                className="inline-block"
            >
                {word}
            </motion.span>
        </span>
    ));

const TicTacToeGrid = memo(({ position, delay, theme }: { position: string, delay: number, theme: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 0.14, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay }}
        className={`absolute ${position} w-[180px] h-[180px] transform-gpu`}
    >
        <div className={`absolute left-1/4 top-0 h-full w-px transition-colors duration-700 ${theme === 'light' ? 'bg-black/50' : 'bg-linear-to-b from-transparent via-white/50 to-transparent'}`} />
        <div className={`absolute left-2/4 top-0 h-full w-px transition-colors duration-700 ${theme === 'light' ? 'bg-black/50' : 'bg-linear-to-b from-transparent via-white/50 to-transparent'}`} />
        <div className={`absolute left-3/4 top-0 h-full w-px transition-colors duration-700 ${theme === 'light' ? 'bg-black/50' : 'bg-linear-to-b from-transparent via-white/50 to-transparent'}`} />

        <div className={`absolute top-1/4 left-0 w-full h-px transition-colors duration-700 ${theme === 'light' ? 'bg-black/50' : 'bg-linear-to-r from-transparent via-white/50 to-transparent'}`} />
        <div className={`absolute top-2/4 left-0 w-full h-px transition-colors duration-700 ${theme === 'light' ? 'bg-black/50' : 'bg-linear-to-r from-transparent via-white/50 to-transparent'}`} />
        <div className={`absolute top-3/4 left-0 w-full h-px transition-colors duration-700 ${theme === 'light' ? 'bg-black/50' : 'bg-linear-to-r from-transparent via-white/50 to-transparent'}`} />

        <motion.div
            className={`absolute w-px h-14 bg-linear-to-b from-transparent via-${theme === 'light' ? 'black' : 'white'} to-transparent rounded-full shadow-xs shadow-${theme === 'light' ? 'black' : 'white'}/30`}
            style={{ left: "25%", top: "0%" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />

        <motion.div
            className={`absolute w-14 h-px bg-linear-to-r from-transparent via-${theme === 'light' ? 'black' : 'white'} to-transparent rounded-full shadow-xs shadow-${theme === 'light' ? 'black' : 'white'}/30`}
            style={{ left: "0%", top: "50%" }}
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "linear", delay: 1.2 }}
        />
    </motion.div>
));

TicTacToeGrid.displayName = "TicTacToeGrid";

function Landing() {
    const { theme } = useThemeStore();

    return (
        <div id="home" className={`min-h-screen w-screen flex items-center justify-center transition-all duration-700 ${theme === 'light'
            ? 'bg-linear-to-br from-white to-neutral-50 text-neutral-900'
            : 'bg-linear-to-br from-[#070707] to-[#030303] via-[#090909] text-white'
            } overflow-hidden p-4 sm:p-6 md:p-8 relative`}>
            
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 transition-opacity duration-700 ${theme === 'light' ? 'opacity-30' : 'opacity-100'} bg-[radial-gradient(circle_at_50%_0%,rgba(50,50,50,0.15)_0%,transparent_50%)]`} />
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-neutral-800/20 rounded-full blur-[120px]" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <motion.span
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.03, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`text-[20vw] md:text-[18vw] lg:text-[16vw] font-black uppercase tracking-[0.22em] leading-none transition-colors duration-700 transform-gpu ${theme === 'light' ? 'text-black/5' : 'text-white/5'}`}
                >
                    Portfolio
                </motion.span>
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <TicTacToeGrid position="top-[10%] right-[8%]" delay={0.5} theme={theme} />
                <TicTacToeGrid position="bottom-[10%] left-[8%]" delay={0.6} theme={theme} />
            </div>

            <div className="w-full max-w-5xl relative z-10 transform-gpu">
                <div className="flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-4">
                    {/* SAHIL BOX */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="relative px-6 py-4 sm:px-10 sm:py-5 md:px-14 md:py-7 -translate-x-1/4 md:-translate-x-1/3 backdrop-blur-3xl transform-gpu"
                    >
                        <motion.div
                            animate={{ "--border-progress": [0, 100] } as any}
                            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                            className="absolute inset-0 pointer-events-none"
                        >
                            <AnimatedBorder />
                        </motion.div>

                        <motion.span
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 0.7, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                            className="absolute -top-7 sm:-top-8 left-0 text-[10px] sm:text-sm md:text-sm tracking-widest text-neutral-500 font-mono font-light whitespace-nowrap"
                        >
                            FRONTEND DEV
                        </motion.span>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 0.7, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                            className="absolute bottom-16 sm:bottom-20 md:bottom-24 -right-[35%] sm:-right-[40%] md:-right-20"
                        >
                            <span className="text-[10px] sm:text-sm md:text-sm tracking-widest text-neutral-500 font-mono font-light inline-block -rotate-90 origin-center whitespace-nowrap">
                                FULLSTACK DEV
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight font-mono tracking-[-0.04em] select-none text-center leading-none overflow-hidden"
                        >
                            {splitWords("Sahil")}
                        </motion.h1>
                    </motion.div>

                    {/* SHARMA BOX */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                        className="relative px-6 py-4 sm:px-10 sm:py-5 md:px-14 md:py-7 translate-x-1/4 md:translate-x-1/3 backdrop-blur-3xl transform-gpu"
                    >
                        <motion.div
                            animate={{ "--border-progress": [0, 100] } as any}
                            transition={{ duration: 6, ease: "linear", repeat: Infinity, delay: 3 }}
                            className="absolute inset-0 pointer-events-none"
                        >
                            <AnimatedBorder />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 0.7, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                            className="absolute top-1/2 -left-[40%] sm:-left-[45%] md:-left-20 -translate-y-1/2"
                        >
                            <span className="text-[10px] sm:text-sm md:text-sm tracking-widest text-neutral-500 font-mono font-light inline-block -rotate-90 origin-center whitespace-nowrap">
                                BACKEND DEV
                            </span>
                        </motion.div>

                        <motion.span
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 0.7, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                            className="absolute -bottom-7 sm:-bottom-8 right-0 text-[10px] sm:text-sm md:text-sm tracking-widest text-neutral-500 font-mono font-light whitespace-nowrap"
                        >
                            DEVOPS ENTHUSIAST
                        </motion.span>

                        <motion.p
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight font-mono tracking-[-0.04em] select-none text-center leading-none overflow-hidden"
                        >
                            {splitWords("Sharma")}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default memo(Landing);