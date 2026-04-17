import { CheckCircle2, Circle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TaskListBlock({ block }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-2 px-1 space-y-1.5"
    >
      {block.items.map((item, idx) => (
        <motion.div
          key={idx}
          className="flex items-center gap-2 text-sm"
          animate={item.done ? { opacity: 0.6 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="shrink-0">
            {item.done ? (
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </motion.span>
            ) : (
              <Circle className="w-4 h-4 text-gray-300" />
            )}
          </span>
          <span className={item.done ? 'text-gray-400 line-through' : 'text-gray-700'}>
            {item.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
