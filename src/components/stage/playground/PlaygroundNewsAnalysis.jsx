import { NEWS_ARTICLES, WAR_IMPACT_ANALYSIS } from '@/lib/mock-data'
import { motion } from 'framer-motion'
import { Newspaper, AlertTriangle, TrendingDown, Shield } from 'lucide-react'

const SEVERITY_STYLE = {
  high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', icon: AlertTriangle },
  moderate: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', icon: TrendingDown },
  low: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', icon: Shield },
}

export default function PlaygroundNewsAnalysis() {
  return (
    <div className="p-6 space-y-6">
      {/* News Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900">Latest Financial News — Malaysia</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {NEWS_ARTICLES.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                  {article.tag}
                </span>
                <span className="text-xs text-gray-400">{article.date}</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1 leading-snug">{article.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{article.summary}</p>
              <p className="text-xs text-gray-400 mt-2">{article.source}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact Analysis Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">{WAR_IMPACT_ANALYSIS.title}</h3>
        <div className="space-y-3">
          {WAR_IMPACT_ANALYSIS.sections.map((section, idx) => {
            const style = SEVERITY_STYLE[section.severity]
            const SeverityIcon = style.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className={`rounded-xl border ${style.border} ${style.bg} p-4`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SeverityIcon className={`w-4 h-4 ${style.text}`} />
                  <h4 className={`text-sm font-semibold ${style.text}`}>{section.heading}</h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
