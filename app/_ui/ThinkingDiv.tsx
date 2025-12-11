'use client'
import { motion } from 'motion/react'
import { memo } from 'react'

const ThinkingDiv = () => {
  return (
    <motion.div
      className="p-2 bg-gray-700 flex items-center justify-center gap-2 h-10 w-15 rounded-xl"
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
          className="w-2 h-2 rounded-full bg-white"
        />
      ))}
    </motion.div>
  )
}

export default memo(ThinkingDiv)
