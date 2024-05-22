'use client'
import { motion } from 'framer-motion'

type ReflectionContentProps = {
  content: string[]
}

export const ReflectionContent = ({ content }: ReflectionContentProps) => {
  return (
    <>
      {content.map((content: string, index: number) => (
        <motion.p
          key={index}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{delay: index * 0.1}}
        >
          {content}
        </motion.p>
      ))}
    </>
  )
}
