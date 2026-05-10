"use client"

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import React, { useRef, useState } from "react";

const text1 = ["S", "a", "h", "i", "l"];
const text2 = ["S", "h", "a", "r", "m", "a"];

const FullHeroContent = ({ isMagnified = false }: { isMagnified?: boolean }) => (
    <div className={`flex flex-col items-start ${isMagnified ? "scale-[1.5] origin-top-left" : ""}`}>
        <p className={`text-base px-4 mb-4 font-normal tracking-wide ${isMagnified ? "opacity-100" : "opacity-70"}`}>
            Hello there visitor! I am
        </p>

        <div className="flex">
            {text1.map((char, index) => (
                <motion.span
                    key={index}
                    initial={!isMagnified ? {
                        opacity: 0,
                        y: 50,
                        filter: "blur(10px)",
                    } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        delay: isMagnified ? 0 : index * 0.1,
                        duration: 0.2,
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </div>

        <div className="flex">
            {text2.map((char, index) => (
                <motion.span
                    key={index}
                    initial={!isMagnified ? {
                        opacity: 0,
                        y: 50,
                        filter: "blur(10px)",
                    } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    transition={{
                        delay: isMagnified ? 0 : index * 0.1,
                        duration: 0.2,
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </div>
    </div>
);

function HeroText() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth the movement of the lens
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });

    const magnification = 1.5;
    const lensSize = 250;

    // Calculate the position of the text inside the lens to create magnification effect
    const magnifiedX = useTransform(smoothX, (val) => -val * magnification + lensSize / 2);
    const magnifiedY = useTransform(smoothY, (val) => -val * magnification + lensSize / 2);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex flex-col items-start w-full px-6 md:px-5 text-[clamp(3.5rem,15vw,12rem)] font-extralight font-sans text-black leading-[0.9] select-none min-h-[60vh] justify-center cursor-none"
        >
            {/* Base Text Layer */}
            <div className="relative z-0">
                <FullHeroContent />
            </div>

            {/* Magnifier Lens Overlay */}
            <motion.div
                className="pointer-events-none absolute z-50 rounded-full border border-black/10 shadow-[0_0_50px_rgba(0,0,0,0.15)] overflow-hidden bg-white/50 backdrop-blur-3xl"
                style={{
                    width: lensSize,
                    height: lensSize,
                    left: smoothX,
                    top: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0,
                }}
            >
                {/* Glossy Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent z-20" />
                <div className="absolute inset-0 border-[4px] border-white/30 rounded-full z-20" />

                {/* Magnified Content */}
                <motion.div
                    className="absolute whitespace-nowrap z-10"
                    style={{
                        x: magnifiedX,
                        y: magnifiedY,
                    }}
                >
                    <FullHeroContent isMagnified />
                </motion.div>
            </motion.div>

        </div>
    )
}


export default React.memo(HeroText)
