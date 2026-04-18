import { motion } from 'framer-motion'
import { BarChart3, Maximize2 } from 'lucide-react'
import { FUND_COMPARISON } from '@/lib/mock-data'
import { useStageStore } from '@/stores/stage-store'

function MiniBarChart({ returns, color, maxVal }) {
  return (
    <div className="flex items-end gap-0.5 h-16">
      {returns.map((val, idx) => {
        const height = Math.max(Math.abs(val) / maxVal * 100, 4)
        const isNeg = val < 0
        return (
          <div key={idx} className="flex-1 flex flex-col justify-end items-center">
            <div
              className="w-full rounded-t"
              style={{
                height: `${height}%`,
                backgroundColor: isNeg ? '#EF4444' : color,
                opacity: 0.85,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default function FundComparisonBlock() {
  const { fund1, fund2, months } = FUND_COMPARISON
  const navigate = useStageStore((s) => s.navigate)
  const allReturns = [...fund1.returns, ...fund2.returns]
  const maxVal = Math.max(...allReturns.map(Math.abs))

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container my-2 rounded-xl border border-gray-200 bg-white overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2 min-w-0">
          <BarChart3 className="w-4 h-4 text-gray-400 shrink-0" />
          <h3 className="text-sm font-semibold text-gray-900 truncate">Fund Comparison</h3>
        </div>
        <button
          onClick={() => navigate('insight-fund-comparison')}
          title="在画布中查看"
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-[#2263f8] hover:bg-[#2263f8]/10 transition-colors shrink-0"
        >
          <Maximize2 className="w-3 h-3" />
          <span className="hidden @[22rem]:inline">在画布中查看</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[fund1, fund2].map((fund, idx) => (
            <motion.div
              key={fund.shortName}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-lg border border-gray-200 bg-white p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: fund.color }}
                />
                <h4 className="text-[13px] font-semibold text-gray-900 truncate">
                  {fund.shortName}
                </h4>
              </div>

              <MiniBarChart returns={fund.returns} color={fund.color} maxVal={maxVal} />
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-gray-400">{months[0]}</span>
                <span className="text-[9px] text-gray-400">{months[months.length - 1]}</span>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">1Y</span>
                  <span className="text-[12px] font-bold text-gray-900">
                    {fund.metrics['1Y Return']}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">Vol</span>
                  <span className="text-[12px] font-bold text-gray-900">
                    {fund.metrics['Volatility']}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">Sharpe</span>
                  <span className="text-[12px] font-bold text-gray-900">
                    {fund.metrics['Sharpe Ratio']}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-lg border border-gray-200 bg-white p-3"
        >
          <h4 className="text-[13px] font-semibold text-gray-900 mb-2">Detailed Comparison</h4>
          <div className="flex items-center pb-1.5 border-b border-gray-200 text-[10px] text-gray-400">
            <span className="flex-1">Metric</span>
            <span className="w-16 @[28rem]:w-24 text-right truncate" style={{ color: fund1.color }}>
              {fund1.shortName}
            </span>
            <span className="w-16 @[28rem]:w-24 text-right truncate" style={{ color: fund2.color }}>
              {fund2.shortName}
            </span>
          </div>
          {Object.keys(fund1.metrics).map((key) => (
            <div key={key} className="flex items-center py-1.5 border-b border-gray-50 last:border-0 text-[12px]">
              <span className="flex-1 text-gray-500">{key}</span>
              <span className="w-16 @[28rem]:w-24 text-right font-medium text-gray-900">
                {fund1.metrics[key]}
              </span>
              <span className="w-16 @[28rem]:w-24 text-right font-medium text-gray-900">
                {fund2.metrics[key]}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
