import { motion } from 'framer-motion'
import {
  Newspaper,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Shield,
  ExternalLink,
  Share2,
  Download,
  Sparkles,
} from 'lucide-react'
import { NEWS_ARTICLES, WAR_IMPACT_ANALYSIS } from '@/lib/mock-data'

const SEVERITY_STYLE = {
  high: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100/40',
    border: 'border-red-200',
    text: 'text-red-700',
    accent: 'bg-red-500',
    icon: AlertTriangle,
    label: 'High Impact',
  },
  moderate: {
    bg: 'bg-gradient-to-br from-amber-50 to-amber-100/40',
    border: 'border-amber-200',
    text: 'text-amber-700',
    accent: 'bg-amber-500',
    icon: TrendingDown,
    label: 'Moderate',
  },
  low: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/40',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    accent: 'bg-emerald-500',
    icon: Shield,
    label: 'Advisory',
  },
}

const KEY_STATS = [
  { label: 'KLCI Today', value: '-2.3%', tone: 'neg', sub: '1,478.23 pts' },
  { label: 'USD/MYR', value: '4.52', tone: 'neg', sub: '+1.1% wk' },
  { label: 'Palm Oil (CPO)', value: '+8.2%', tone: 'pos', sub: 'RM 4,850/t' },
  { label: 'Brent Crude', value: '+4.8%', tone: 'pos', sub: '$88.30' },
]

export default function InsightNewsPage() {
  return (
    <div className="min-h-full flex flex-col gap-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-8 text-white"
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2263f8 55%, #4b83ff 100%)',
        }}
      >
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-10 bottom-0 w-56 h-56 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-medium tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              AI Insights
            </div>
            <h1 className="mt-4 text-[34px] font-bold leading-tight">
              Malaysia Market · US–Iran Conflict Impact
            </h1>
            <p className="mt-2 text-[15px] text-white/80 max-w-2xl">
              Synthesized from 5 verified sources &middot; Updated {new Date().toLocaleDateString('en-MY', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors text-[13px] font-medium backdrop-blur-sm">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white text-[#2263f8] hover:bg-white/90 transition-colors text-[13px] font-medium">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="relative mt-7 grid grid-cols-2 md:grid-cols-4 gap-4">
          {KEY_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.06 }}
              className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3"
            >
              <p className="text-[11px] uppercase tracking-wider text-white/70">{stat.label}</p>
              <div className="mt-1 flex items-end gap-2">
                <span className={`text-[22px] font-bold ${stat.tone === 'pos' ? 'text-emerald-300' : 'text-red-300'}`}>
                  {stat.value}
                </span>
                {stat.tone === 'pos' ? (
                  <TrendingUp className="w-4 h-4 mb-1 text-emerald-300" />
                ) : (
                  <TrendingDown className="w-4 h-4 mb-1 text-red-300" />
                )}
              </div>
              <p className="text-[11px] text-white/60 mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
        {/* Left: News */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-white border border-[#e6e9f4] p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2263f8]/10 flex items-center justify-center">
                <Newspaper className="w-4 h-4 text-[#2263f8]" />
              </div>
              <h2 className="text-[18px] font-semibold text-gray-900">Latest Financial News</h2>
            </div>
            <span className="text-[12px] text-gray-400">{NEWS_ARTICLES.length} articles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEWS_ARTICLES.map((article, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.08 }}
                className="group rounded-xl border border-[#e6e9f4] bg-white p-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-[#2263f8]/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2263f8]/10 text-[#2263f8] text-[11px] font-semibold">
                    {article.tag}
                  </span>
                  <span className="text-[11px] text-gray-400">{article.date}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-2 group-hover:text-[#2263f8] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[13px] text-[#5a607f] leading-relaxed line-clamp-3">{article.summary}</p>
                <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-[12px] text-gray-400">{article.source}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#2263f8] transition-colors" />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Right: Impact Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white border border-[#e6e9f4] p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#cb3d00]/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#cb3d00]" />
            </div>
            <h2 className="text-[18px] font-semibold text-gray-900">Impact Analysis</h2>
          </div>

          <p className="text-[13px] text-[#5a607f] mb-4 leading-relaxed">
            {WAR_IMPACT_ANALYSIS.title}
          </p>

          <div className="space-y-3">
            {WAR_IMPACT_ANALYSIS.sections.map((section, idx) => {
              const style = SEVERITY_STYLE[section.severity]
              const SeverityIcon = style.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.08 }}
                  className={`relative overflow-hidden rounded-xl border ${style.border} ${style.bg} p-4`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.accent}`} />
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <SeverityIcon className={`w-4 h-4 ${style.text}`} />
                      <h3 className={`text-[14px] font-semibold ${style.text}`}>{section.heading}</h3>
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${style.text} opacity-70`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-700 leading-relaxed">{section.content}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
