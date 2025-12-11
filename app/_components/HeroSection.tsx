'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../_ui/Navbar";
import { DownloadCloud, Github, Linkedin, Mail } from "lucide-react";
import ProfileCards from "../_ui/ProfileCards";
import { memo, useEffect, useState } from "react";

const icons = [
  {
    name: 'Github',
    link: 'https://github.com/SahilSharma1212',
    icon: Github,
    color: 'hover:text-indigo-500',
    download: false,
  },
  {
    name: 'Mail',
    link: 'mailto:your-email@example.com', // Replace with real email or keep GitHub temporarily
    icon: Mail,
    color: 'hover:text-red-500',
    download: false,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/sahil-sharma-822a752a9/',
    icon: Linkedin,
    color: 'hover:text-blue-500',
    download: false,
  },
  {
    name: 'Resume',
    link: '/SahilSharma_Resume_Fullstack_dev.docx',
    icon: DownloadCloud,
    color: 'hover:text-cyan-500',
    download: true,
  },
];

const swapTexts = ['I learn', 'I build', 'I code'];

const SwappingText = memo(() => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % swapTexts.length);
    }, 3000); // 3s cycle (type + pause + delete + next)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block mt-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="flex items-center gap-2" // keeps cursor aligned
        >
          {/* White background pill */}
          <div className="px-6 py-2 rounded-md bg-white shadow-lg">
            <TypewriterText text={swapTexts[index]} />
          </div>

        
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

// Separate typewriter animation component
const TypewriterText = ({ text }: { text: string }) => {
  return (
    <motion.span
      initial={{ width: 0 }}
      animate={{ width: "auto" }}
      exit={{ width: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="inline-block overflow-hidden whitespace-nowrap text-7xl max-sm:text-3xl font-bold font-serif text-black"
      style={{ borderRight: "4px solid transparent" }} // optional extra cursor feel
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </motion.span>
  );
};

SwappingText.displayName = "SwappingText";

function HeroSection() {
  return (
    <div id='home' className="min-h-screen h-auto relative pt-40 max-md:pt-32 pb-20 overflow-x-hidden max-md:pb-0">

      {/* Vertical line decoration */}
      <div className="w-0.5 h-5/6 bg-linear-to-b from-transparent via-[#888888] to-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-xl:hidden" />

      <Navbar />

      {/* Hero Content */}
      <div className="flex max-md:flex-col items-start justify-between px-20 max-md:px-10 gap-10">

        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-7/12"
        >
          <h1 className="md:text-7xl  sm:text-6xl text-3xl font-bold font-serif text-white leading-tight">
            Hey Recruiters, guess what - <br />
            <SwappingText />
          </h1>

          <p className="text-base md:text-lg text-white/80 mt-6 max-w-xl">
            Crafting neat solutions with logic, design, and stubborn patience.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6 mt-12 max-md:gap-1">
            {icons.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
                  onClick={() => {
                    if (item.download) {
                      const link = document.createElement("a");
                      link.href = item.link;
                      link.download = "Sahil_Sharma_Resume.docx";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    } else {
                      window.open(item.link, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="
                    p-4 rounded-2xl 
                    border border-white/10
                    bg-white/5 backdrop-blur-xl 
                    hover:bg-white/10 hover:border-white/30 
                    transition-all duration-300 max-md:scale-90 
                  "
                >
                  <Icon className={`h-7 w-7 text-white/80 transition-colors ${item.color}`} />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Right Side - Profile Cards */}
        <ProfileCards />

      </div>
    </div>
  );
}

export default memo(HeroSection);