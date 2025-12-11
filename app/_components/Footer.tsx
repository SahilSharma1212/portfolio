'use client'; 
// Use 'use client' because Framer Motion requires client-side execution

import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, Mail, Heart } from 'lucide-react';
import { FaReact } from 'react-icons/fa6'; // Using Fa6 for modern icons
import { CgVercel } from 'react-icons/cg';
// --- Utilities (defined in the next section) ---
const utilityLinks = [
    { icon: GithubIcon, href: 'https://github', label: 'GitHub Profile' },
    { icon: CgVercel, href: 'YOUR_VERCEL_DEPLOYMENT_URL', label: 'Vercel Deployment' },
    { icon: Mail, href: '/api/contact', label: 'Contact via Resend Email' }, // Link to your Resend API route
];

// --- Footer Component ---
export default function Footer() {
    return (
        <motion.footer
            className="bg-[#111] text-gray-400 py-10 sm:py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                {/* --- Social/Utility Links --- */}
                <div className="flex justify-center space-x-6 mb-6">
                    {utilityLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                            aria-label={link.label}
                        >
                            {/* Framer Motion for icon hover scale */}
                            <motion.span
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <link.icon className="h-6 w-6" />
                            </motion.span>
                        </a>
                    ))}
                </div>

                {/* --- Technology Stack Badges --- */}
                <div className="mb-6 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
                    <p>Built with:</p>
                    <span className="flex items-center space-x-1">
                        <FaReact className="h-4 w-4 text-sky-400" />
                        <span className="font-semibold text-white">React & Next.js</span>
                    </span>
                    <span className="text-gray-500">|</span>
                    <span className="font-mono text-green-400">Tailwind CSS</span>
                    <span className="text-gray-500">|</span>
                    <span className="font-mono text-purple-400">Framer Motion</span>
                    <span className="text-gray-500">|</span>
                    <span className="flex items-center space-x-1">
                        <Mail className="h-4 w-4 text-red-500" />
                        <span>Resend Email</span>
                    </span>
                </div>

                {/* --- Copyright and Creator --- */}
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
                </p>
                <p className="mt-2 text-xs text-gray-600 flex justify-center items-center">
                    Made with <Heart className="h-3 w-3 text-red-500 mx-1" /> and a lot of caffeine.
                </p>
            </div>
        </motion.footer>
    );
}