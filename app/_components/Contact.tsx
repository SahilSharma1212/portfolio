"use client"

import React from "react";
import { motion } from "motion/react";
import { CornerLines, BoxBorders } from "./Blueprint";
import { FiSend, FiMapPin } from "react-icons/fi";

export default function Contact() {
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, message }),
            });

            if (res.ok) {
                setStatus("success");
                setEmail("");
                setMessage("");
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="min-h-screen w-full flex items-center justify-center bg-white py-24 font-sans">
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-stretch px-6 md:px-12">

                {/* LEFT: INFO */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-between py-4"
                >
                    <div className="space-y-6">
                        <h2 className="text-5xl font-light tracking-tighter text-black">
                            Connect with me
                        </h2>
                        <p className="text-xl text-slate-500 font-light leading-relaxed max-w-sm">
                            Have a project in mind or just want to say hi? <br />
                            My system is always listening.
                        </p>
                    </div>

                    <div className="space-y-8 mt-12">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 border border-dashed border-zinc-200 flex items-center justify-center text-black">
                                <FiMapPin size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Location</p>
                                <p className="text-sm text-zinc-800">Bhilai, Chhattisgarh <br /> India</p>
                            </div>
                        </div>
                    </div>

                </motion.div>

                {/* RIGHT: FORM */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group p-[1px]"
                >
                    <CornerLines />
                    <BoxBorders />

                    <form 
                        onSubmit={handleSubmit}
                        className="relative z-10 bg-zinc-50/50 backdrop-blur-[2px] p-8 md:p-12 space-y-8 h-full flex flex-col"
                    >
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Email Address</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full bg-white border border-dashed border-zinc-300 p-4 outline-none focus:border-black transition-colors font-light text-zinc-800"
                            />
                        </div>

                        <div className="space-y-2 flex-1 flex flex-col">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Message</label>
                            <textarea
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="State your objective..."
                                className="w-full bg-white border border-dashed border-zinc-300 p-4 outline-none focus:border-black transition-colors font-light text-zinc-800 flex-1 resize-none"
                            />
                        </div>

                        <button
                            disabled={status === "loading"}
                            type="submit"
                            className="group w-full py-4 bg-black text-white flex items-center justify-center gap-3 hover:bg-zinc-900 transition-colors disabled:bg-zinc-400"
                        >
                            <span className="text-sm uppercase tracking-[0.3em] font-bold">
                                {status === "loading" ? "Transmitting..." : status === "success" ? "Sent Successfully" : "Mail"}
                            </span>
                            <FiSend size={16} className={`${status === "loading" ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1"} transition-transform`} />
                        </button>

                        <p className="text-[9px] text-center text-zinc-400 uppercase tracking-tighter">
                            {status === "error" ? "Error in transmission. Try again." : "Transmission protocol: Secure via Neural-Link"}
                        </p>
                    </form>
                </motion.div>


            </div>
        </section>
    );
}
