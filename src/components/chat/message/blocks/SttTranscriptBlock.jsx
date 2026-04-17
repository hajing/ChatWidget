import { motion, AnimatePresence } from 'framer-motion'

export default function SttTranscriptBlock({ block }) {
  const { lines = [], isLive } = block

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-2 px-1"
    >
      {/* LIVE indicator */}
      {isLive && (
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="text-xs font-medium text-red-500 uppercase tracking-wider">Live Transcript</span>
        </div>
      )}

      {/* Transcript lines */}
      <div className="space-y-1.5 rounded-xl bg-gray-50 border border-gray-100 p-3">
        <AnimatePresence>
          {lines.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-2 text-sm"
            >
              <span
                className="shrink-0 font-semibold text-xs mt-0.5"
                style={{ color: line.color || '#6B7280' }}
              >
                {line.speaker}:
              </span>
              <span className="text-gray-700">{line.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator when live and lines exist */}
        {isLive && lines.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 pt-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
