import { Wrench, Check, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ToolCallBlock({ block }) {
  const isDone = block.status === 'done'

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 py-2 px-1 text-sm"
    >
      <span className="shrink-0">
        {isDone ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
        )}
      </span>
      <p className={isDone ? 'text-gray-500' : 'text-gray-700'}>
        {block.label}
      </p>
    </motion.div>
  )
}
