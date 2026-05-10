"use client"

import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function MainAppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
            {/* Minimal Header */}
            <header className="fixed top-0 left-0 w-full z-50 border-b border-dashed border-zinc-200 bg-white/80 backdrop-blur-md h-16 flex items-center px-6 md:px-12 justify-between">
                <Link href="/" className="group flex items-center gap-3">
                    <div className="w-10 h-10 border border-dashed border-zinc-300 flex items-center justify-center group-hover:bg-[#635a5b] group-hover:text-white transition-all duration-500">
                        <FiArrowLeft size={18} className="text-[#635a5b] group-hover:text-white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-[#635a5b] transition-colors">
                        Return to Matrix
                    </span>
                </Link>
            </header>

            <main className="pt-16">
                {children}
            </main>
        </div>
    );
}
