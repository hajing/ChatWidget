import { useState } from 'react'
import { Zap, Check, X, Loader2, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { resolveConfirmAction } from '@/stores/chat-store'

export default function ConfirmCardBlock({ block }) {
  const {
    actionId,
    title,
    description,
    primaryAction = 'Confirm',
    secondaryAction = 'Dismiss',
    status: blockStatus,
  } = block

  const [clicked, setClicked] = useState(null)

  const resolved = clicked || blockStatus

  const handleClick = (action) => {
    if (resolved) return
    setClicked(action)
    if (actionId) {
      resolveConfirmAction(actionId, action)
    }
  }

  const bgClass = resolved === 'expired'
    ? 'bg-gray-50 border-gray-200'
    : resolved === 'secondary'
      ? 'bg-gray-50 border-gray-200'
      : 'bg-blue-50 border-blue-100'

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`my-1 rounded-xl border p-4 ${bgClass}`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
          resolved === 'expired' ? 'bg-gray-100' :
          resolved === 'secondary' ? 'bg-gray-100' :
          resolved === 'primary' ? 'bg-green-100' :
          'bg-blue-100'
        }`}>
          {resolved === 'primary' ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : resolved === 'secondary' ? (
            <X className="w-4 h-4 text-gray-400" />
          ) : resolved === 'expired' ? (
            <Clock className="w-4 h-4 text-gray-400" />
          ) : (
            <Zap className="w-4 h-4 text-blue-600" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold ${
            resolved === 'expired' || resolved === 'secondary'
              ? 'text-gray-500' : 'text-blue-900'
          }`}>{title}</p>
          <p className={`text-sm mt-0.5 ${
            resolved === 'expired' || resolved === 'secondary'
              ? 'text-gray-400' : 'text-blue-700'
          }`}>{description}</p>

          <div className="flex items-center gap-2 mt-3">
            {resolved === 'primary' ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium">
                <Check className="w-3 h-3" />
                {primaryAction}
              </span>
            ) : resolved === 'secondary' ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-200 text-gray-500 text-xs font-medium">
                Dismissed
              </span>
            ) : resolved === 'expired' ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-200 text-gray-400 text-xs font-medium">
                <Clock className="w-3 h-3" />
                Expired
              </span>
            ) : (
              <>
                <button
                  onClick={() => handleClick('primary')}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  {primaryAction}
                </button>
                <button
                  onClick={() => handleClick('secondary')}
                  className="px-3.5 py-1.5 rounded-lg bg-white text-gray-600 text-xs font-medium border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {secondaryAction}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
