'use client'

import React, { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const texts = ['Software Developer', 'Fullstack Developer', 'Frontend Developer', 'Backend Developer']

function SwappingTexts() {
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-10 flex items-center justify-center overflow-visible whitespace-nowrap">

      <AnimatePresence mode="wait">
        <motion.span
          key={textIndex}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="
            absolute text-lg text-center font-bold text-white
            drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]
            sm:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]
            "
        >
          {texts[textIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default memo(SwappingTexts)
