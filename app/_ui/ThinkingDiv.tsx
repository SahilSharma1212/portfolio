'use client'
import { motion } from 'motion/react'
import { memo } from 'react'
import { useThemeStore } from '@/store/themeStore'

const ThinkingDiv = () => {
  const { theme } = useThemeStore()
  return (
    <motion.div
      className={`p-2 flex items-center justify-center gap-2 h-10 w-15 rounded-xl transition-colors duration-300 ${
        theme === 'light' ? 'bg-black/5 border border-black/10' : 'bg-gray-700'
      }`}
    >
      {[1, 2, 3].map((num, idx) => (
        <motion.div
          key={idx}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: idx * 0.2,     // stagger only
            ease: "easeInOut",
          }}
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            theme === 'light' ? 'bg-black/40' : 'bg-white'
          }`}
        />
      ))}
    </motion.div>
  )
}

export default memo(ThinkingDiv)
