'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, PanInfo } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import { Code, PenTool, Brain, Lightbulb, Users, Cpu, Rocket, Sparkles } from 'lucide-react'

const items = [
    { title: "Full-Stack", icon: Code, color: "#3B82F6" },
    { title: "Design", icon: PenTool, color: "#EC4899" },
    { title: "Intelligence", icon: Brain, color: "#10B981" },
    { title: "Ideation", icon: Lightbulb, color: "#F59E0B" },
    { title: "Cloud", icon: Cpu, color: "#6366F1" },
    { title: "Launch", icon: Rocket, color: "#EF4444" },
    { title: "Vision", icon: Sparkles, color: "#8B5CF6" },
];

const RADIUS = 280; // Radius of the wheel

export default function InfinityWheel() {
    const { theme } = useThemeStore();
    const [rotation, setRotation] = useState(0);
    const rotateValue = useMotionValue(0);
    const smoothRotate = useSpring(rotateValue, { damping: 20, stiffness: 100 });

    const handleDrag = (_: any, info: PanInfo) => {
        // Map horizontal drag to rotation
        rotateValue.set(rotateValue.get() + info.delta.x * 0.5);
    };

    return (
        <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden perspective-1000">
            <motion.div 
                drag="x"
                onDrag={handleDrag}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                style={{ transformStyle: "preserve-3d" }}
            >
                {items.map((item, index) => {
                    const angle = (index / items.length) * 360;
                    
                    return (
                        <WheelItem 
                            key={index} 
                            item={item} 
                            angle={angle} 
                            rotation={smoothRotate} 
                            theme={theme}
                        />
                    );
                })}
            </motion.div>

            {/* Hint Overlay */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none">
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-500 animate-pulse">
                    Drag horizontally to orbit
                </p>
            </div>
        </div>
    )
}

function WheelItem({ item, angle, rotation, theme }: any) {
    // Current total angle including the wheel rotation
    const totalAngle = useTransform(rotation, (r) => (angle + r) % 360);
    
    // Calculate 3D position (X, Z) on a circle
    const x = useTransform(totalAngle, (a) => Math.sin((a * Math.PI) / 180) * RADIUS);
    const z = useTransform(totalAngle, (a) => Math.cos((a * Math.PI) / 180) * RADIUS);
    
    // Opacity based on distance (Z value)
    // When Z is positive (closer), it's more opaque. When Z is negative (further), it's more transparent.
    const opacity = useTransform(z, [-RADIUS, 0, RADIUS], [0.1, 0.4, 1]);
    
    // Scale based on distance
    const scale = useTransform(z, [-RADIUS, RADIUS], [0.6, 1.1]);

    // Blur based on distance
    const blurValue = useTransform(z, [-RADIUS, 0, RADIUS], [8, 2, 0]);
    const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

    return (
        <motion.div
            style={{
                position: "absolute",
                x,
                z,
                opacity,
                scale,
                filter,
                transformStyle: "preserve-3d",
            }}
            className={`w-40 h-52 flex flex-col items-center justify-center border p-6 text-center select-none
                ${theme === 'light' 
                    ? 'bg-white border-gray-200 text-black shadow-lg' 
                    : 'bg-black/80 border-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}
        >
            <item.icon className="w-10 h-10 mb-6 transition-transform group-hover:scale-110" strokeWidth={1} style={{ color: theme === 'dark' ? item.color : 'inherit' }} />
            <span className="text-xs font-mono uppercase tracking-widest leading-tight">
                {item.title}
            </span>
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-8 transition-all ${theme === 'light' ? 'bg-black' : 'bg-white/40'}`} style={{ backgroundColor: theme === 'dark' ? item.color : undefined }} />
        </motion.div>
    )
}
