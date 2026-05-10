"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBox, FiZap, FiLayers, FiCode, FiTerminal, FiChevronRight } from "react-icons/fi";

const sidebarItems = [
    { 
        title: "Slot Machine", 
        href: "/components/slot-machine",
        category: "Animation"
    },
    { 
        title: "Blueprint Grid", 
        href: "/components/blueprint-grid",
        category: "Layout"
    },
    { 
        title: "Hover Accordion", 
        href: "/components/hoverable-accordion",
        category: "Interactive"
    },
    { 
        title: "Glass Lens", 
        href: "/components/glass-lens",
        category: "Effect"
    }
];

export default function ComponentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // If we are on the main components page, we don't show the sidebar (optional)
    // But user wants a sidebar + components on the right for individual pages.
    // For the main /components page, we can keep the grid view or just use the layout.
    
    const isRoot = pathname === "/components";

    if (isRoot) return <>{children}</>;

    return (
        <div className="flex min-h-screen bg-white pt-16">
            {/* Sidebar */}
            <aside className="w-64 border-r border-dashed border-zinc-200 hidden md:flex flex-col p-8 sticky top-16 h-[calc(100vh-64px)]">
                <div className="mb-10">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">Asset Registry</h3>
                    <nav className="space-y-2">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between p-3 border border-dashed transition-all group ${
                                    pathname === item.href 
                                    ? "bg-zinc-50 border-black text-black" 
                                    : "border-transparent text-zinc-500 hover:border-zinc-200 hover:text-black"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold uppercase tracking-widest">{item.title}</span>
                                </div>
                                <FiChevronRight size={12} className={`transition-transform ${pathname === item.href ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto pt-8 border-t border-dashed border-zinc-100">
                    <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-zinc-300">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        System Online
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {children}
            </main>
        </div>
    );
}
