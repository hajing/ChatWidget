import { Globe, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function WebSearchBlock({ block }) {
  const isDone = block.status === 'done'

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2 py-2 px-1 text-sm"
    >
      <span className="mt-0.5 shrink-0">
        {isDone ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Globe className="w-4 h-4 text-blue-500 animate-pulse" />
        )}
      </span>
      <div className="min-w-0">
        <p className={isDone ? 'text-gray-500' : 'text-gray-700'}>
          {isDone
            ? `Searched the web — ${block.results || 0} results found`
            : 'Searching the web...'}
        </p>
        <p className="text-xs text-gray-400 truncate mt-0.5">{block.query}</p>
      </div>
    </motion.div>
  )
}
