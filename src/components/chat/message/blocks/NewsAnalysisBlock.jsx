import { motion } from 'framer-motion'
import { Newspaper, AlertTriangle, TrendingDown, Shield, Maximize2 } from 'lucide-react'
import { NEWS_ARTICLES, WAR_IMPACT_ANALYSIS } from '@/lib/mock-data'
import { useStageStore } from '@/stores/stage-store'

const SEVERITY_STYLE = {
  high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', icon: AlertTriangle },
  moderate: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', icon: TrendingDown },
  low: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', icon: Shield },
}

export default function NewsAnalysisBlock() {
  const navigate = useStageStore((s) => s.navigate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container my-2 rounded-xl border border-gray-200 bg-white overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2 min-w-0">
          <Newspaper className="w-4 h-4 text-gray-400 shrink-0" />
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            Financial News & Impact Analysis
          </h3>
        </div>
        <button
          onClick={() => navigate('insight-news')}
          title="在画布中查看"
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-[#2263f8] hover:bg-[#2263f8]/10 transition-colors shrink-0"
        >
          <Maximize2 className="w-3 h-3" />
          <span className="hidden @[22rem]:inline">在画布中查看</span>
        </button>
      </div>

      <div className="p-4 space-y-5">
        <div>
          <h4 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Latest Malaysia News
          </h4>
          <div className="grid grid-cols-1 @[30rem]:grid-cols-2 gap-2">
            {NEWS_ARTICLES.map((article, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-lg border border-gray-200 bg-white p-3"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium">
                    {article.tag}
                  </span>
                  <span className="text-[10px] text-gray-400">{article.date}</span>
                </div>
                <h5 className="text-[13px] font-semibold text-gray-900 mb-1 leading-snug">
                  {article.title}
                </h5>
                <p className="text-[12px] text-gray-500 leading-relaxed">{article.summary}</p>
                <p className="text-[10px] text-gray-400 mt-1.5">{article.source}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
            {WAR_IMPACT_ANALYSIS.title}
          </h4>
          <div className="grid grid-cols-1 @[36rem]:grid-cols-2 gap-2">
            {WAR_IMPACT_ANALYSIS.sections.map((section, idx) => {
              const style = SEVERITY_STYLE[section.severity]
              const SeverityIcon = style.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.08 }}
                  className={`rounded-lg border ${style.border} ${style.bg} p-3`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <SeverityIcon className={`w-3.5 h-3.5 ${style.text}`} />
                    <h5 className={`text-[13px] font-semibold ${style.text}`}>{section.heading}</h5>
                  </div>
                  <p className="text-[12px] text-gray-700 leading-relaxed">{section.content}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
