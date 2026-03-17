'use client'

import Link from "next/link";
import { memo, useState } from "react";
import { useThemeStore } from "@/store/themeStore";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileAlt, FaSun, FaMoon, FaBars, FaRobot } from "react-icons/fa";
import { LuLibrary } from "react-icons/lu";
import { BiBlock } from "react-icons/bi";
import { TbComponents } from "react-icons/tb";

const sections = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact Us', id: 'contact' },
];

function NavbarComponent() {
    const { theme, setTheme } = useThemeStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/Sahil_Sharma_Fullstack_Resume.pdf';
        link.download = 'Sahil_Sharma_Resume.pdf';
        link.click();
    };

    const buttonClass = `p-3 rounded-full transition-all duration-300 shadow-xl backdrop-blur-md border ${theme === 'dark'
        ? 'bg-black/50 text-white border-neutral-800 hover:bg-white/10'
        : 'bg-white/50 text-black border-neutral-200 hover:bg-black/5'
        }`;

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
            <div className="flex items-center gap-4">
                {/* 1. Theme Button */}
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={buttonClass}
                    title="Toggle Theme"
                >
                    {theme === 'light' ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>



                {/* 2. Sections Button */}
                <div className="relative group">
                    <button
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={buttonClass}
                        title="Sections"
                    >
                        <FaBars size={20} />
                    </button>


                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                onMouseLeave={() => setIsMenuOpen(false)}
                                className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 p-2  border backdrop-blur-2xl shadow-2xl min-w-[160px] ${theme === 'dark'
                                    ? 'bg-black/80 border-neutral-800'
                                    : 'bg-white/80 border-neutral-200'
                                    }`}
                            >
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => handleScroll(section.id)}
                                        className={`w-full text-left px-4 py-3  text-sm font-mono tracking-widest uppercase transition-colors ${theme === 'dark'
                                            ? 'hover:bg-white/10 text-neutral-400 hover:text-white'
                                            : 'hover:bg-black/5 text-neutral-600 hover:text-black'
                                            }`}
                                    >
                                        {section.name}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 3. Resume Button */}
                <button
                    onClick={handleDownloadResume}
                    className={buttonClass}
                    title="Download Resume"
                >
                    <FaFileAlt size={20} />
                </button>
                {/* 4. Chatbot Button */}
                <Link href="/chatbot" className={buttonClass} title="Chatbot" style={{ borderRadius: 4 }}>
                    <FaRobot size={20} />
                </Link>

                {/* 5. Components Button */}
                <Link href="/components" className={buttonClass} title="Components Showcase" style={{ borderRadius: 4 }}>
                    <span className="max-sm:hidden">Components</span>
                    <TbComponents className="sm:hidden" />
                </Link>


            </div>
        </nav>
    );
}

export default memo(NavbarComponent);

