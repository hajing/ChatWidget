import { Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ConfirmCardBlock({ block }) {
  const { title, description, primaryAction = 'Confirm', secondaryAction = 'Dismiss' } = block

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-1 rounded-xl bg-blue-50 border border-blue-100 p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 shrink-0">
          <Zap className="w-4 h-4 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-blue-900">{title}</p>
          <p className="text-sm text-blue-700 mt-0.5">{description}</p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => console.log('Primary action:', primaryAction)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              {primaryAction}
            </button>
            <button
              onClick={() => console.log('Secondary action:', secondaryAction)}
              className="px-3.5 py-1.5 rounded-lg bg-white text-gray-600 text-xs font-medium border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {secondaryAction}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
