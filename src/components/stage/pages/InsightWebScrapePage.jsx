import { motion } from 'framer-motion'
import {
  Globe,
  TrendingUp,
  TrendingDown,
  Link as LinkIcon,
  Clock,
  Download,
  Share2,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  MARKET_INDICES,
  TOP_GAINERS,
  TOP_LOSERS,
  MARKET_COMMENTARY,
} from '@/lib/mock-data'

const SUMMARY_STATS = [
  { label: 'Indices Extracted', value: '4' },
  { label: 'Gainers Captured', value: '3' },
  { label: 'Losers Captured', value: '3' },
  { label: 'Commentary Blocks', value: '2' },
]

export default function InsightWebScrapePage() {
  return (
    <div className="min-h-full flex flex-col gap-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-8 text-white"
        style={{
          background: 'linear-gradient(135deg, #0f4c3a 0%, #078d39 55%, #10b050 100%)',
        }}
      >
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-4 bottom-0 w-48 h-48 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-medium tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              Web Extraction
            </div>
            <h1 className="mt-4 text-[34px] font-bold leading-tight">
              Bursa Malaysia Market Summary
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px] text-white/80">
              <div className="inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>bursamalaysia.com/market</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>17 Apr 2026, 4:45 PM MYT</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5" />
                <span>1 page &middot; 1.2s load</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors text-[13px] font-medium backdrop-blur-sm">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white text-[#078d39] hover:bg-white/90 transition-colors text-[13px] font-medium">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="relative mt-7 grid grid-cols-2 md:grid-cols-4 gap-4">
          {SUMMARY_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.06 }}
              className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3"
            >
              <p className="text-[11px] uppercase tracking-wider text-white/70">{stat.label}</p>
              <p className="mt-1 text-[26px] font-bold leading-none">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Market Indices */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl bg-white border border-[#e6e9f4] overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2263f8]/10 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-[#2263f8]" />
            </div>
            <h2 className="text-[16px] font-semibold text-gray-900">Market Indices</h2>
          </div>
          <span className="text-[11px] text-gray-400 uppercase tracking-wider">Realtime</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100 border-b border-gray-100">
          {MARKET_INDICES.map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.06 }}
              className="p-5"
            >
              <p className="text-[11px] text-gray-400 uppercase tracking-wider">{row.index}</p>
              <p className="mt-1 text-[22px] font-bold text-gray-900">{row.last}</p>
              <div className="mt-2 flex items-center gap-1.5">
                {row.isNeg ? (
                  <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                ) : (
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                )}
                <span className={`text-[13px] font-semibold ${row.isNeg ? 'text-red-600' : 'text-emerald-600'}`}>
                  {row.change} ({row.pctChange})
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="px-6 py-3 bg-gray-50/50 text-[11px] text-gray-400">
          Source: https://www.bursamalaysia.com/market
        </div>
      </motion.section>

      {/* Gainers + Losers */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl bg-white border border-[#e6e9f4] p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-[16px] font-semibold text-gray-900">Top Gainers</h3>
          </div>
          <div className="space-y-3">
            {TOP_GAINERS.map((stock, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.06 }}
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 border border-emerald-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-[12px] font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-gray-900">{stock.name}</p>
                    <p className="text-[12px] text-gray-500">RM {stock.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[16px] font-bold text-emerald-600">{stock.pct}</p>
                  <p className="text-[11px] text-emerald-500">{stock.change}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white border border-[#e6e9f4] p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
            <h3 className="text-[16px] font-semibold text-gray-900">Top Losers</h3>
          </div>
          <div className="space-y-3">
            {TOP_LOSERS.map((stock, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + idx * 0.06 }}
                className="flex items-center justify-between p-3 rounded-xl bg-red-50/40 border border-red-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center text-white text-[12px] font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-gray-900">{stock.name}</p>
                    <p className="text-[12px] text-gray-500">RM {stock.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[16px] font-bold text-red-600">{stock.pct}</p>
                  <p className="text-[11px] text-red-500">{stock.change}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Commentary */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl bg-white border border-[#e6e9f4] p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#2263f8]/10 flex items-center justify-center">
            <Globe className="w-4 h-4 text-[#2263f8]" />
          </div>
          <h3 className="text-[16px] font-semibold text-gray-900">Market Commentary</h3>
        </div>
        <div className="space-y-3">
          {MARKET_COMMENTARY.map((text, idx) => (
            <p key={idx} className="text-[14px] text-gray-700 leading-relaxed">
              {text}
            </p>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
