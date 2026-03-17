'use client'
import { Mail, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useThemeStore } from '@/store/themeStore';
import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedBorder from './AnimatedBorder';

function Contacts() {
    const { theme } = useThemeStore();
    const borderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (borderRef.current) {
            gsap.to(borderRef.current, {
                "--border-progress": 100,
                duration: 6,
                ease: "none",
                repeat: -1,
            });
        }
    }, []);

    const borderStyles = {
        "--border-progress": 0,
    } as React.CSSProperties;

    return (
        <div id="contact" className={`min-h-screen w-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 lg:p-20 relative overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-linear-to-br from-[#070707] to-[#030303] via-[#090909]'}`}>
            {/* Background "CONTACT" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <motion.span
                    initial={{ opacity: 0, scale: 1.04 }}
                    whileInView={{ opacity: theme === 'light' ? 0.05 : 0.03, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`text-[20vw] md:text-[18vw] lg:text-[16vw] font-black uppercase tracking-widest leading-none whitespace-nowrap ${theme === 'light' ? 'text-black' : 'text-white/50'}`}
                >
                    CONTACT
                </motion.span>
            </div>

            <div className="relative z-10 w-full mb-12 sm:mb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight font-mono tracking-tighter ${theme === 'light' ? 'text-black' : 'text-white'}`}
                >
                    Let&apos;s Connect
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-sm sm:text-base text-gray-400 mt-4 max-w-xl mx-auto"
                >
                    Want to collaborate, hire, or just talk tech? Drop a message.
                </motion.p>
            </div>

            <motion.div
                ref={borderRef}
                style={borderStyles}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative w-full max-w-2xl p-6 sm:p-10 backdrop-blur-3xl overflow-hidden ${theme === 'light' ? 'bg-white/80 border border-gray-200' : 'bg-black/40'}`}
            >
                {theme !== 'light' && <AnimatedBorder />}

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const email = (form.email as HTMLInputElement).value;
                        const message = (form.message as HTMLTextAreaElement).value;

                        if (!email || !message) {
                            toast.error('Please fill all fields');
                            return;
                        }

                        try {
                            const res = await fetch('/api/send', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ emailId: email, message }),
                            });

                            const data = await res.json();
                            if (res.ok && data.success) {
                                toast.success('Message sent successfully');
                                form.reset();
                            } else {
                                toast.error(data.error || 'Failed to send message');
                            }
                        } catch {
                            toast.error('Something went wrong');
                        }
                    }}
                    className="flex flex-col gap-6 relative z-10"
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-mono">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className={`p-4 text-sm outline-none transition-all duration-300 border
                                ${theme === 'light'
                                    ? 'bg-gray-50 border-gray-200 text-black focus:border-black'
                                    : 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-white/30'
                                }`}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-mono">Message</label>
                        <textarea
                            name="message"
                            rows={5}
                            placeholder="Let's build something cool..."
                            className={`p-4 text-sm outline-none transition-all duration-300 resize-none border
                                ${theme === 'light'
                                    ? 'bg-gray-50 border-gray-200 text-black focus:border-black'
                                    : 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-white/30'
                                }`}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] font-bold py-4 transition-all duration-300 group
                            ${theme === 'light'
                                ? 'bg-black text-white hover:bg-neutral-800'
                                : 'bg-white text-black hover:bg-neutral-200'
                            }`}
                    >
                        <Send size={16} strokeWidth={2} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Message
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 font-mono">
                    <div
                        className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors cursor-pointer group"
                        onClick={() => window.open('mailto:sahilbhaisharma1212@gmail.com', '_blank')}
                    >
                        <div className={`p-2 border transition-colors ${theme === 'light' ? 'border-gray-200 bg-gray-50 group-hover:border-black text-black' : 'border-white/10 bg-white/5 group-hover:border-white text-white'}`}>
                            <Mail size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs sm:text-sm">sahilbhaisharma1212@gmail.com</span>
                    </div>

                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                        Available for freelance & full-time roles
                    </p>
                </div>
            </motion.div>

            <Toaster toastOptions={{
                style: {
                    backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
                    color: theme === 'light' ? '#000000' : '#ffffff',
                    border: theme === 'light' ? "1px solid #00000030" : "1px solid #ffffff30",
                    borderRadius: "0px",
                    padding: "16px",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    fontWeight: "600",
                    textTransform: "uppercase"
                }
            }} />
        </div>
    );
}

export default memo(Contacts);