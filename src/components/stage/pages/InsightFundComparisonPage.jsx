import { motion } from 'framer-motion'
import {
  BarChart3,
  Sparkles,
  Share2,
  Download,
  Trophy,
  Info,
  ArrowUpRight,
} from 'lucide-react'
import { FUND_COMPARISON } from '@/lib/mock-data'

function BarChart({ returns, months, color, maxVal }) {
  return (
    <div>
      <div className="flex items-end gap-1 h-40">
        {returns.map((val, idx) => {
          const height = Math.max(Math.abs(val) / maxVal * 100, 6)
          const isNeg = val < 0
          return (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: 0.1 + idx * 0.03, type: 'spring', stiffness: 220, damping: 24 }}
              className="flex-1 relative group/bar flex items-end"
            >
              <div
                className="w-full rounded-t-md transition-opacity hover:opacity-100"
                style={{
                  height: '100%',
                  backgroundColor: isNeg ? '#EF4444' : color,
                  opacity: 0.85,
                }}
              />
              <div className="absolute left-1/2 -translate-x-1/2 -top-7 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap">
                {val > 0 ? '+' : ''}{val}%
              </div>
            </motion.div>
          )
        })}
      </div>
      <div className="flex justify-between mt-2">
        {months.map((m, i) => (
          <span key={i} className="text-[10px] text-gray-400 flex-1 text-center">
            {i % 2 === 0 ? m : ''}
          </span>
        ))}
      </div>
    </div>
  )
}

function getWinner(metric, v1, v2) {
  const parse = (v) => parseFloat(String(v).replace(/[^-\d.]/g, ''))
  const a = parse(v1)
  const b = parse(v2)
  if (isNaN(a) || isNaN(b)) return null
  const lowerBetter = /Volatility|Drawdown|Expense/.test(metric)
  if (a === b) return null
  if (lowerBetter) return a < b ? 1 : 2
  return a > b ? 1 : 2
}

export default function InsightFundComparisonPage() {
  const { fund1, fund2, months } = FUND_COMPARISON
  const allReturns = [...fund1.returns, ...fund2.returns]
  const maxVal = Math.max(...allReturns.map(Math.abs))

  const metricKeys = Object.keys(fund1.metrics)

  return (
    <div className="min-h-full flex flex-col gap-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-8 text-white"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%)',
        }}
      >
        <div
          className="absolute -right-24 top-0 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle, ${fund1.color}, transparent)` }}
        />
        <div
          className="absolute -left-24 bottom-0 w-80 h-80 rounded-full blur-3xl opacity-25"
          style={{ background: `radial-gradient(circle, ${fund2.color}, transparent)` }}
        />

        <div className="relative flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-medium tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              Fund Comparison
            </div>
            <h1 className="mt-4 text-[34px] font-bold leading-tight">
              {fund1.shortName} <span className="text-white/40 font-light">vs</span> {fund2.shortName}
            </h1>
            <p className="mt-2 text-[15px] text-white/70 max-w-2xl">
              12-month performance &middot; risk metrics &middot; cost & size analysis
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-[13px] font-medium backdrop-blur-sm border border-white/10">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white text-slate-900 hover:bg-white/90 transition-colors text-[13px] font-medium">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </motion.div>

      {/* Fund Cards with Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {[fund1, fund2].map((fund, idx) => (
          <motion.div
            key={fund.shortName}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.08 }}
            className="rounded-2xl bg-white border border-[#e6e9f4] p-6"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-12 rounded-full"
                  style={{ backgroundColor: fund.color }}
                />
                <div>
                  <h3 className="text-[18px] font-semibold text-gray-900 leading-tight">
                    {fund.shortName}
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-0.5">{fund.name}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[11px] text-gray-400 uppercase tracking-wider">1Y Return</span>
                <span
                  className="text-[24px] font-bold"
                  style={{ color: fund.color }}
                >
                  {fund.metrics['1Y Return']}
                </span>
              </div>
            </div>

            <BarChart returns={fund.returns} months={months} color={fund.color} maxVal={maxVal} />

            <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-100">
              {[
                { label: '3Y Annualized', value: fund.metrics['3Y Annualized'] },
                { label: 'Volatility', value: fund.metrics['Volatility'] },
                { label: 'Sharpe', value: fund.metrics['Sharpe Ratio'] },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-[18px] font-bold text-gray-900 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl bg-white border border-[#e6e9f4] overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2263f8]/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-[#2263f8]" />
            </div>
            <h2 className="text-[16px] font-semibold text-gray-900">Detailed Metrics</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Trophy className="w-3.5 h-3.5" />
            Winner highlighted
          </div>
        </div>

        <div className="px-6 py-2">
          <div className="flex items-center py-3 border-b border-gray-100 text-[11px] text-gray-400 uppercase tracking-wider">
            <span className="flex-1">Metric</span>
            <span className="w-40 text-right" style={{ color: fund1.color }}>
              {fund1.shortName}
            </span>
            <span className="w-40 text-right" style={{ color: fund2.color }}>
              {fund2.shortName}
            </span>
          </div>
          {metricKeys.map((key, idx) => {
            const winner = getWinner(key, fund1.metrics[key], fund2.metrics[key])
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + idx * 0.04 }}
                className="flex items-center py-3 border-b border-gray-50 last:border-0 text-[14px]"
              >
                <span className="flex-1 text-gray-600">{key}</span>
                <div className="w-40 text-right flex items-center justify-end gap-1.5">
                  {winner === 1 && <Trophy className="w-3.5 h-3.5 text-amber-500" />}
                  <span className={`font-semibold ${winner === 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                    {fund1.metrics[key]}
                  </span>
                </div>
                <div className="w-40 text-right flex items-center justify-end gap-1.5">
                  {winner === 2 && <Trophy className="w-3.5 h-3.5 text-amber-500" />}
                  <span className={`font-semibold ${winner === 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                    {fund2.metrics[key]}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Verdict */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="rounded-2xl p-6 border border-[#2263f8]/20 bg-gradient-to-br from-[#2263f8]/5 via-white to-white"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-[#2263f8] flex items-center justify-center">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-2">Verdict</h3>
            <p className="text-[14px] text-gray-700 leading-relaxed">
              <strong className="text-gray-900">{fund1.shortName}</strong> offers higher returns but with greater volatility.{' '}
              <strong className="text-gray-900">{fund2.shortName}</strong> is the more conservative choice.
              For growth-oriented clients, {fund1.shortName} is recommended; for risk-averse clients, {fund2.shortName} is preferable.
            </p>
            <button className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2263f8] hover:underline">
              Apply to client portfolio
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
