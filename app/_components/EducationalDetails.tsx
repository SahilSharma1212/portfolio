'use client'
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion' // Use framer-motion as motion/react is often aliased to it

const educationData = [
    {
        level: "Bachelors",
        institution: "Bhilai Institute of Technology - Durg",
        duration: "2022 - 2026",
        details: "B.Tech in Computer Science Engineering",
    },
    {
        level: "12th Grade",
        institution: "Delhi Public School Bhilai",
        duration: "2020 - 2022",
        details: "PCM , 94.2%",
    },
    {
        level: "10th Grade",
        institution: "Delhi Public School Bhilai",
        duration: "2019-2020",
        details: "96.2%",
    },
];

export default function EducationalTimeline() {
    return (
        // Increased vertical padding and max width for a more spacious feel
        <div className="relative overflow-hidden py-32 px-5 md:px-20 max-w-6xl mx-auto">
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className='text-white text-4xl sm:text-6xl text-center pb-20 font-serif font-bold tracking-tight'
            >
                Academic Qualifications
            </motion.p>

            {/* Timeline Wrapper */}
            <div className="relative">
                {/* The vertical timeline line, centered on larger screens */}
                <div className="absolute left-6 md:left-1/2 w-0.5 h-full bg-gray-700/50 transform -translate-x-1/2"></div>
                
                {educationData.map((edu, idx) => (
                    <motion.div
                        key={idx}
                        // Alternate alignment: left for even indices, right for odd indices
                        className={`
                            mb-12 flex w-full relative 
                            ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} 
                            justify-start
                        `}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: idx * 0.15 }}
                    >
                        {/* Timeline Dot (Always centered on the screen or line) */}
                        <div className="absolute left-6 md:left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-4 h-4 rounded-full bg-white border-2 border-white shadow-lg relative">
                                {/* Icon inside the dot for better visual flair */}
                                <GraduationCap className="w-8 h-8 absolute -top-2 -left-2 text-white p-1 bg-gray-900/80 rounded-full border border-gray-700 shadow-xl" />
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className="
                            w-full md:w-[45%] // Takes full width on mobile, less than half on desktop
                            ml-14 md:ml-0 // Added margin on mobile to align text with the dot
                            
                            // Align card content to the right when card is on the right side
                            ${idx % 2 !== 0 && 'md:text-right'}
                        ">
                            <div className={`
                                // Enhanced styling for the elegant "bag" look
                                bg-cardgraybg backdrop-blur-xl border border-[#454545] p-6 rounded-xl 
                                shadow-2xl transition-all hover:border-[#666666] hover:shadow-white/5
                            `}>
                                <p className="text-gray-300 font-medium text-sm mb-1">{edu.duration}</p>
                                <h3 className="text-2xl font-bold text-white mb-1">{edu.level}</h3>
                                <p className="text-gray-200 font-semibold mb-2">{edu.institution}</p>
                                <p className="text-gray-400 text-base border-t border-gray-700/50 pt-2">{edu.details}</p>
                            </div>
                        </div>

                    </motion.div>
                ))}
            </div>
        </div>
    );
}