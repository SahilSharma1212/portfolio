"use client";

import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

function Landing() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sahilBoxRef = useRef<HTMLDivElement>(null);
    const sharmaBoxRef = useRef<HTMLDivElement>(null);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.2,
            }
        }
    };

    const charVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
            }
        }
    };

    const splitText = (text: string) =>
        text.split("").map((char, i) => (
            <motion.span 
                key={i} 
                variants={charVariants} 
                className="char inline-block"
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ));

    useEffect(() => {
        const tl = gsap.timeline();

        // border animations - pure logic for continuous movement
        if (sahilBoxRef.current) {
            tl.to(sahilBoxRef.current, {
                "--border-progress": 100,
                duration: 6,
                ease: "none",
                repeat: -1,
            });
        }
        if (sharmaBoxRef.current) {
            tl.to(sharmaBoxRef.current, {
                "--border-progress": 100,
                duration: 6,
                ease: "none",
                repeat: -1,
            }, "-=3");
        }
        return () => {
            tl.kill();
        };
    }, []);

    const borderStyles = {
        "--border-progress": 0,
    } as React.CSSProperties;

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-[#070707] to-[#030303] via-[#090909] text-white overflow-hidden p-4 sm:p-6 md:p-8 relative">
            {/* Background gradients */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(50,50,50,0.15)_0%,transparent_50%)]" />
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-neutral-800/20 rounded-full blur-[120px]" />
            </div>

            {/* Background "Portfolio" – faster fade/scale */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <motion.span
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 0.03, scale: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut",
                    }}
                    className="text-[20vw] md:text-[18vw] lg:text-[16vw] font-black uppercase tracking-[0.22em] text-white/50 leading-none"
                >
                    Portfolio
                </motion.span>
            </div>

            {/* Tic-tac-toe grids – faster entry */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Bigger grid – top right */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 0.14, scale: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
                    className="absolute top-[10%] right-[8%] w-[180px] h-[180px]"
                >
                    <div className="absolute left-1/4 top-0 h-full w-px bg-linear-to-b from-transparent via-white/30 to-transparent" />
                    <div className="absolute left-2/4 top-0 h-full w-px bg-linear-to-b from-transparent via-white/30 to-transparent" />
                    <div className="absolute left-3/4 top-0 h-full w-px bg-linear-to-b from-transparent via-white/30 to-transparent" />

                    <div className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
                    <div className="absolute top-2/4 left-0 w-full h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
                    <div className="absolute top-3/4 left-0 w-full h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

                    <motion.div
                        className="absolute w-px h-14 bg-linear-to-b from-transparent via-white to-transparent rounded-full shadow-xs shadow-white/10"
                        style={{ left: "25%", top: "0%" }}
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    />

                    <motion.div
                        className="absolute w-14 h-px bg-linear-to-r from-transparent via-white to-transparent rounded-full shadow-xs shadow-white/10"
                        style={{ left: "0%", top: "50%" }}
                        animate={{ left: ["0%", "100%"] }}
                        transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "linear", delay: 1.2 }}
                    />
                </motion.div>

                {/* Bigger grid – bottom left */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 0.14, scale: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
                    className="absolute bottom-[10%] left-[8%] w-[180px] h-[180px]"
                >
                    <div className="absolute left-1/4 top-0 h-full w-px bg-linear-to-b from-transparent via-white/30 to-transparent" />
                    <div className="absolute left-2/4 top-0 h-full w-px bg-linear-to-b from-transparent via-white/30 to-transparent" />
                    <div className="absolute left-3/4 top-0 h-full w-px bg-linear-to-b from-transparent via-white/30 to-transparent" />

                    <div className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
                    <div className="absolute top-2/4 left-0 w-full h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
                    <div className="absolute top-3/4 left-0 w-full h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

                    <motion.div
                        className="absolute w-px h-14 bg-linear-to-b from-transparent via-white to-transparent rounded-full shadow-xs shadow-white/10"
                        style={{ left: "75%", top: "0%" }}
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 8.5, repeat: Infinity, repeatType: "reverse", ease: "linear", delay: 2.4 }}
                    />

                    <motion.div
                        className="absolute w-14 h-px bg-linear-to-r from-transparent via-white to-transparent rounded-full shadow-xs shadow-white/10"
                        style={{ left: "0%", top: "25%" }}
                        animate={{ left: ["0%", "100%"] }}
                        transition={{ duration: 6.8, repeat: Infinity, repeatType: "reverse", ease: "linear", delay: 0.8 }}
                    />
                </motion.div>

                {/* Smaller grid – top right */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 0.12, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
                    className="absolute top-[10%] right-[8%] w-[160px] h-[160px]"
                >
                    <div className="absolute left-1/3 top-0 h-full w-px bg-white/20" />
                    <div className="absolute left-2/3 top-0 h-full w-px bg-white/20" />
                    <div className="absolute top-1/3 left-0 w-full h-px bg-white/20" />
                    <div className="absolute top-2/3 left-0 w-full h-px bg-white/20" />
                </motion.div>

                {/* Smaller grid – bottom left */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 0.12, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.9 }}
                    className="absolute bottom-[10%] left-[8%] w-[160px] h-[160px]"
                >
                    <div className="absolute left-1/3 top-0 h-full w-px bg-white/20" />
                    <div className="absolute left-2/3 top-0 h-full w-px bg-white/20" />
                    <div className="absolute top-1/3 left-0 w-full h-px bg-white/20" />
                    <div className="absolute top-2/3 left-0 w-full h-px bg-white/20" />
                </motion.div>
            </div>

            {/* Main content */}
            <div ref={containerRef} className="w-full max-w-5xl relative z-10">
                <div className="flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-4">
                    {/* SAHIL BOX */}
                    <motion.div
                        ref={sahilBoxRef}
                        className="relative px-6 py-4 sm:px-10 sm:py-5 md:px-14 md:py-7 -translate-x-1/4 md:-translate-x-1/3 backdrop-blur-3xl"
                        style={borderStyles}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    >
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

                        <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                            <div
                                className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-500 to-transparent"
                                style={{
                                    backgroundSize: "400% 100%",
                                    backgroundPosition: "calc(var(--border-progress) * -1%) 0",
                                    maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                                }}
                            />
                            <div
                                className="absolute top-0 right-0 bottom-0 w-px bg-linear-to-b from-transparent via-gray-500 to-transparent"
                                style={{
                                    backgroundSize: "100% 400%",
                                    backgroundPosition: "0 calc(var(--border-progress) * -1%)",
                                    maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                                }}
                            />
                            <div
                                className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-500 to-transparent"
                                style={{
                                    backgroundSize: "400% 100%",
                                    backgroundPosition: "calc(var(--border-progress) * 1%) 0",
                                    maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                                }}
                            />
                            <div
                                className="absolute top-0 left-0 bottom-0 w-px bg-linear-to-b from-transparent via-gray-500 to-transparent"
                                style={{
                                    backgroundSize: "100% 400%",
                                    backgroundPosition: "0 calc(var(--border-progress) * 1%)",
                                    maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                                }}
                            />
                        </div>

                        <motion.h1
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight font-mono tracking-[-0.04em] select-none text-center leading-none overflow-hidden"
                        >
                            {splitText("Sahil")}
                        </motion.h1>
                    </motion.div>

                    {/* SHARMA BOX */}
                    <motion.div
                        ref={sharmaBoxRef}
                        className="relative px-6 py-4 sm:px-10 sm:py-5 md:px-14 md:py-7 translate-x-1/4 md:translate-x-1/3 backdrop-blur-3xl"
                        style={borderStyles}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                    >
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

                        <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                            <div
                                className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-500 to-transparent"
                                style={{
                                    backgroundSize: "400% 100%",
                                    backgroundPosition: "calc(var(--border-progress) * -1%) 0",
                                    maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                                }}
                            />
                            <div
                                className="absolute top-0 right-0 bottom-0 w-px bg-linear-to-b from-transparent via-gray-500 to-transparent"
                                style={{
                                    backgroundSize: "100% 400%",
                                    backgroundPosition: "0 calc(var(--border-progress) * -1%)",
                                    maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                                }}
                            />
                            <div
                                className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-500 to-transparent"
                                style={{
                                    backgroundSize: "400% 100%",
                                    backgroundPosition: "calc(var(--border-progress) * 1%) 0",
                                    maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                                }}
                            />
                            <div
                                className="absolute top-0 left-0 bottom-0 w-px bg-linear-to-b from-transparent via-gray-500 to-transparent"
                                style={{
                                    backgroundSize: "100% 400%",
                                    backgroundPosition: "0 calc(var(--border-progress) * 1%)",
                                    maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                                }}
                            />
                        </div>

                        <motion.p
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight font-mono tracking-[-0.04em] select-none text-center leading-none overflow-hidden"
                        >
                            {splitText("Sharma")}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </div >
    );
}

export default memo(Landing)