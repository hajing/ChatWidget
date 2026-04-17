import { useStageStore } from '@/stores/stage-store'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import PlaygroundNewsAnalysis from './playground/PlaygroundNewsAnalysis'
import PlaygroundFundComparison from './playground/PlaygroundFundComparison'
import PlaygroundWebScrape from './playground/PlaygroundWebScrape'

const CONTENT_MAP = {
  'news-analysis': PlaygroundNewsAnalysis,
  'fund-comparison': PlaygroundFundComparison,
  'web-scrape': PlaygroundWebScrape,
}

export default function Playground() {
  const playground = useStageStore((s) => s.playground)
  const closePlayground = useStageStore((s) => s.closePlayground)

  return (
    <AnimatePresence>
      {playground.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">{playground.title}</h2>
              <button
                onClick={closePlayground}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {playground.isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                  <p className="text-sm text-gray-400">Analyzing and preparing content...</p>
                </div>
              ) : (
                (() => {
                  const ContentComponent = CONTENT_MAP[playground.content]
                  return ContentComponent ? <ContentComponent /> : null
                })()
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
