import { Save, FileText, Download, Send, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

const ICON_MAP = {
  Save,
  FileText,
  Download,
  Send,
  Share2,
}

export default function ActionButtonsBlock({ block }) {
  const { buttons = [] } = block

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 py-2 px-1"
    >
      {buttons.map((btn, idx) => {
        const Icon = ICON_MAP[btn.icon]
        const isPrimary = btn.variant === 'primary'

        return (
          <button
            key={idx}
            onClick={() => console.log('Action button:', btn.label)}
            className={`
              inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer
              ${isPrimary
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {btn.label}
          </button>
        )
      })}
    </motion.div>
  )
}
